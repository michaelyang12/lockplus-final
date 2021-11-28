import { isPropertySignature } from 'typescript';
import DeleteIcon from '../../assets/icons/DeleteIcon';
import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function DeleteUserButton(props) {
  const router = useRouter();
  const user = props.user;
  const { data: session, status } = useSession();
  const [sessionEmail, setSessionEmail] = useState('null');

  if (session && sessionEmail === 'null') {
    setSessionEmail(session.user.email);
  }
  
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  
  function refreshData() {
    router.replace('/users');
    setIsRefreshing(true);
  };

  React.useEffect(() => {
    setIsRefreshing(false);
  }, [props]);
  
  var loadVisibility = isRefreshing
    ? "visible"
    : "invisible"

  const click = () => {
    const index = props.userList.indexOf(user);
    console.log(index);
    axios
      .post('/api/deleteuser', {
        email: sessionEmail,
        deleteIndex: index,
        username: user,
      })
      .catch((err) => console.log(err));

    console.log(user + ' removed!');
    // props.userList.splice(index, 1)
    router.replace('/users');
  };

  const visibility =
    props.userList.indexOf(user) != 0 ? 'visible' : 'invisible';

  // var visibility = "visible"

  //   return (
  //     <div className={`text-md font-regular font-lockplus relative text-left mt-16 mr-12 inline-flex ${visibility}`} >
  //         Upload photos for this user:
  //         <div className="h-6 w-24 relative -mt-5">
  //             <PhotosForm
  //                 user={props.user}
  //             />
  //         </div>
  //     </div>

  return (
    <button
      class={`text-red-500 hover:text-red-700 ${visibility}`}
      onClick={click}>
      <DeleteIcon />
    </button>
  );
}

export default DeleteUserButton;
