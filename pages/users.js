import HomeSidebar from '../components/HomeSidebar';
import LoginForm from '../components/LoginForm';
import UsersForm from '../components/UsersForm';
import React, { Component, useState } from 'react';
import AddUserModal from '../components/user_page/AddUserModal';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';

function UsersPage(props) {
  const router = useRouter();
  const usersList = props.userList;
  const email = props.sessionEmail;
  const images = props.userImages;
  console.log(usersList);
  console.log('help');
  console.log(images[0]);
  //useEffect(() => {router.replace('/users')}, [props])

  return (
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
            />
          </div>
        </div>
      </div>
    </>
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
    .post('http://lockplus.tk/api/getusers', {
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
