import { useState } from 'react';
import { useRouter } from 'next/router';
import HomeSidebar from './HomeSidebar';
import SingleHistoryImage from './history_page/SingleHistoryImage';

function HistoryForm(props) {
  //temporary array for testing
  const hCount = props.hCount;
  const email = props.email;
  const photosDisplay = [];
  for (var i = hCount; i >= 0; i--) {
    photosDisplay.push(<SingleHistoryImage index={i} email={email} />);
  }

  return (
    <div class="absolute container h-screen w-screen bg-lockplus-backgroundBlue text-lockplus-textGray">
      <div class="text-xl mt-8 font-light ml-6 mb-1">Lock Use History</div>
      <div class="relative justify-between rounded-lg container p-4 h-5/6 w-2/6 overflow-y-scroll bg-scroll">
        {photosDisplay.map((img) => (
          <div>{img}</div>
        ))}
      </div>
    </div>
  );
}
export default HistoryForm;
