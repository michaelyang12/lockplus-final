import Image from 'next/image';

function SelectedHistory(props) {
  console.log(props.selectedHistory);
  return (
    <>
      <div className="h-full w-full bg-lockplus-backgroundBlue text-black p-20">
        <Image
          src={props.user.source}
          alt="Loading"
          className="object-cover rounded-sm"
          width={512}
          height={512}
        />
      </div>
    </>
  );
}

export default SelectedHistory;
