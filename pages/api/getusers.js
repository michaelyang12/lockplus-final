import connectDB from '../../util/database';
require('../../models/Lock');
import mongoose from 'mongoose';
const Lock = mongoose.model('Lock');

export default async (req, res) => {
  const { method } = req;
  //console.log('req');
  //console.log(req);
  await connectDB(); //async connect to the database
  console.log('in getusers');
  if (method === 'POST') {
    try {
      //const LC = req.body.lockCode;
      console.log('marker1');
      //const sEmail = req.body.email;
      const data = {
        account_email: req.body.email,
      };
      console.log('data');
      console.log(data);
      const lock = await Lock.findOne(data);
      console.log('lock');
      console.log(lock);
      res.status(201).json({
        success: true,
        message: 'lock updated',
        statusText: 'user added',
        //root_user: lock.parent_email,
        //children_users: lock.children_emails,
        users: lock.users,
        images: lock.images,
      });
    } catch (error) {
      console.log('error here');
      res.status(400).json({
        success: false,
        message: error.message,
        statusText: 'error in add user',
      });
    }
  } else {
    res.status(400).json({ success: false, statusText: 'wrong axios method' });
  }
};
