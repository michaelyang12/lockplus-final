import { createRouteLoader } from 'next/dist/client/route-loader';
import Head from 'next/head';
//import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  if (loading) {
    return <div className="h-screen w-screen bg-black"></div>;
  } else if (session) {
    router.push('/home');
  } else {
    return (
      <div className="h-screen w-screen bg-black">
        <div className="absolute top-4 right-2 content-right block h-24 w-34">
          <button onClick={() => router.push('/login')}>
            <div className="relative top-0 right-0 text-md font-light font-lockplus text-right text-lockplus-blue pr-4 hover:text-lockplus-hoverblue">
              sign in
            </div>
          </button>
          <span className="text-lockplus-blue text-lg font-md -ml-2 mr-2">
            |
          </span>
          <button onClick={() => router.push('/register')}>
            <div className="relative top-0 right-0 text-md font-light font-lockplus text-right text-lockplus-blue pr-4 hover:text-lockplus-hoverblue">
              register your lock
            </div>
          </button>
        </div>
        <div className="w-2/3 h-96 mx-auto mt-162">
          <div className="flex justify-center block w-auto h-48 mt-24 m-4 ">
            <div className="relative h-24 w-64 mt-14">
              <div className="text-6xl font-bold font-lockplus text-right text-lockplus-blue pr-4">
                lock+
              </div>
              <button
                className="bg-lockplus-blue group h-6 w-24 absolute right-4 rounded-full focus:outline-none transform hover:scale-105 hover:bg-lockplus-hoverblue transition ease-out duration-100 mt-1.5"
                onClick={() => router.push('/order')}>
                <div className="h-auto w-auto mx-auto text-black font-light text-sm font-lockplus">
                  Order Now
                </div>
              </button>
            </div>
            <div className="h-42 w-64 text-md font-lockplus text-left text-lockplus-blue tracking-wider font-snug leading-tight pt-16">
              <div className="w-full h-auto">Affordable home security.</div>
              <div className="w-full h-auto">Advanced biometrics.</div>
              <div className="w-full h-auto">Safety, simpler than ever.</div>
              <div className="w-full h-auto text-white">
                <button
                  className="h-auto w-auto transform hover:scale-102 focus:outline-none text-left"
                  onClick={() => router.push('/learnmore')}>
                  Learn More.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
