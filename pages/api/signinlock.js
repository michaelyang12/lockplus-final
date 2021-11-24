import connectDB from '../../util/database';
require('../../models/Lock');
import mongoose from 'mongoose';
const Lock = mongoose.model('Lock');

export default async (req, res) => {
  const { method } = req;
  await connectDB(); //async connect to the database
  console.log('in validate');
  if (method === 'POST') {
    try {
      const email = req.body.email;
      //console.log(data);
      const newlock = await Lock.findOne({ account_email: email });
      //newlock.save();
      console.log('newlock');
      console.log(newlock);
      if (newlock) {
        console.log('lock exists');
        res.status(201).json({
          success: true,
          message: 'lock created',
          statusText: 'not validated',
        });
      } else {
        console.log('lock dne');
        res.status(400).json({
          success: false,
          message: 'hi lock dne',
          statusText: 'error in validation',
        });
      }
    } catch (error) {
      console.log('error here');
      res.status(400).json({
        success: false,
        message: error.message,
        statusText: 'error in validation',
      });
    }
  } else {
    res.status(400).json({ success: false, statusText: 'wrong axios method' });
  }
};
