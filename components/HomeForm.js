import Clock from 'react-live-clock';

function HomeForm(props) {

    const userEmail = props.userEmail;
    return (
        <div class="relative container h-screen w-screen p-6 bg-lockplus-backgroundBlue visible text-lockplus-textGray">
            {/* <h1 class="text-xl mb-4">
                Welcome {userEmail}!
            </h1> */}
            <div class="w-auto h-full font-light rounded-lg p-2 bg-blue-300 font-lockplus text-xl text-gray-800">
                Welcome {userEmail}!
                <div class="mt-4 object-fill w-3/6 rounded-lg p-4 bg-blue-500 font-lockplus text-gray-800">
                    <Clock
                        format={"dddd, MMMM Do YYYY, h:mm:ss a"}
                        style={{fontSize: '2em'}}
                        ticking={true} 
                    />
                 </div>
                 <div class="mt-4 font-light object-fill w-3/6 rounded-lg p-4 bg-blue-400 font-lockplus text-gray-800">
                    <span class="text-md font-bold">
                        User Tips:
                    </span>
                    <div class="text-lg mt-4">
                        Navigate to the "Users" page to manage your existing users.
                    </div>
                    <div class="text-lg mt-2">
                        From there you can upload faces for each user so they can be recognized by your lock.
                    </div>
                    <div class="text-lg mt-2">
                        You can upload a maximum of 4 photos per user. The more photos you have, the more accurate the facial reocgnition will be.
                    </div>
                </div>
                <div class="mt-4 font-light object-fill w-3/6 rounded-lg p-4 bg-blue-400 font-lockplus text-gray-800">
                    <span class="text-md font-bold">
                        History Tips:
                    </span>
                    <div class="text-lg mt-4">
                        Navigate to the "History" page to see your lock use history.
                    </div>
                    <div class="text-lg mt-2">
                        From there you can view images of people who have attempted (successfully or unsuccessfully) to unlock your lock.
                    </div>
                </div>
            </div>
            
        </div>
    );
  }
  export default HomeForm;