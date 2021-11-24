import { signOut } from 'next-auth/react';

function SignOutBar() {
  const url = 'https://lockplus-deployed-49qnphsov-michaelyang12.vercel.app/';
  return (
    <button
      class="relative text-white flex items-center mt-48 space-x-2 px-4 ml-1 hover:text-lockplus-hoverGray"
      onClick={() => signOut({ callbackUrl: url })}>
      <span class="text-md font-light font-lockplus">sign out</span>
    </button>
  );
}

export default SignOutBar;
