import { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { useSession } from 'next-auth/react';
import axios from 'axios';

function AddUserModal(props) {
  const [input, setInput] = useState('');
  const [userExists, setDoesUserExist] = useState(false);
  const { data: session, status } = useSession();
  const [sessionEmail, setSessionEmail] = useState('null');
  if (session && sessionEmail === 'null') {
    setSessionEmail(session.user.email);
  }
  const addUser = () => {
    if (input.length > 0) {
      for (var i = 0; i < props.usersList.length; i++) {
        if (props.usersList[i] == input) {
          setDoesUserExist(true);
          alert("User already exists");
          return;
        } else {
          setDoesUserExist(false);
        }
      }
      if (!userExists) {
        axios
          .post('/api/adduser', {
            user: input,
            email: sessionEmail,
          })
          .catch((err) => console.log(err));
        console.log(input + ' Added!');
        var user = input;
        props.usersList.push(user);
        setInput('');
        props.toggleFunc();
      } else {
        alert('User/Name already exists!');
      }
    } else {
      alert('Please input a username');
    }
  };

  const cancel = () => {
    setInput('');
    props.toggleFunc();
  };
  // "relative flex h-screen w-screen bg-blue-100 container p-4"
  return (
    <Modal
      isOpen={props.open}
      toggle={props.toggleFunc}
      modalClassName="relative h-screen w-screen p-4 bg-lockplus-backgroundBlue text-lockplus-textGray">
      <div>
        <ModalHeader toggle={props.toggleFunc}> </ModalHeader>
        <ModalBody>
          <div className="relative text-xl font-bold font-lockplus mt-2 text-center pr-4 ml-20 hover:text-gray-900">
            Add a user
          </div>
          <div className="relative left-96">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="relative h-8 w-48 bg-blue-200 left-64 bg-opacity-50 mt-4 focus: outline-none rounded-xl pl-4 placeholder-gray-400 font-light font-lockplus text-lockplus-textGray"
              placeholder="New user name"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="font-light text-black bg-blue-300 group h-6 w-24 mt-2 relative left-96 ml-64 top-4 rounded-full focus:outline-none hover:bg-blue-400 transition ease-out duration-100 mt-1.5"
            onClick={addUser}>
            Add User
          </button>
          <button
            className="font-light text-black bg-blue-300 group h-6 w-24 mt-2 relative left-96 ml-2 top-4 rounded-full focus:outline-none hover:bg-blue-400 transition ease-out duration-100 mt-1.5"
            onClick={cancel}>
            Cancel
          </button>
        </ModalFooter>
      </div>
    </Modal>
  );
}
export default AddUserModal;
