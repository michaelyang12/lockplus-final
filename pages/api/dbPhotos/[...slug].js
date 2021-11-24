import nc from 'next-connect';
import multer from 'multer';
import fs from 'fs-extra';
//import fs from 'fs';
import connectDB from '../../../util/database';
require('../../../models/Lock');
import mongoose from 'mongoose';
const Lock = mongoose.model('Lock');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const photoUploadApi = nc({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const uploadMiddleware = upload.array('theFiles');
photoUploadApi.use(uploadMiddleware);

// Process a POST request, api stuff goes here
photoUploadApi.post(async (req, res) => {
  try {
    console.log('upload api, req');
    //console.log(req);
    const { slug } = req.query;
    console.log('slug');
    console.log(slug);
    const lc = slug[0];
    await connectDB();
    const data = {
      lockCode: lc,
    };
    console.log('lock');
    let lock = await Lock.findOne(data);
    console.log(lock);
    const filePath = './uploads/' + slug.join('/');
    console.log(filePath);
    console.log(slug[1]);
    console.log(req.files[0]);
    const imgBuffer = req.files[0].buffer;
    const cType = req.files[0].mimetype;
    const typeRegex = /image\//gm;
    const fileExt = cType.replace(typeRegex, '.');
    console.log(fileExt);
    const dateAppend = Date.now();
    console.log(imgBuffer);
    const newimg = {
      username: slug[1],
      img: { data: imgBuffer, contentType: cType },
      filename: slug[1] + dateAppend + fileExt,
    };
    console.log('newimg');
    console.log(newimg);
    let count = 0;
    lock.images.forEach((image) => {
      if (image.username === newimg.username) {
        count++;
      }
    });
    if (count < 4) {
      lock.images.push(newimg);
      lock.save();
      res.status(200).json({ success: true, message: 'Photo Uploaded!' });
    } else {
      res.status(200).json({
        success: true,
        message: 'You cannot upload more than 4 images for a single user!',
        statusText: 'count err',
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
});

export default photoUploadApi;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
