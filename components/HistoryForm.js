import { useState } from 'react';
import { useRouter } from 'next/router';
import HomeSidebar from './HomeSidebar';
import SingleHistoryImage from './history_page/SingleHistoryImage';
import { useEffect } from 'react';

function HistoryForm(props) {
  const email = props.email;

  return (
    <div class="relative w-1/3 container h-screen w-full bg-lockplus-backgroundBlue text-lockplus-textGray overflow-y-auto border-r border-gray-500">
      <div class="absolute left-0 w-auto text-left text-xl h-18 pl-8 pt-6 pb-4 font-light z-30">
        Lock Use History
      </div>
      <div className="flex">
        <div class="relative justify-between rounded-lg container p-8 h-5/6 w-auto mt-10">
          {props.displayImages.map((img) => (
            <div>{img}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HistoryForm;
