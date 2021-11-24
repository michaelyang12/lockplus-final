import React, { useState } from 'react';
import { AddPhotoButton } from './photos_page/AddPhotoButton';
import { useSession } from 'next-auth/react';
import slugify from 'slugify';
import axios from 'axios';

/*
interface Response {
  status: boolean;
  message: string;
  statusText: string;
  code: any;
}
*/

export const PhotosForm = (props) => {
  const { data: session, status } = useSession();
  const safeUser: string = slugify(props.user ?? "", {
    remove: /"<>#%\{\}\|\\\^~\[\]`;\?:@=&/g,
  });
  console.log('user');
  console.log(safeUser);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [sessionEmail, setSessionEmail] = useState('null');
  if (session && sessionEmail === 'null') {
    setSessionEmail(session.user.email);
  }
  const onChange = async (formData) => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };
    const codeResponse: any = await axios
      .post('/api/codefromemail', {
        email: sessionEmail,
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('code');
    const code: string = codeResponse.data.code;
    console.log(code);
    const apiUrl: string = '/api/dbPhotos/' + code + '/' + safeUser;
    const response: any = await axios.post(apiUrl, formData, config);
    setUploadSuccess(response.data.message);
    //console.log('response', response.data);
  };

  return (
    <>
      <AddPhotoButton
        label="Upload Photos"
        uploadFileName="theFiles"
        onChange={onChange}
      />
      <div className="-ml-48 -pl-8 mt-16 h-12 whitespace-nowrap text-left text-gray-700 font-lockplus font-md text-red-500 text-md w-full overflow-visible">
        {uploadSuccess}
      </div>
    </>
  );
};
