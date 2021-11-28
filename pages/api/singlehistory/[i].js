import connectDB from '../../../util/database';
require('../../../models/Lock');
import mongoose from 'mongoose';
const Lock = mongoose.model('Lock');

export default async (req, res) => {
  const { method } = req;
  const index = req.query.i;
  console.log(index);
  await connectDB(); //async connect to the database
  console.log('in single history');
  if (method === 'POST') {
    try {
      console.log('marker1');
      const data = {
        account_email: req.body.email,
      };
      const lock = await Lock.findOne(data);
      const target = lock.history[index];
      res.status(201).json({
        success: true,
        message: 'lock updated',
        statusText: 'user added',
        buffer: target.img.data,
        //cType: target.img.contentType,
        accepted: target.accepted,
        timestamp: target.timestamp,
        username: target.username,
      });
    } catch (error) {
      console.log('error here');
      res.status(400).json({
        success: false,
        message: error.message,
        statusText: 'error in singlehistory',
      });
    }
  } else {
    res.status(400).json({ success: false, statusText: 'wrong axios method' });
  }
};
