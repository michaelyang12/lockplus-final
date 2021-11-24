import HomeSidebar from '../components/HomeSidebar';
import { PhotosForm } from '../components/PhotosForm';
import { useState } from 'react';

function Photos(props) {
  return (
    <>
      <div class="h-screen w-screen bg-lockplus-opacGray">
        <div class="relative flex bg-gray-800 justify-start">
          <div>
            <HomeSidebar />
          </div>
          <div>
            <PhotosForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default Photos;
