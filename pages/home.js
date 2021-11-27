import HomeSidebar from '../components/HomeSidebar';
import { useSession, getSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import HomeForm from '../components/HomeForm';

export default function HomePage() {
  const router = useRouter();
  //const { data: session, status } = useSession();
  //const loading = status === 'loading';

  //const [sessionEmail, setSessionEmail] = useState('null');
  const sessionEmail = props.sessionEmail;
  /*if (session && sessionEmail === 'null') {
    setSessionEmail(session.user.email);
  }*/
  if (sessionEmail) {
    return (
      <div class="h-screen w-screen bg-lockplus-opacGray">
        <div class="relative flex bg-gray-800 justify-start">
          <div>
            <HomeSidebar />
          </div>
          <div>
            <HomeForm userEmail={sessionEmail} />
          </div>
        </div>
      </div>
    );
  } /*else if (loading) {
    return <div className="-screen w-screen bg-black"></div>;
  } */ else {
    return (
      <div className="h-screen w-screen bg-black text-white">LOCKED OUT</div>
    );
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const param = session.user.email;
  return {
    props: {
      sessionEmail: param,
    },
  };
}
