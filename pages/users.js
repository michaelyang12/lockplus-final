import HomeSidebar from '../components/HomeSidebar';
import UsersForm from '../components/UsersForm';
import React, { Component, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

function UsersPage(props) {
  const router = useRouter();
  const usersList = props.userList;
  const email = props.sessionEmail;
  const images = props.userImages;
  const [loading, setLoading] = useState(true);
  var imagesDisplay = []
  console.log(usersList);
  console.log('help');
  console.log(images[0]);
  //useEffect(() => {router.replace('/users')}, [props])
  usersList.forEach((user) => {
    images.forEach((image) => {
      if (user === image.username) {
        var source = '';
        axios
          .post(`/api/singlephoto/${image.filename}`, {
            email: email,
          })
          .catch((err) => console.log(err))
          .then((response) => {
            source = `data:${response.data.cType};base64,${Buffer.from(response.data.buffer).toString('base64')}`;
            var foo = { 
              'user' : user, 
              'image' : image, 
              'source' : source,
            };
            imagesDisplay.push(foo);
          });
      }
    });
  });

//img source key
    return (  
      loading ? (
        <>
          <div class="h-screen w-screen bg-lockplus-opacGray overscroll-contain overflow-hidden">
            <div class="relative flex bg-gray-800 justify-start">
              <div>
                <HomeSidebar selectedTab={'users'} />
              </div>
              <div>
                {/* <button onClick={refresh}>RELOAD</button> */}
                <UsersForm
                  userlist={usersList}
                  sessionEmail={email}
                  userImages={images}
                  imageDisplay={imagesDisplay}
                  isLoading={loading}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={150}
            width={150}
            visible={loading} 
          />
        </div>
      )
    );
}

export default UsersPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let param = 'nulled';
  if (session) {
    param = session.user.email;
  }
  console.log('param' + param);
  var users = [];
  let images = [];
  await axios
    .post('http://localhost:3000/api/getusers', {
      email: param,
    })
    .catch((err) => {
      console.log('err getusers from client');
      console.log(err.message);
    })
    .then((response) => {
      if (response) {
        users = response.data.users;
        images = response.data.images;
        console.log('success');
        console.log(users);
        console.log(images);
      }
    });
  return {
    props: {
      userList: users,
      sessionEmail: param,
      userImages: images,
    },
  };
}
