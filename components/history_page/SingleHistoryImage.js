import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import convertTime from '../../util/convertTime';

function SingleHistoryImage(props) {
  const email = props.email;
  const [source, setSource] = useState('');
  const [apiDone, setApiDone] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [timestamp, setTimestamp] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    console.log('is this even working? history addition');
    const response = axios
      .post(`/api/singlehistory/${props.index}`, {
        email: email,
      })
      .catch((err) => console.log(err))
      .then((response) => {
        console.log('response');
        console.log(response.data);
        //normally will be response.data.cType
        setSource(
          `data:image/jpeg;base64,${Buffer.from(response.data.buffer).toString(
            'base64'
          )}`
        );
        const displayTime = convertTime(response.data.timestamp);
        console.log(displayTime);
        setTimestamp(displayTime);
        setUsername(response.data.username);
        setAccepted(response.data.accepted);
        setApiDone(true);
      });
  }, []);
  return (
    <>
      {apiDone ? (
        <div class="inline-flex bg-lockplus-historyBlue w-full mb-4 rounded-lg">
          <div
            class={`w-32 h-32 border border-lockplus-textGray ml-4 mb-4 mt-4`}>
            <Image
              src={source}
              alt="something went wrong"
              className="object-cover"
              width={190}
              height={190}
            />
          </div>
          <p class="font-lockplus font-light text-sm ml-4 mt-4">
            {username} accessed at {timestamp} and was{' '}
            {accepted ? 'accepted' : 'rejected'}
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default SingleHistoryImage;
