import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import convertTime from '../../util/convertTime';
import convertDate from '../../util/convertDate';

function SingleHistoryImage(props) {
  const email = props.email;
  const index = props.index;
  const [source, setSource] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [timestamp, setTimestamp] = useState('');
  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');
  const [apiDone, setApiDone] = useState(false);
  useEffect(() => {
    console.log('is this even working? history addition');
    axios
      .post(`/api/singlehistory/${index}`, {
        email: email,
      })
      .catch((err) => console.log(err))
      .then((response) => {
        console.log('response');
        if (response) {
          console.log(response.data);
          //normally will be response.data.cType
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
          // if (index === hCount) {
          //   props.setSelectedUsername(username);
          //   props.setSelectedDate(date);
          //   props.setSelectedAccepted(accepted);
          //   props.setSelectedSource(source);
          //   props.setSelectedTimestamp(timestamp);
          //   props.setSelectedHistory(index);
          // }
        }
      });
  }, []);
  const clickHandler = () => {
    /*props.setSelectedUsername(username);
    props.setSelectedDate(date);
    props.setSelectedAccepted(accepted);
    props.setSelectedSource(source);
    props.setSelectedTimestamp(timestamp);
    props.setSelectedHistory(index);*/
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
            <span>{username}</span> accessed at
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
        <div class={`w-32 h-32 border border-lockplus-textGray ml-4 mb-4 mt-4`}>
          <div
            class={`visible absolute -top-0 h-48 w-48 opacity-40 bg-gray-800 font-md text-white font-regular font-lockplus`}>
            <div class="mt-12 ml-14">
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
