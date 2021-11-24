import { Button } from 'reactstrap';
import { useState } from 'react';
import { PhotosForm } from '../PhotosForm';

function UploadPhotoPrompt(props) {
    const user = props.user
    var visibility = props.isUserSelected
        ? "visible"
        : "invisible"

  return (
    <div className={`text-md text-gray-700 font-regular font-lockplus relative text-left mt-16 mr-12 inline-flex ${visibility}`} >
        Upload photos for this user:
        <div className="h-6 w-24 relative -mt-5">
            <PhotosForm
                user={props.user}
            />
        </div>
    </div>
  );
}
// {`statusbar-button-container ${fondo}`}
export default UploadPhotoPrompt;
