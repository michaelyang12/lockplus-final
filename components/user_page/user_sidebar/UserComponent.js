import SingleUserIcon from '../../assets/icons/SingleUserIcon';
import DeleteUserButton from './DeleteUserButton';
import { Button } from 'reactstrap';

function UserComponent(props) {
  const user = props.user
  // const userList = props.userList
  const userDisplay = user.length > 16
    ? user.substring(0, 16) + "..."
    : user

  const click = () => {
    props.setSelectedUser(user);
    //props.clickAction();
  }

  const rootUserText = props.isPrimaryUser 
    ? "(root)"
    : ""

  return (
    <>
      <span class="inline-flex">
        {/* <div class="text-gray-100 mr-2">
          
        </div> */}
        <button 
          class="flex hover:text-gray-900 hover:bg-blue-200 bg-blue-100 h-7 w-44 rounded-md text-gray-700 text-sm font-light font-lockplus flex space-x-2" 
          onClick={click}
        >
          <p class="mt-1.5 ml-2">
            <SingleUserIcon/>
          </p>
          <p class="mt-1">
            {userDisplay} 
          </p>
          <p class="mt-1 text-gray-400">
            {rootUserText}
          </p>
        </button>
        <div class="absolute left-48 ml-1.5 mt-0.5">
          <DeleteUserButton 
            user={user}
            userList={props.userList}
          />
        </div>
      </span>

    </>
  );
}

export default UserComponent;
