import React, { useState } from 'react';
import axios from 'axios';

function UploadedUserImages(props) {
  var visibility = props.isUserSelected ? 'visible' : 'invisible';
  const image = props.image;
  const email = props.email;
  console.log(image);
  const [bufferConv, setBufferConv] = useState('');
  /*if (bufferConv === '') {
    setBufferConv(btoa(String.fromCharCode.apply(null, image.img.data.data)));
  }*/
  var dataimg =
    `data:${image.img.contentType};base64,` +
    Buffer.from(String.fromCharCode.apply(null, image.img.data.data));
  function deleteImg(e) {
    e.preventDefault();
    axios
      .post('https://lockplus.tk/api/deletephoto', {
        email: email,
        image: image,
      })
      .catch((err) => console.log(err))
      .then((response) => {
        console.log(response);
      });
    //router.push('/home');
  }
  return (
    <>
      <div className="h-full w-full relative border-blue">
        <div className="h-full w-full object-contain">
          <img src={dataimg} alt="something went wrong" />
        </div>
        <button
          className="absolute top-0 right-0 w-16 h-6 bg-red-500 rounded-bl-sm text-sm text-white font-lockplus focus:outline-none"
          onClick={deleteImg}>
          delete
        </button>
      </div>
    </>
  );
}

export default UploadedUserImages;
