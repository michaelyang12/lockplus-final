import axios from 'axios';

export default async function getImages(type, email) {
  let i = 0;
  let response;
  let retArr = [];
  let index = 0;
  let run = true;
  while (run) {
    await axios
      .post(`${process.env.FLUID_URL}/api/getimages/${type}`, {
        index: index,
        email: email,
      })
      .catch((err) => {
        console.log(err.message);
      })
      .then((response) => {
        if (response) {
          retArr.push(response.data.image);
          index = response.data.index;
          run = response.data.run;
        }
      });
  }
  console.log('retArr');
  console.log(retArr[0].username);
  return retArr;
}
