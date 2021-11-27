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

  return (
    <div className="relative h-full w-full bg-blue-100 container p-4">
      <div className="block w-auto h-48 m-4">
        <div className="h-24 w-screen">
          <div className="text-2xl font-bold font-lockplus text-left pr-4 text-gray-700">
            User: <span class="ml-1 text-gray-600 inline-flex"> {header} </span>
          </div>
          <UploadPhotoPrompt
            user={props.user}
            isUserSelected={isUserSelected}
          />
        </div>
      </div>
      <div className="-mt-12 flex flex-wrap w-2/3 h-auto overflow-auto border-4 border-black">
        {displayImages.map((image) => (
          <div className="w-96 min-h-0 max-h-72 object-fill mx-2 mt-2 border-black border-4">
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
    </div>
  );
}

export default SingleUserPage;
