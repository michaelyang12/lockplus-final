import connectDB from '../../../util/database';
require('../../../models/Lock');
import mongoose from 'mongoose';
const Lock = mongoose.model('Lock');

export default async (req, res) => {
  const { method } = req;
  const filename = req.query.filename;
  console.log(filename);
  await connectDB(); //async connect to the database
  console.log('in single Photo');
  if (method === 'POST') {
    try {
      console.log('marker1');
      const data = {
        account_email: req.body.email,
      };
      const lock = await Lock.findOne(data);
      let image;
      lock.images.forEach((img) => {
        if (img.filename === filename) {
          image = img;
        }
      });
      console.log(image);
      res.status(201).json({
        success: true,
        message: 'lock updated',
        statusText: 'user added',
        buffer: image.img.data,
        cType: image.img.contentType,
      });
    } catch (error) {
      console.log('error here');
      res.status(400).json({
        success: false,
        message: error.message,
        statusText: 'error in singlephoto',
      });
    }
  } else {
    res.status(400).json({ success: false, statusText: 'wrong axios method' });
  }
};
