import { useState } from 'react';
import { useRouter } from 'next/router';
import HomeSidebar from './HomeSidebar';
import SingleHistoryImage from './history_page/SingleHistoryImage';
import { useEffect } from 'react';

function HistoryForm(props) {
  //temporary array for testing
  const email = props.email;
  const [photosDisplay, setPhotosDisplay] = useState([]);
  useEffect(() => {
    setPhotosDisplay([]);
    let temp = [];
    for (var i = 0; i <= props.hCount; i--) {
      temp.push(
        <SingleHistoryImage
          index={i}
          email={email}
          hCount={props.hCount}
          setSelectedUser={props.setSelectedUser}
        />
      );
    }
    setPhotosDisplay(temp.reverse());
  }, [props.hCount]);

  return (
    <div class="relative w-1/3 container h-screen w-full bg-lockplus-backgroundBlue text-lockplus-textGray overflow-y-auto border-r border-gray-500">
      <div className="flex">
        <div class="relative justify-between rounded-lg container p-8 h-5/6 w-auto">
          {photosDisplay.map((img) => (
            <div>{img}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HistoryForm;
