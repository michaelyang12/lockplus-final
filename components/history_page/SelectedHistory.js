import Image from 'next/image';

function SelectedHistory(props) {
  console.log(props.selectedHistory);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <div className="h-full w-full bg-lockplus-backgroundBlue text-black p-20">
        {props.user.source ? (
          <div className="ml-12">
            <div className="flex -mt-10 mb-8 justify-between">
              <div className="text-lockplus-textGray font-lockplus text-2xl">
                {capitalizeFirstLetter(props.user.username)}
              </div>
              <div
                class={
                  props.user.accepted
                    ? 'text-green-500 font-bold mr-12 text-xl'
                    : 'text-red-500 font-bold mr-12 text-xl'
                }>
                {props.user.accepted ? ' Accepted' : ' Rejected'}
              </div>
            </div>
            <Image
              src={props.user.source}
              alt="Loading"
              className="object-cover rounded-sm"
              width={512}
              height={420}
            />
            <div className="flex justify-between text-xl text-black text-lg font-lockplus mt-4">
              <div className="ml-2">{props.user.time}</div>
              <div className="mr-8">{props.user.date}</div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full bg-lockplus-backgroundBlue">
            <div className="text-lockplus-textGray font-lockplus text-lg">
              Select an image to enlarge it!
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SelectedHistory;
