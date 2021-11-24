import { useState } from 'react';
import { useRouter } from 'next/router';
import HomeSidebar from './HomeSidebar';

function HistoryForm(props) {

  //temporary array for testing
  const photosDisplay = []
  for (var i = 0; i < 7; i++) {
    photosDisplay.push(
      <div class="inline-flex bg-lockplus-historyBlue w-full mb-4 rounded-lg">
        <div 
          class={`w-32 h-32 border border-lockplus-textGray ml-4 mb-4 mt-4`}
          key={i}
        >
          {/*image*/}
        </div>
        <p class="font-lockplus font-light text-sm ml-4 mt-4">
          User ____ accessed at {i} 
        </p>
      </div>
    )
  }

  return (
    <div class="absolute container h-screen w-screen bg-lockplus-backgroundBlue text-lockplus-textGray">
        <div class="text-xl mt-8 font-light ml-6 mb-1">
            Lock Use History
        </div>
        <div class="relative justify-between rounded-lg container p-4 h-5/6 w-2/6 overflow-y-scroll bg-scroll">
          {photosDisplay.map((img) => (
            <div>{img}</div>
          ))}
        </div>
    </div>
  );
}
export default HistoryForm;
