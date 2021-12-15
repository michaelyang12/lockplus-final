from picamera import PiCamera
import RPi.GPIO as GPIO
import time
from predictor import Predictor
from time import perf_counter
from pymongo import MongoClient
import os
import datetime
from pydub import AudioSegment
from pydub.playback import play
from gtts import gTTS


MONGO_URI = 'mongodb+srv://lockAdmin:lock2021@lock.6q6fl.mongodb.net/lock?retryWrites=true&w=majority'
USERS_FOLDER_PATH = 'users'

class Lock():
	def __init__(self):
		# initialize board
		self.greLED = 19
		self.redLED = 13
		self.yelLED = 6
		self.buttonPin = 4
		self.updatePin = 17
		self.servoPin = 12
		GPIO.setmode(GPIO.BCM)
		GPIO.setup(self.redLED, GPIO.OUT)
		GPIO.setup(self.yelLED, GPIO.OUT)
		GPIO.setup(self.greLED, GPIO.OUT)
		GPIO.setup(self.buttonPin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
		GPIO.setup(self.updatePin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
		GPIO.setup(self.servoPin, GPIO.OUT)
		self.servo = GPIO.PWM(self.servoPin, 50) # 50 Hz
		self.servo.start(5)		# door closed
		self._lightUp(1,1,1)

		# model initializer
		print("Intialize model... ", end="")
		t0 = perf_counter()
		self.model = Predictor()
		print("finished! elapsed time: {} secs".format(perf_counter()-t0))

		# initialize camera
		self.cam = PiCamera()
		self.img_path = '/home/pi/Desktop/test.jpg'

		# initialze mongo
		self.client = MongoClient(MONGO_URI)
		self.db = self.client['lock']
		this_lock = self.db.locks.find_one()
		self.lock_id = this_lock['_id']
		self.lock_code = this_lock['lockCode']

		# sound files
		self.welcome_sounds = dict()
		self.updateAllUsersSounds()
		self.access_granted_sound = AudioSegment.from_mp3('./sounds/access_granted.mp3')
		self.access_denied_sound = AudioSegment.from_mp3('./sounds/access_denied.mp3')
		self.update_detected_sound = AudioSegment.from_mp3('./sounds/update_detected.mp3')
		self.update_complete_sound = AudioSegment.from_mp3('./sounds/update_complete.mp3')

		# ready to use
		print("lock is ready to be used")
		self._lightUp(0,0,1)	# standby light

	# take a picture and validate
	def validate(self):
		print("Taking picture...")
		self.cam.start_preview()
		self.cam.capture(self.img_path)
		self.cam.stop_preview()

		result = self.model.predictFromPath(self.img_path) # username or None

		# open the lock or deny access
		if result is not None:
			print(" Welcome {}!".format(result))
			self._grantAccess(result)
		else:
			self._denyAccess()

		# send history to mongo
		buffer = None
		with open(self.img_path, "rb") as image:
			buffer = image.read()
		new_history = {
			'img': {'data': buffer},
			'accepted': result != None,
			'timestamp': str(datetime.datetime.now()),
			'username': result if result != None else 'unknown'
		}

		print("sending image to db")
		self.db.locks.update_one({'_id': self.lock_id}, {'$push': {'history': new_history}})
		self.db.update_status.update_one({'lockCode': self.lock_code}, {'$set': {'history_status': True}})
		print("done sending image to db")



	# return True if the button is pressed, otherwise false
	def isPressed(self):
		return GPIO.input(self.buttonPin) == GPIO.HIGH

	def imagesUpdateRequested(self):
		# print("pin status:", GPIO.input(self.updatePin))
		return GPIO.input(self.updatePin) == GPIO.HIGH

	# check if an update is pending, if yes, update
	def checkUpdate(self):
		update_needed = self.db['update_status'].find_one()['user_status']
		if update_needed:
			self.updateImages()

	def updateImages(self):

		self._lightUp(1,1,1)	# update in progress
		play(self.update_detected_sound)

		# initialize mongo
		lock_mongo = self.db.locks.find_one()

		images = lock_mongo['images']
		users_need_update = []
		images_on_db = set()

		for image in images:
			username = image['username']
			filename = image['filename']
			img_data = image['img']['data']
			print("processing image {}".format(filename))

			user_folder_path = './{}/{}'.format(USERS_FOLDER_PATH, username)
			if not os.path.isdir(user_folder_path):
				os.mkdir(user_folder_path)
				self.updateUserSound(username)	# add welcome sound

			img_path = '{}/{}.png'.format(user_folder_path, filename)
			images_on_db.add(img_path)

			if os.path.isfile(img_path):
				print("img {} already exists".format(filename))
				continue
			users_need_update.append(username)
			self.model.addImagePath(username, img_path)
			with open(img_path, 'wb') as file:
				file.write(img_data)

		# check if any image was deleted on db, if yes, delete them on the pi too
		img_paths_to_delte = []
		for img_path in self.model.imagesPaths.keys():
			if img_path not in images_on_db:
				img_paths_to_delte.append(img_path)
		for img_path in img_paths_to_delte:
			print("deleting", img_path)
			os.remove(img_path)
			username = self.model.imagesPaths[img_path]
			print("adding {} to list of users need update".format(username))
			users_need_update.append(username)
			del self.model.imagesPaths[img_path]

		print("updating users encoding")
		for username in users_need_update:
			print("update encoding of {}".format(username))
			self.model.updateUserEncoding(username)
		print("done updating encodings")
		self.db['update_status'].update_one({'lockCode': self.lock_code}, {'$set': {'user_status': False}})
		play(self.update_complete_sound)
		self._lightUp(0,0,1)	# standby light

	def updateAllUsersSounds(self):
		for username in os.listdir(USERS_FOLDER_PATH):
			sound_path = './sounds/welcome_{}.mp3'.format(username)
			if os.path.isfile(sound_path):
				self.welcome_sounds[username] = AudioSegment.from_mp3(sound_path)
				continue
			self.updateUserSound(username)

	def updateUserSound(self, username):
		s = "welcome {}".format(username)
		sound_path = './sounds/welcome_{}.mp3'.format(username)
		tts = gTTS(text=s, lang="en", tld="com")
		tts.save(sound_path)
		self.welcome_sounds[username] = AudioSegment.from_mp3(sound_path)

	def updateUserEncoding(self, user):
		self.model.updateUserEncoding(user)

	def _grantAccess(self, username):
		self._lightUp(0,1,0)	# green light
		print("---Access Granted---")

		# open door
		self.servo.ChangeDutyCycle(10)

		# sounds
		play(self.access_granted_sound)
		play(self.welcome_sounds[username])

		# close door
		time.sleep(1)
		self.servo.ChangeDutyCycle(5)
		time.sleep(1)

		self._lightUp(0,0,1) # back to standby light

	def _denyAccess(self):
		self._lightUp(1,0,0)	# red light
		print("---Access Denied---")
		play(self.access_denied_sound)
		time.sleep(2)
		self._lightUp(0,0,1) # back to standby light

	def _lightUp(self,r,g,y):
		GPIO.output(self.redLED, r)
		GPIO.output(self.yelLED, y)
		GPIO.output(self.greLED, g)
