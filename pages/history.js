import HomeSidebar from '../components/HomeSidebar';
import LoginForm from '../components/LoginForm';
import HistoryForm from '../components/HistoryForm';

function HistoryPage(props) {

  return (
    <div class="h-screen w-screen bg-lockplus-opacGray">
      <div class="relative flex bg-gray-800 justify-start">
        <div>
          <HomeSidebar
            selectedTab={"history"}
          />
        </div>
        <div>
          <HistoryForm/>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;