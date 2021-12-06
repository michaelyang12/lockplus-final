import { isPropertySignature } from 'typescript';
import DeleteIcon from '../../assets/icons/DeleteIcon';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function DeleteUserButton(props) {
  const router = useRouter();
  const user = props.user;
  const { data: session, status } = useSession();
  const [sessionEmail, setSessionEmail] = useState('null');

  if (session && sessionEmail === 'null') {
    setSessionEmail(session.user.email);
  }

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    router.replace('/users');
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [props]);

  var loadVisibility = isRefreshing ? 'visible' : 'invisible';

  const click = () => {
    setIsRefreshing(true);
    const index = props.userList.indexOf(user);
    console.log(index);
    axios
      .post('/api/deleteuser', {
        email: sessionEmail,
        deleteIndex: index,
        username: user,
      })
      .catch((err) => console.log(err))
      .then((response) => {
        console.log('*****' + response.status + '******');
        console.log(user + ' removed!');
        props.setSelectedUser('');
        refreshData();
      });
  };

  const visibility =
    props.userList.indexOf(user) != 0 ? 'visible' : 'invisible';

  return (
    <>
      <div class="absolute top-1 right-4">
        <Loader
          type="Oval"
          color="#00BFFF"
          height={15}
          width={15}
          visible={isRefreshing}
        />
      </div>
      <button
        class={`text-red-500 hover:text-red-700 ${visibility}`}
        onClick={click}>
        <DeleteIcon />
      </button>
    </>
  );
}

export default DeleteUserButton;
