import { useState } from 'react';
import { useRouter } from 'next/router';
import usersPage from './UsersForm';
import SettingsBar from './sidebar/SettingsBar';
import UsersBar from './sidebar/UsersBar';
import HistoryBar from './sidebar/HistoryBar';
import AddPhotosBar from './sidebar/AddPhotosBar';
import SignOutBar from './sidebar/SignOutBar';

function HomeSidebar(props) {
  const router = useRouter()
  const selectedTab = props.selectedTab

  return (
    <div class="relative sidebar bg-lockplus-blue text-blue-100 w-40 h-screen space-y-6 py-7 px-2">
      <a
        href="#"
        class="text-white flex items-center space-x-2 px-4 mb-12"
        onClick={() => router.push('/home')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span class="text-2xl font-bold font-lockplus">lock +</span>
      </a>
      <UsersBar
        selectedItem = {selectedTab}
      />
      <HistoryBar
        selectedItem = {selectedTab}
      />
      {/* <SettingsBar
        selectedItem = {selectedTab}
      /> */}
      {/* <AddPhotosBar /> */}
      <SignOutBar />
    </div>
  );
}

export default HomeSidebar;
