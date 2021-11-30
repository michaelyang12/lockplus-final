import HomeSidebar from '../components/HomeSidebar';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import HomeForm from '../components/HomeForm';

export default function HomePage(props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [sessionEmail, setSessionEmail] = useState('null');
  if (session && sessionEmail === 'null') {
    setSessionEmail(session.user.email);
  }
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
  } else if (loading) {
    return <div className="-screen w-screen bg-lockplus-opacGray"></div>;
  } else {
    router.push('/');
    return <></>;
  }
}
