import AddUserIcon from "../../assets/icons/AddUserIcon";

function AddUserButton(props) {
    return (
      <button 
        type="button"
        onClick={props.clickAction}
      >
        <span href="#" class="relative left-2 h-7 w-28 rounded-md hover:text-gray-800 text-gray-700 bg-blue-100 hover:bg-blue-200 -ml-4 flex items-center space-x-2 px-4">
          <AddUserIcon/>
          <span class="text-xs font-lockplus">Add User</span>
        </span>
      </button>

    );
  }

  export default AddUserButton