import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import axios from 'axios';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [signInError, setSignInError] = useState('');
  //const falseVar = false;
  function handleSubmit(e) {
    e.preventDefault();
    const url = `${process.env.FLUID_URL}/home`;
    axios
      .post('/api/signinlock', {
        email: email,
      })
      .catch((err) => console.log(err))
      .then((res) => {
        console.log('response');
        console.log(res);
        if (res) {
          signIn('email', {
            email: email,
            callbackUrl: url,
          });
        } else {
          setSignInError('This is not a registered email!');
        }
        //router.push('/home');
      });
  }
  return (
    <div className="w-2/3 h-96 mx-auto mt-162">
      <div className="flex justify-center block w-auto h-48 mt-24 m-4 ">
        <div className="relative h-24 w-64 mt-14">
          <button
            className="text-6xl font-bold font-lockplus text-right text-lockplus-blue pr-4 ml-20 hover:text-lockplus-hoverblue"
            onClick={() => router.push('/')}>
            lock+
          </button>
          <div className="text-md font-regular font-lockplus text-right text-lockplus-blue pr-4 mr-12">
            sign in here
          </div>
          <input
            type="text"
            className="h-8 w-48 bg-lockplus-opacGray bg-opacity-50 ml-12 mt-4 focus:outline-none border-2 border-lockplus-blue rounded-xl pl-3 placeholder-lockplus-placeholderGray font-light font-lockplus text-lockplus-placeholderGray"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="text-red-500 font-light text-sm text-left w-auto mx-auto pl-14">
            {signInError}
          </div>
          <button
            className="bg-lockplus-blue group h-6 w-24 relative top-2 left-24 rounded-full focus:outline-none transform hover:scale-105 hover:bg-lockplus-hoverblue transition ease-out duration-100 mt-1.5"
            onClick={handleSubmit}>
            sign in
          </button>
        </div>
      </div>
    </div>
  );
}
