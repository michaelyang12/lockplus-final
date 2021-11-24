function HomeForm(props) {
    const userEmail = props.userEmail
    return (
        <div class="relative container h-screen w-screen p-6 bg-lockplus-backgroundBlue visible text-lockplus-textGray">
            <div class="text-xl">
                Welcome {userEmail}!
            </div>
            <div class="text-md mt-12">
                Navigate to the "Users" page to manage your existing users. 
            </div>
            <div class="text-md">
                Upload photos for each user to add them to your lock. 
            </div>
        </div>
    );
  }
  export default HomeForm;