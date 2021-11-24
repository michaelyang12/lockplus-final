
function UsersFormSidebar(props) {
    return (
      <div class="sidebar space-y-2 py-1 px-4 bg-blue-100 w-56 h-screen border border-blue-300 border-solid">
        <span class="relative flex text-gray-700 items-center mt-8 mb-6 space-x-2 px-4 text-lg font-light font-lockplus">
          Users
        </span>
        {props.children}
      </div>
    );
  }
  export default UsersFormSidebar