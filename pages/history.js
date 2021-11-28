import HomeSidebar from '../components/HomeSidebar';
import LoginForm from '../components/LoginForm';
import HistoryForm from '../components/HistoryForm';
import { getSession } from 'next-auth/react';
import axios from 'axios';

function HistoryPage(props) {
  const hCount = props.historyCount;
  const email = props.email;
  return (
    <div class="h-screen w-screen bg-lockplus-opacGray">
      <div class="relative flex bg-gray-800 justify-start">
        <div>
          <HomeSidebar selectedTab={'history'} />
        </div>
        <div>
          <HistoryForm hCount={hCount} email={email} />
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let param = 'nulled';
  if (session) {
    param = session.user.email;
  }
  console.log('param' + param);
  let hCount = 0;
  await axios
    .post('http://localhost:3000/api/historycount', {
      email: param,
    })
    .catch((err) => {
      console.log('err getusers from client');
      console.log(err.message);
    })
    .then((response) => {
      if (response) {
        hCount = response.data.historyCount;
        console.log('success');
      }
    });
  return {
    props: {
      historyCount: hCount,
      email: param,
    },
  };
}
