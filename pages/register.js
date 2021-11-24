import Head from 'next/head';
import Image from 'next/image';
import RegisterForm from '../components/RegisterForm';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();
  return (
    <>
      <div className="h-screen w-screen bg-black">
        <button
          className="absolute left-4 top-4 w-auto h-auto text-lockplus-blue"
          onClick={() => router.push('/')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="currentColor">
            <path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z"></path>
          </svg>
        </button>
        <div className="relative content-center">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
