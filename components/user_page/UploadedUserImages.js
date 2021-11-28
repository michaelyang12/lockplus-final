import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import DeleteIcon from '../assets/icons/DeleteIcon';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/router';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function UploadedUserImages(props) {
  const router = useRouter();
  var visibility = props.isUserSelected ? 'visible' : 'invisible';
  const image = props.image;
  const email = props.email;
  console.log(image);

  const [isRefreshing, setIsRefreshing] = React.useState(false);
  
  function refreshData() {
    router.replace('/users');
    setIsRefreshing(true);
  };

  React.useEffect(() => {
    setIsRefreshing(false);
  }, [props]);

  var visibility = isRefreshing
    ? "visible"
    : "invisible"

  function deleteImg(e) {
    e.preventDefault();
    console.log('delete image call');
    const res = axios
      .post('/api/deletephoto', {
        email: email,
        filename: image.filename,
      })
      .catch((err) => console.log(err))
      .then((response) => {
        console.log(response);
      });
    if (res.status < 300) {
      refreshData();
    }
  }

  return (
    <>
      <div className="h-full w-full relative">
        <div className="h-full w-full object-contain">
          {/* <img
            src={`data:${image.img.contentType};base64,${Buffer.from(
              image.img.data
            ).toString('base64')}`}
            alt="something went wrong"
          /> */}
          <Image
            src={`data:${image.img.contentType};base64,${Buffer.from(
              image.img.data
            ).toString('base64')}`}
            alt="something went wrong"
            width={190}
            height={190}
          />
          <div class={`${visibility} absolute -top-0 h-48 w-48 opacity-80 bg-gray-800 font-md text-white font-regular font-lockplus`}>
            <div class='mt-12 ml-14'>
              Deleting...
              <Loader
                type="TailSpin"
                color="#FFFFFF"
                height={70}
                width={70}
                visible={isRefreshing} 
              />
            </div>
          </div>
        </div>
        <button
          className="absolute top-0 right-0 mr-4 rounded-bl-sm text-xs text-red-500 font-lockplus hover:text-red-700 focus:outline-none"
          onClick={deleteImg}>
          X
        </button>
      </div>
    </>
  );
}

export default UploadedUserImages;
