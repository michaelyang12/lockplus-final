import connectDB from '../../../util/database';
require('../../../models/Lock');
import mongoose from 'mongoose';
const Lock = mongoose.model('Lock');

export default async (req, res) => {
  const { method } = req;
  const index = req.query.i;
  await connectDB(); //async connect to the database
  if (method === 'POST') {
    try {
      const data = {
        account_email: req.body.email,
      };
      const history = await Lock.findOne(data, 'history');
      const target = history.history[index];
      res.status(201).json({
        success: true,
        message: 'lock updated',
        statusText: 'user added',
        buffer: target.img.data,
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
