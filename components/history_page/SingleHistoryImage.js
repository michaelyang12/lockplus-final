import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import convertTime from '../../util/convertTime';
import convertDate from '../../util/convertDate';

function SingleHistoryImage(props) {
  const email = props.email;
  let index = props.index;
  const hCount = props.hCount;
  const [source, setSource] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [timestamp, setTimestamp] = useState('');
  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');
  const [apiDone, setApiDone] = useState(false);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useMemo(() => {
    setApiDone(false);
    console.log('single history img');
    console.log(index);
    axios
      .post(`/api/singlehistory/${index}`, {
        email: email,
      })
      .catch((err) => console.log(err))
      .then((response) => {
        if (response) {
          setSource(
            `data:image/jpeg;base64,${Buffer.from(
              response.data.buffer
            ).toString('base64')}`
          );
          const displayTime = convertTime(response.data.timestamp);
          const displayDate = convertDate(response.data.timestamp);
          console.log(displayTime);
          setTimestamp(displayTime);
          setDate(displayDate);
          setUsername(response.data.username);
          setAccepted(response.data.accepted);
          setApiDone(true);
        }
      });
  }, [props.index]);
  const clickHandler = () => {
    props.setSelectedUser({
      username: username,
      source: source,
      index: index,
      accepted: accepted,
      time: timestamp,
      date: date,
    });
  };
  return (
    <>
      {apiDone ? (
        <button
          class="flex relative bg-lockplus-historyBlue w-full mb-4 rounded-lg h-48 pt-2 focus:outline-none transform hover:scale-102"
          onClick={clickHandler}>
          <div class={`w-36 h-36 ml-4 mb-4 mt-4 flex-shrink-0`}>
            <Image
              src={source}
              alt="something went wrong"
              className="object-cover rounded-sm"
              width={512}
              height={512}
            />
          </div>
          <p class="font-lockplus font-light text-sm ml-4 mt-4">
            <span>{capitalizeFirstLetter(username)}</span> accessed at
            <span class="font-bold"> {timestamp}</span> and was
            <span class={accepted ? 'text-green-500' : 'text-red-500'}>
              {accepted ? ' accepted' : ' rejected'}
            </span>
            .
          </p>
          <div className="absolute right-0 bottom-0 h-12 w-auto whitespace-nowrap p-4 text-right text-black text-sm font-lockplus font-md">
            {date}
          </div>
        </button>
      ) : (
        //MODIFY APPEARANCE
        <div class={`w-96 h-48 ml-4 mb-4 mt-4`}>
          <div
            class={`visible h-full w-full opacity-40 bg-gray-800 font-md text-white font-regular font-lockplus`}>
            <div class="ml-14 pt-8">
              Loading...
              <Loader
                type="TailSpin"
                color="#FFFFFF"
                height={70}
                width={70}
                visible={true}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleHistoryImage;
