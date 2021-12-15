from Lock import Lock
import RPi.GPIO as GPIO
import time

lock = Lock()
updateInterval = 3 #check if update is needed every 5 seconds
nextUpdateTime = time.time()

try:
	while True:
		if lock.isPressed():
			print("validating")
			lock.validate()

		elif lock.imagesUpdateRequested():
			print("updating")
			lock.updateImages()
		# print(time.time())
		# print("update", nextUpdateTime)
		if time.time() > nextUpdateTime:
			lock.checkUpdate()
			nextUpdateTime = time.time() + updateInterval

except KeyboardInterrupt:
	GPIO.cleanup()
