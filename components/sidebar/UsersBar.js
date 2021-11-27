import UsersIcon from '../assets/icons/UsersIcon';
import { useRouter } from 'next/router';
import Link from 'next/dist/client/link';

function UsersBar(props) {
  const router = useRouter();
  
  // const click = () => {
  //   router.push('/users')
  //   // props.setSelectedItem("users")
  // }

  const selectedDisplay = props.selectedItem == "users"
    ? "font-bold"
    : "font-regular"

  return (
    <Link href='/users'>
      <a
        class={`text-white ${selectedDisplay} flex items-center space-x-2 px-4 ml-1 hover:text-lockplus-hoverGray`}
      >
        <UsersIcon />
        <span class="text-md font-md font-lockplus">users</span>
      </a>
    </Link>
  );
}

export default UsersBar;
