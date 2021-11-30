import connectDB from '../../../util/database';
require('../../../models/Lock');
import mongoose from 'mongoose';
const Lock = mongoose.model('Lock');

export default async (req, res) => {
  const { method } = req;
  const filename = req.query.filename;
  await connectDB(); //async connect to the database
  if (method === 'POST') {
    try {
      const image = await Lock.findOne(
        {
          images: {
            $elemMatch: {
              filename: filename,
            },
          },
        },
        {
          images: {
            $elemMatch: {
              filename: filename,
            },
          },
        }
      );
      res.status(201).json({
        success: true,
        message: 'lock updated',
        statusText: 'user added',
        buffer: image.images[0].img.data,
        cType: image.images[0].img.contentType,
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
