import Image from 'next/image';

function SelectedHistory(props) {
  console.log(props.selectedHistory);
  return (
    <>
      <div className="h-full w-full bg-lockplus-backgroundBlue text-black p-20">
        {props.user.source ? (
          <Image
            src={props.user.source}
            alt="Loading"
            className="object-cover rounded-sm"
            width={512}
            height={512}
          />
        ) : (
          <div className="h-full w-full bg-lockplus-backgroundBlue"></div>
        )}
      </div>
    </>
  );
}

export default SelectedHistory;
