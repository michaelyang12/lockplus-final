import { Button } from 'reactstrap';
import { useState } from 'react';
import { PhotosForm } from '../PhotosForm';
import UploadPhotoPrompt from './UploadPhotoPrompt';
import UploadedUserImages from './UploadedUserImages';

function SingleUserPage(props) {
  const user = props.user;
  const header = (user + '').length == 0 ? 'No user selected' : user;
  const images = props.images;
  const email = props.email;
  let displayImages = [];
  // const [isUserSelected, setIsUserSelected] = useState(false)
  var isUserSelected = false;

  if (header == user) {
    isUserSelected = true;
  } else {
    isUserSelected = false;
  }
  images.forEach((image) => {
    if (image.username === props.user) {
      displayImages.push(image);
    }
  });
  // } else {
  //   setIsUserSelected(false)
  // }

  var visibility = displayImages.length > 0
    ? "invisible"
    : "visible"

  var photoCount = displayImages.length

  return (
    <div className="relative h-full w-full bg-blue-100 container p-4">
      <div className="block w-auto h-48 m-4">
        <div className="h-24 w-screen">
          <div className="text-2xl font-bold font-lockplus text-left pr-4 text-gray-700">
            User: <span class="ml-1 text-gray-600 inline-flex"> {header} </span>
          </div>
          <p className="relative mt-12 mb-2 text-md font-regular font-lockplus text-left text-gray-700"> 
          {photoCount} photos uploaded: 
          </p>
        </div>
      </div>
      <div className="-mt-24 rounded-lg flex flex-wrap w-4/5 h-56 overflow-auto bg-lockplus-historyBlue">
        <div class={`${visibility} absolute text-2xl font-regular left-96 mt-20 font-lockplus text-gray-700`}>
          No Photos Found
        </div>
        <div class={`${visibility} absolute text-lg font-regular left-72 mt-28 font-lockplus text-gray-700`}>
          Try uploading a photo using the prompt below
        </div>
        {displayImages.map((image) => (
          <div className="w-56 h-52 object-fill mx-2 mt-2">
            {
              <UploadedUserImages
                user={props.user}
                isUserSelected={isUserSelected}
                image={image}
                email={email}
              />
            }
          </div>
        ))}
      </div>
      <div class="-mt-10 ml-4">
        <UploadPhotoPrompt
          user={props.user}
          isUserSelected={isUserSelected}
        />
      </div>
    </div>
  );
}

export default SingleUserPage;
