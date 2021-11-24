import connectDB from '../../util/database';
require('../../models/Lock');
import mongoose from 'mongoose';
const Lock = mongoose.model('Lock');

export default async (req, res) => {
  const { method } = req;
  await connectDB(); //async connect to the database
  console.log('****************** in deleteuser *******************');
  if (method === 'POST') {
    try {
      const AE = req.body.email;
      const deleteIndex = req.body.deleteIndex;
      const username = req.body.username;
      console.log(deleteIndex);
      const data = {
        account_email: AE,
      };
      console.log('data');
      console.log(data);
      let lockToModify = await Lock.findOne(data);
      console.log('lock');
      console.log(lockToModify);
      if (lockToModify) {
        console.log('delete found');
        console.log(lockToModify);
        lockToModify.users.splice(deleteIndex, 1);
        let i = 0;
        for (i = 0; i < lockToModify.images.length; i++) {
          if (lockToModify.images[i].username === username) {
            lockToModify.images.splice(i, 1);
          }
        }
        lockToModify.save();
        console.log('newlock');
        console.log(lockToModify);
        res.status(201).json({
          success: true,
          message: 'lock updated',
          statusText: 'user deleted',
        });
      } else {
        res.status(400).json({
          success: false,
          message: error.message,
          statusText: 'error in delete user',
        });
      }
    } catch (error) {
      console.log('error here');
      res.status(400).json({
        success: false,
        message: error.message,
        statusText: 'error in delete user',
      });
    }
  } else {
    res.status(400).json({ success: false, statusText: 'wrong axios method' });
  }
};
