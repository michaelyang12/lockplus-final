#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Oct 18 16:31:08 2021

@author: gohan
"""

from predictor import Predictor
import cv2
from time import perf_counter
from functions import drawBox
import face_recognition
import matplotlib.pyplot as plt

model = Predictor()

while True: 
    userinput = input("Press Enter to authenticate, q to quit.")
    if userinput=='q':
        break
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 960)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 540)
    t0 = perf_counter()
    ret, frame_read = cap.read()                           # Capture frame and return true if frame present
    # For Assertion Failed Error in OpenCV
    if not ret:                                            # Check if frame present otherwise he break the while loop
        continue
    frame_rgb = cv2.cvtColor(frame_read, cv2.COLOR_BGR2RGB)  # Convert frame into RGB from BGR and resize accordingly
    frame_rgb = cv2.flip(frame_rgb,1)                        # flip the frame horizontally
    bboxes = face_recognition.face_locations(frame_rgb) 
    encodings = face_recognition.face_encodings(frame_rgb, bboxes)
    
    predictions = []
    validated = False
    for e in encodings:
        label = model.predictFromEncoding(e)
        if label is not None:
            validated = True
        else:
            label = "unknown"
        predictions.append(label)
        
    frame_rgb = drawBox(frame_rgb, predictions, bboxes)
    plt.imshow(frame_rgb)
    plt.show()
    print("--------------------------------")
    if validated:
        print("        Access Granted        ")
    else:
        print("   xxx   Access Denied   xxx   ")
    print("--------------------------------")
    print("(Time taken: {} secs)".format(perf_counter()-t0))
    cap.release()
