import connectDB from '../../util/database';
require('../../models/Lock');
require('../../models/UpdateStatus');
import mongoose from 'mongoose';
const Lock = mongoose.model('Lock');
const UpdateStatus = mongoose.model('UpdateStatus');
import slugify from 'slugify';

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
        const safeUser = slugify(username ?? '', {
          remove: /[^\w_\-]/g,
        });
        let i = 0;
        for (i = 0; i < lockToModify.images.length; i++) {
          if (lockToModify.images[i].username === safeUser) {
            lockToModify.images.splice(i, 1);
          }
        }
        lockToModify.save();
        let update = await UpdateStatus.findOne({ account_email: AE });
        update.user_status = true;
        update.save();
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
