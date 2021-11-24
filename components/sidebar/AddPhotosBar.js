import { useRouter } from 'next/router';
import AddPhotosIcon from '../assets/icons/AddPhotosIcon';

function AddPhotosBar(props) {
  const router = useRouter();
  return (
    <a
      href="#"
      class="text-white flex items-center space-x-2 px-4 ml-1 hover:text-lockplus-hoverGray"
      onClick={() => router.push('/photos')}>
      <AddPhotosIcon />
      <span class="text-lg font-bold font-lockplus">photos</span>
    </a>
  );
}

export default AddPhotosBar;
