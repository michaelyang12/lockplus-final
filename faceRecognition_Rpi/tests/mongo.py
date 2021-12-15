from pymongo import MongoClient
import pprint

# MAC: b8:27:eb:3d:00:87

MONGO_URI = 'mongodb+srv://lockAdmin:lock2021@lock.6q6fl.mongodb.net/lock?retryWrites=true&w=majority'
client = MongoClient(MONGO_URI)

db = client['lock']
locks = db.locks

a_lock = locks.find_one()
images = a_lock['images']

for image in images:
	username = image['username']
	filename = image['filename']
	img_data = image['img']['data']
	with open('{}_{}.png'.format(username, filename), 'wb') as file:
		file.write(img_data)

# pprint.pprint(locks.find_one())
# pprint.pprint(locks.find_one({'lockCode': '123'}))
