import os
import face_recognition
import matplotlib.pyplot as plt
import numpy as np
from time import perf_counter
import cv2
from functions import drawBox

users_folders_path = 'known'
test_folder_path = 'unknown'


users_folders = os.listdir(users_folders_path)
users_encodings = dict()

# assign each user a list of their images
for parent, subfolders, images in os.walk(users_folders_path):
    user_name = parent.split('/')[-1]
    user_images = []
    for img_name in images:
        img_path = parent + '/' + img_name
        img = face_recognition.load_image_file(img_path)
        encodings = face_recognition.face_encodings(img)
        if len(encodings) == 0:
            print('cannot detect face in', img_name)
            continue
        encoding = encodings[0]
        user_images.append(encoding)
    if len(user_images):
        users_encodings[user_name] = user_images


'''
Recognize if an user is present given the encoding of an unknown image 
'''
def recognize(img_encoding, THRESHOLD=0.6,):
    # THRESHOLD closer to 0 means the 2 faces have to match more
    min_distance = float('inf')
    matched_user = None
    for user_name in users_encodings.keys():
        distances = face_recognition.face_distance(users_encodings[user_name], img_encoding)
        # print(user_name,distances, np.mean(distances))
        mean_distance = np.mean(distances)
        if mean_distance < THRESHOLD and mean_distance < min_distance:
            min_distance = mean_distance
            matched_user = user_name
    # print("Min distance: ", min_distance)
    # print(matched_user)
    return matched_user if matched_user is not None else "unknown"


'''
Go through the unknown images folder and predict each one
'''
def predictAllUnknownImages():
    for img_path in os.listdir(test_folder_path):
        result = predictSingleImageFromPath(img_path)
        input("Enter to continue")
       
        
'''
Predict a single image in the unknown folder given the image name
'''
def predictSingleImageFromPath(img_path, showImage=True):
    t0 = perf_counter()
    
    unknown_image = face_recognition.load_image_file(test_folder_path + '/' + img_path)
    
    if showImage:
        plt.imshow(unknown_image)
        plt.show()
        
    unknown_encoding = face_recognition.face_encodings(unknown_image)
    if (len(unknown_encoding) == 0):
        print("No face detected")
        return None
    
    unknown_encoding = unknown_encoding[0]
    matched_user = recognize(unknown_encoding)
    if matched_user is not None:
        print("Matched user: ", matched_user)
    print("Prediction time: {} secs".format(perf_counter() - t0))
    return matched_user



'''
 Video Stream
'''
def videoStream():
    cap = cv2.VideoCapture(0)
    # frame_width = int(cap.get(3))                                   # Returns the width and height of capture video
    # frame_height = int(cap.get(4))
    # print(frame_width, frame_height)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 960)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 540)
    streaming = True
    last_time = 0
    cur_time = 0
    while streaming:
        cur_time = perf_counter()
        if cur_time - last_time > 0.03: 
            ret, frame_read = cap.read()                                  # Capture frame and return true if frame present
            # For Assertion Failed Error in OpenCV
            if not ret:                                                  # Check if frame present otherwise he break the while loop
                break
            frame_rgb = cv2.cvtColor(frame_read, cv2.COLOR_BGR2RGB)      # Convert frame into RGB from BGR and resize accordingly
            frame_rgb = cv2.flip(frame_rgb,1)                              # flip the frame horizontally
            bboxes = face_recognition.face_locations(frame_rgb) 
            encodings = face_recognition.face_encodings(frame_rgb, bboxes)
    
            predictions = []
            for e in encodings:
                label = recognize(e)
                predictions.append(label)
            frame_rgb = drawBox(frame_rgb, predictions, bboxes)
            frame = cv2.cvtColor(frame_rgb, cv2.COLOR_RGB2BGR)
    
            cv2.imshow('Stream', frame)                                    # Display Image window
            if cv2.waitKey(1) == 13:                                       # 'Enter' key
                streaming = False
        last_time = cur_time
    cap.release()



'''
Testing
'''
# predictAllUnknownImages()
# predictSingleImageFromPath('mask.jpg')

        
videoStream()


