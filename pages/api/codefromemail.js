import connectDB from '../../util/database';
require('../../models/Lock');
import mongoose from 'mongoose';
const Lock = mongoose.model('Lock');

export default async (req, res) => {
  const { method } = req;
  await connectDB(); //async connect to the database
  console.log('in codefromemail');
  if (method === 'POST') {
    try {
      console.log('pre email');
      const email = req.body.email;
      console.log('post email');
      const data = {
        account_email: email,
      };
      //console.log(data);
      const lock = await Lock.findOne(data);
      console.log('newlock');
      console.log(lock);
      res.status(201).json({
        success: true,
        message: 'lock created',
        statusText: 'not validated',
        code: lock.lockCode || '0',
      });
    } catch (error) {
      console.log('error here');
      res.status(400).json({
        success: false,
        message: error.message,
        statusText: 'error in validation',
        code: '0',
      });
    }
  } else {
    res.status(400).json({ success: false, statusText: 'wrong axios method' });
  }
};
