import UsersIcon from '../assets/icons/UsersIcon';
import { useRouter } from 'next/router';

function UsersBar(props) {
  const router = useRouter();
  
  const click = () => {
    router.push('/users')
    // props.setSelectedItem("users")
  }

  const selectedDisplay = props.selectedItem == "users"
    ? "font-bold"
    : "font-regular"

  return (
    <a
      href="#"
      class={`text-white ${selectedDisplay} flex items-center space-x-2 px-4 ml-1 hover:text-lockplus-hoverGray`}
      onClick={click}>
      <UsersIcon />
      <span class="text-md font-md font-lockplus">users</span>
    </a>
  );
}

export default UsersBar;
