import HistoryIcon from "../assets/icons/HistoryIcon";
import { useRouter } from 'next/router';
import Link from 'next/link';

function HistoryBar(props) {
    const router = useRouter()
    const selectedDisplay = props.selectedItem == "history"
        ? "font-bold"
        : "font-regular"
    return (
        <Link href="/history">
            <a
             class={`text-white ${selectedDisplay} flex items-center space-x-2 px-4 ml-1 hover:text-lockplus-hoverGray`}
            >
             <HistoryIcon/>
             <span class="text-md font-md font-lockplus">
                history
             </span>
            </a>
        </Link>
        
    );
}

export default HistoryBar;