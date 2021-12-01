import HomeSidebar from '../components/HomeSidebar';
import LoginForm from '../components/LoginForm';
import HistoryForm from '../components/HistoryForm';
import SelectedHistory from '../components/history_page/SelectedHistory';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import convertTime from '../util/convertTime';
import convertDate from '../util/convertDate';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function HistoryPage(props) {
  const [hCount, setHCount] = useState(props.historyCount);
  const email = props.email;
  const router = useRouter();
  const code = props.code;
  const { data, error } = useSWR(`/api/getstatus/${code}`, fetcher, {
    refreshInterval: 10000,
  });
  useEffect(() => {
    if (data) {
      if (data.startQuery) {
        router.replace(router.asPath);
      }
    }
  }, [data]);
  /*
  const [selectedHistory, setSelectedHistory] = useState(hCount);
  const [selectedSource, setSelectedSource] = useState(
    `data:image/jpeg;base64,${Buffer.from(props.buffer).toString('base64')}`
  );
  const [selectedAccepted, setSelectedAccepted] = useState(props.accepted);
  const [selectedTimestamp, s etSelectedTimestamp] = useState(
    convertTime(props.tdstamp)
  );
  const [selectedUsername, setSelectedUsername] = useState(props.username);
  const [selectedDate, setSelectedDate] = useState(convertDate(props.tdstamp));*/
  const [selectedUser, setSelectedUser] = useState({});
  return (
    <div class="h-screen w-screen bg-lockplus-opacGray overflox-x-none">
      <div class="relative flex bg-gray-800 justify-start">
        <div>
          <HomeSidebar selectedTab={'history'} />
        </div>
        <div class="flex relative justify-start w-full">
          <div class="absolute left-0 w-auto text-left text-xl h-18 pl-8 pt-6 pb-4 font-light z-30">
            Lock Use History
          </div>
          <div className="w-5/12">
            <HistoryForm
              hCount={hCount}
              email={email}
              setSelectedUser={setSelectedUser}
            />
          </div>
          <div className="w-7/12">
            <SelectedHistory user={selectedUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let param = 'nulled';
  //let buffer, accepted, tdstamp, username;
  if (session) {
    param = session.user.email;
  }
  let code = '0';
  console.log('param' + param);
  let hCount = 0;
  console.log('url');
  const url = `${process.env.FLUID_URL}/api/historycount`;
  console.log(url);
  await axios
    .post(url, {
      email: param,
    })
    .catch((err) => {
      console.log('err getusers from client');
      console.log(err.message);
    })
    .then((response) => {
      if (response) {
        if (response.data) {
          hCount = response.data.historyCount;
          code = response.data.code;
          // buffer = response.data.buffer;
          // accepted = response.data.accepted;
          // tdstamp = response.data.timestamp;
          // username = response.data.username;
          console.log('success');
        }
      }
    });
  return {
    props: {
      historyCount: hCount,
      email: param,
      code: code,
      /*buffer: buffer,
      accepted: accepted,
      tdstamp: tdstamp,
      username: username,*/
    },
  };
}
