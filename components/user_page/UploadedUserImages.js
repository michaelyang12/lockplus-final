import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UploadedUserImages(props) {
  var visibility = props.isUserSelected ? 'visible' : 'invisible';
  const image = props.image;
  //const [img, setImg] = useState({});
  //const [cType, setCType] = useState('');
  //const [buff, setBuff] = useState('');
  const [source, setSource] = useState('');
  const [apiDone, setApiDone] = useState(false);
  const email = props.email;
  console.log(image);
  useEffect(() => {
    console.log('is this even working?');
    axios
      .post(`/api/singlephoto/${image.filename}`, {
        email: email,
      })
      .catch((err) => console.log(err))
      .then((response) => {
        console.log('response');
        console.log(response.data);
        setSource(
          `data:${response.data.cType};base64,${Buffer.from(
            response.data.buffer
          ).toString('base64')}`
        );
        setApiDone(true);
      });
  }, []);
  function deleteImg(e) {
    e.preventDefault();
    console.log('delete image call');
    axios
      .post('/api/deletephoto', {
        email: email,
        filename: image.filename,
      })
      .catch((err) => console.log(err))
      .then((response) => {
        console.log(response);
      });
    //router.push('/home');
  }
  return (
    <>
      {apiDone ? (
        <div className="h-full w-full relative border-blue">
          <div className="h-full w-full object-contain">
            <img src={source} alt="something went wrong" />
          </div>
          <button
            className="absolute top-0 right-0 w-16 h-6 bg-red-500 rounded-bl-sm text-sm text-white font-lockplus focus:outline-none"
            onClick={deleteImg}>
            delete
          </button>
        </div>
      ) : (
        <div className="h-full w-full relative border-blue"></div>
      )}
    </>
  );
}

export default UploadedUserImages;
