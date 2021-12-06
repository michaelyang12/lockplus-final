export default function info() {
  return (
    <div class="text-white font-lockplus text-md font-thin whitespace-prewrap w-full h-full p-4 pt-8">
      <div className="mt-3">
        Lockplus is a facial-recognition lock designed to improve your home’s
        security and keep unwanted visitors out. Every lock has their own unique
        lock code, which you can use to register an account.{' '}
      </div>
      <div className="mt-3">
        Through your account you will be able to add various users that you want
        to access your lock, and upload images of their faces so our lock’s
        facial-recognition algorithm can recognize them.
      </div>
      <div className="mt-3">
        In addition, every lock is programmed to take a photograph whenever an
        unlock attempt is made. You can see these details of unlock attempts in
        your account, including the photo taken, the user (will be unknown if an
        unregistered user attempts to unlock) who made the attempt, as well as
        the date and time of the attempt, and whether or not the attempt was
        successful.
      </div>
      <div className="mt-3">
        Our sign-in process is also very secure. Rather than assigning each user
        a password to use when logging in, every time you sign in a unique link
        will be sent to your email that you can use to login. This means the
        only way that hackers can only access your information is if they have
        access to your email account.
      </div>
    </div>
  );
}
