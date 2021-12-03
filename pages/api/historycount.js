import connectDB from '../../util/database';
require('../../models/Lock');
require('../../models/UpdateStatus');
import mongoose from 'mongoose';
const Lock = mongoose.model('Lock');
const UpdateStatus = mongoose.model('UpdateStatus');

export default async (req, res) => {
  const { method } = req;
  await connectDB(); //async connect to the database
  console.log('in history count');
  if (method === 'POST') {
    try {
      console.log('marker1');
      const data = {
        account_email: req.body.email,
      };
      console.log('data');
      console.log(data);
      const lock = await Lock.findOne(data);
      console.log('lock');
      //console.log(lock);
      const code = lock.lockCode;
      let hCount = lock.history.length - 1;
      console.log(lock.history.length);
      let update = await UpdateStatus.findOne(data);
      update.history_status = false;
      update.save();
      res.status(201).json({
        success: true,
        message: 'lock updated',
        statusText: 'user added',
        historyCount: hCount,
        code: code,
      });
    } catch (error) {
      console.log('error here');
      res.status(400).json({
        success: false,
        message: error.message,
        statusText: 'error in history',
      });
    }
  } else {
    res.status(400).json({ success: false, statusText: 'wrong axios method' });
  }
};
