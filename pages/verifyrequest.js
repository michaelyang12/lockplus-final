import React from 'react';

export default function VerifyRequest() {
  return (
    <div className="h-screen w-screen bg-gray-800">
      <div className="absolute top-10 text-6xl w-full text-center font-bold font-lockplus text-lockplus-blue">
        lock+
      </div>
      <div className="absolute top-28 h-12 w-full text-white text-center font-lockplus text-medium">
        check your email for a verification link to sign in!
      </div>
    </div>
  );
}
