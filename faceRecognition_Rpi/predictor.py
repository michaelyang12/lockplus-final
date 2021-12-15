#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Oct 18 13:10:40 2021

@author: gohan
"""

import os
import face_recognition
import numpy as np
import cv2

users_folders_path = './users'

class Predictor():

    def __init__(self, users_folder=users_folders_path):

        self.users_folders = users_folder
        self.MAX_EDGE = 150 # max number of pixels for width and height of an image
        self.usernames = set(os.listdir(users_folder))
        self.imagesPaths = dict()
        self.updateListOfImages()
        self.updateAllEncodings()

    def updateListOfImages(self, users_folders_path=users_folders_path):
        users_folders = os.listdir(users_folders_path)
        for username in users_folders:
            user_path = users_folders_path + '/' + username
            for image_name in os.listdir(user_path):
                img_path = user_path + '/' + image_name
                self.imagesPaths[img_path] = username

    def addImagePath(self, username, img_path):
        self.imagesPaths[img_path] = username


    # update users' images list and encoding
    def updateAllEncodings(self, users_folders_path=users_folders_path):
        self.users_encodings = dict()
        # assign each user a list of their images
        users_folders = os.listdir(users_folders_path)
        for username in users_folders:
            self.updateUserEncoding(username)


    def updateUserEncoding(self, username):
        user_folder = self.users_folders + '/' + username
        user_images = []
        for file in os.listdir(user_folder):
            img_path = user_folder + '/' + file
            img = face_recognition.load_image_file(img_path)
            img = self._reduceImageSize(img)
            encodings = face_recognition.face_encodings(img)
            if len(encodings) == 0:
                print('cannot detect face in', file)
                continue
            encoding = encodings[0]
            user_images.append(encoding)

        # if len(user_images):
        self.users_encodings[username] = user_images
        print("{} images found. Updated user encoding for {}".format(len(user_images), username))


    def predictFromEncoding(self, img_encoding, THRESHOLD=0.6):
        # THRESHOLD closer to 0 means the 2 faces have to match more
        min_distance = float('inf')
        matched_user = None
        for user_name in self.users_encodings.keys():
            distances = face_recognition.face_distance(self.users_encodings[user_name], img_encoding)
            # print(user_name,distances, np.mean(distances))
            mean_distance = np.mean(distances)
            if mean_distance < THRESHOLD and mean_distance < min_distance:
                min_distance = mean_distance
                matched_user = user_name
        # print("Min distance: ", min_distance)
        # print(matched_user)
        return matched_user


    def predictFromPath(self, img_path):
        unknown_image = face_recognition.load_image_file(img_path)
        unknown_image = self._reduceImageSize(unknown_image)
        unknown_encoding = face_recognition.face_encodings(unknown_image)
        if (len(unknown_encoding) == 0):
            print("No face detected")
            return None
        unknown_encoding = unknown_encoding[0]
        matched_user = self.predictFromEncoding(unknown_encoding)
        return matched_user


    def validateFromPath(self, img_path):
        predicted_user = self.predictFromPath(img_path)
        if predicted_user is not None:
            return True
        return False

    def validateFromEncoding(self, img_encoding):
        predicted_user = self.predictFromEncoding(img_encoding)
        if predicted_user is not None:
            return True
        return False

    def _reduceImageSize(self, img):
        w,h = img.shape[:2]
        if w > self.MAX_EDGE or h > self.MAX_EDGE:
            if w >= h:
                h = int(h/(w/150))
                w = 150
            else:
                w = int(w/(h/150))
                h = 150
            return cv2.resize(img, (h,w))
        return img
