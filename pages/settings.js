import HomeSidebar from '../components/HomeSidebar';
import LoginForm from '../components/LoginForm';
import SettingsForm from '../components/SettingsForm';

function SettingsPage(props) {

  return (
    <div class="h-screen w-screen bg-lockplus-opacGray">
      <div class="relative flex bg-gray-800 justify-start">
        <div>
          <HomeSidebar 
            selectedTab = {"settings"}
          />
        </div>
        <div>
          <SettingsForm/>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;