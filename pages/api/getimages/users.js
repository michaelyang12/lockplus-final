import connectDB from '../../../util/database';
require('../../../models/Lock');
import mongoose from 'mongoose';
const Lock = mongoose.model('Lock');

export default async (req, res) => {
  const { method } = req;
  await connectDB(); //async connect to the database
  if (method === 'POST') {
    try {
      const data = {
        account_email: req.body.email,
      };
      console.log('prelock');
      const lock = await Lock.findOne(data);
      console.log('postlock');
      const index = req.body.index;
      const newIndex = index + 1;
      const cont = newIndex >= lock.images.length ? false : true;
      res.status(201).json({
        success: true,
        message: 'lock updated',
        statusText: 'user added',
        image: lock.images[index],
        index: newIndex,
        run: cont,
      });
    } catch (error) {
      console.log('error here');
      res.status(400).json({
        success: false,
        message: error.message,
        statusText: 'error in singlephoto',
      });
    }
  } else {
    res.status(400).json({ success: false, statusText: 'wrong axios method' });
  }
};
