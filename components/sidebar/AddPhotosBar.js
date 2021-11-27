import { useRouter } from 'next/router';
import AddPhotosIcon from '../assets/icons/AddPhotosIcon';
import Link from 'next/link';

function AddPhotosBar(props) {
  const router = useRouter();
  return (
    <Link
      href="/photos"
      class="text-white flex items-center space-x-2 px-4 ml-1 hover:text-lockplus-hoverGray">
      <AddPhotosIcon />
      <span class="text-lg font-bold font-lockplus">photos</span>
    </Link>
  );
}

export default AddPhotosBar;
