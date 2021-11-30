import connectDB from '../../util/database';
require('../../models/Lock');
require('../../models/UpdateStatus');
import mongoose from 'mongoose';
const Lock = mongoose.model('Lock');
const UpdateStatus = mongoose.model('UpdateStatus');

export default async (req, res) => {
  const { method } = req;
  await connectDB(); //async connect to the database
  console.log('in adduser');
  if (method === 'POST') {
    try {
      //const LC = req.body.lockCode;
      const PE = req.body.email;
      const NU = req.body.user;
      const data = {
        account_email: PE,
      };
      console.log('data');
      console.log(data);
      let lockToModify = await Lock.findOne(data);
      console.log('lock');
      console.log(lockToModify);
      if (lockToModify) {
        console.log('modify found');
        console.log(lockToModify);
        lockToModify.users.push(NU);
        lockToModify.save();
        console.log('newlock');
        console.log(lockToModify);
        let update = await UpdateStatus.findOne(data);
        update.user_status = true;
        update.save();
        res.status(201).json({
          success: true,
          message: 'lock updated',
          statusText: 'user added',
        });
      } else {
        res.status(400).json({
          success: false,
          message: error.message,
          statusText: 'error in add user',
        });
      }
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

/*if (session) {
    param = session.user.email;
  }
  console.log('param' + param);
  var users = [];
  await axios
    .post('https://lockplus.tk/api/getusers', { email: param })
    .catch((err) => {
      console.log('err getusers from client');
      console.log(err.message);
    })
    .then((response) => {
      if (response) {
        users = response.data.users;
        console.log('success');
        console.log(users);
      }
    });*/
