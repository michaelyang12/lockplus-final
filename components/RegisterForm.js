import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import axios from 'axios';

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [lockCode, setLockCode] = useState('');
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('click');
    const url = 'http://localhost:3000/home';
    axios
      .post('http://localhost:3000/api/registerlock', {
        lockCode: lockCode,
        email: email,
        name: name,
      })
      .catch((err) => console.log(err))
      .then((response) => {
        console.log(response);
        signIn('email', {
          email: email,
          callbackUrl: url,
        });
        //router.push('/home');
      });
  }

  function whatsThis()
  {
    alert("A lock code is a unique identifier assigned to a lock.")
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
            register here
          </div>
          <input
            type="text"
            className="h-8 w-48 bg-lockplus-opacGray bg-opacity-50 ml-12 mt-4 focus: outline-none border-2 border-lockplus-blue rounded-xl pl-4 placeholder-lockplus-placeholderGray font-light font-lockplus text-lockplus-placeholderGray"
            placeholder="lock code"
            value={lockCode}
            onChange={(e) => setLockCode(e.target.value)}
            required
          />
          <div className="text-xs font-regular font-lockplus text-right text-lockplus-blue pr-4 ml-12">
            <button
            onClick={whatsThis}>
            what's this?
            </button>
          </div>
          <input
            type="text"
            className="h-8 w-48 bg-lockplus-opacGray bg-opacity-50 ml-12 mt-0 focus: outline-none border-2 border-lockplus-blue rounded-xl pl-4 placeholder-lockplus-placeholderGray font-light font-lockplus text-lockplus-placeholderGray"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            className="h-8 w-48 bg-lockplus-opacGray bg-opacity-50 ml-12 mt-0 focus: outline-none border-2 border-lockplus-blue rounded-xl pl-4 placeholder-lockplus-placeholderGray font-light font-lockplus text-lockplus-placeholderGray"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <button
            className="bg-lockplus-blue group h-6 w-24 relative top-2 left-24 rounded-full focus:outline-none transform hover:scale-105 hover:bg-lockplus-hoverblue transition ease-out duration-100 mt-1.5"
            onClick={handleSubmit}>
            register
          </button>
        </div>
      </div>
    </div>
  );
}
