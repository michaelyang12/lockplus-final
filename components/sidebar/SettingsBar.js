import SettingsIcon from "../assets/icons/SettingsIcon";
import { useRouter } from 'next/router';

function SettingsBar(props) {
        // const {
        //     componentType, // eslint-disable-line
        //     componentClass: Component,
        //     disabled,
        //     expanded,
        //     onToggle, // eslint-disable-line
        //     onSelect,
        //     className,
        //     children,
        //     ...props
        // } = this.props;

        
        const router = useRouter();
        const selectedDisplay = props.selectedItem == "settings"
        ? "font-bold"
        : "font-regular"
        return (
            <a 
             href="#" 
             class={`text-white ${selectedDisplay} flex items-center space-x-2 px-4 ml-1 hover:text-lockplus-hoverGray`}
             onClick = {() => router.push('/settings')}
            >
                <SettingsIcon/>
                <span class="text-md font-md font-lockplus">
                    settings
                </span>
            </a>
        );
}

export default SettingsBar;