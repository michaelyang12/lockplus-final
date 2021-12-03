import connectDB from '../../../util/database';
require('../../../models/UpdateStatus');
import mongoose from 'mongoose';
const UpdateStatus = mongoose.model('UpdateStatus');

export default async (req, res) => {
  const { method } = req;
  const code = req.query.code;
  //console.log(email);
  console.log('ping');
  await connectDB(); //async connect to the database
  if (method === 'GET') {
    try {
      const data = {
        lockCode: code,
      };
      let update = await UpdateStatus.findOne(data);
      let retBool = false;
      if (update.history_status === true) {
        console.log('ping true');
        retBool = true;
        update.history_status = false;
        update.save();
      }
      res.status(201).json({
        success: true,
        message: 'pinged',
        statusText: 'pinged',
        startQuery: retBool,
      });
    } catch (error) {
      console.log('error here');
      res.status(400).json({
        success: false,
        message: error.message,
        statusText: 'error in status',
      });
    }
  } else {
    res.status(400).json({ success: false, statusText: 'wrong axios method' });
  }
};
