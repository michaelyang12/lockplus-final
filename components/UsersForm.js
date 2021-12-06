import { useState } from 'react';
import { useRouter } from 'next/router';
import UsersFormSidebar from './user_page/user_sidebar/UsersFormSidebar';
import UserComponent from './user_page/user_sidebar/UserComponent';
import AddUserButton from './user_page/user_sidebar/AddUserButton';
import AddUserModal from './user_page/AddUserModal';
import { PhotosForm } from './PhotosForm';
import SingleUserPage from './user_page/SingleUserPage';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import DeleteUserButton from './user_page/user_sidebar/DeleteUserButton';

function UsersForm(props) {
  var usersDisplay = [];
  //var users = [];
  const userList = props.userlist;
  const userCount = userList.length;
  const images = props.userImages;
  const email = props.sessionEmail;
  const code = props.code;
  const router = useRouter();
  const primaryUser = userList[0] ? userList[0] : '';
  console.log(props.email);

  const [selectedUser, setSelectedUser] = useState(primaryUser);

  for (var i = 0; i < userCount; i++) {
    const currentUser = userList[i];
    const isPrimaryUser = currentUser == primaryUser ? true : false;
    usersDisplay.push(
      <div key={i}>
        <UserComponent
          user={currentUser}
          userList={props.userlist}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          isPrimaryUser={isPrimaryUser}
        />
      </div>
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div class="relative flex justify-start">
      <div>
        <UsersFormSidebar setSelectedUser={setSelectedUser}>
          {usersDisplay.map((user) => (
            <div>{user}</div>
          ))}
          <div />
          <AddUserButton clickAction={toggle} />
        </UsersFormSidebar>
      </div>
      <div>
        <SingleUserPage
          user={selectedUser}
          images={images}
          email={email}
          code={code}
        />
        <AddUserModal
          open={isModalOpen}
          toggleFunc={toggle}
          usersList={props.userlist}
          // sessionEmail={props.email}
        />
      </div>
      <div></div>
    </div>
  );
}

export default UsersForm;
