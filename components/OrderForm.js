import { useState } from 'react';

export default function OrderForm() {
  return (
    <>
      <div className="h-full w-full border-lockplus-blue border-2 rounded-lg font-lockplus overflow-y-auto overscroll-contain">
        <div className="flex h-12 w-auto mx-4 mt-2">
          <div className="text-lockplus-blue text-lg ml-2 mt-2">
            Billing Information
          </div>
          <button className="h-5 w-5 my-auto ml-1.5 text-lockplus-blue pb-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        <div className="w-auto mx-4 flex">
          <label className="text-white w-56 h-10 ml-2 font-md">
            First Name
            <input
              type="text"
              className="h-10 w-56 bg-lockplus-opacGray bg-opacity-50 -ml-1 mt-2 border-2 border-lockplus-blue rounded-xl pl-3 placeholder-lockplus-placeholderGray font-light focus:outline-none text-lockplus-placeholderGray"
              placeholder="First Name"
            />
          </label>
          <label className="text-white w-56 h-10 ml-4 font-md">
            Last Name
            <input
              type="text"
              className="h-10 w-52 bg-lockplus-opacGray bg-opacity-50 mr-2 mt-2 border-2 border-lockplus-blue rounded-xl pl-3 placeholder-lockplus-placeholderGray font-light focus:outline-none text-lockplus-placeholderGray"
              placeholder="Last Name"
            />
          </label>
        </div>
        <div className="w-auto mx-4 flex mt-10">
          <label className="text-white w-56 h-10 ml-2 font-md">
            Card Number
            <input
              type="text"
              className="h-10 w-56 bg-lockplus-opacGray bg-opacity-50 -ml-1 mt-2 border-2 border-lockplus-blue rounded-xl pl-3 placeholder-lockplus-placeholderGray font-light focus:outline-none text-lockplus-placeholderGray"
              placeholder="Card Number"
            />
          </label>
          <label className="text-white w-24 h-10 ml-4 font-md">
            Expiration
            <input
              type="text"
              className="h-10 w-24 bg-lockplus-opacGray bg-opacity-50 mr-2 ml mt-2 border-2 border-lockplus-blue rounded-xl pl-3 placeholder-lockplus-placeholderGray font-light focus:outline-none text-lockplus-placeholderGray"
              placeholder="XX/XX"
            />
          </label>
          <label className="text-white w-24 h-10 ml-4 font-md tracking-wider">
            CVV
            <input
              type="text"
              className="h-10 w-24 tracking-wider bg-lockplus-opacGray bg-opacity-50 mr-2 mt-2 border-2 border-lockplus-blue rounded-xl pl-3 placeholder-lockplus-placeholderGray font-light focus:outline-none text-lockplus-placeholderGray"
              placeholder="CVV"
            />
          </label>
        </div>
        <div className="w-auto mx-4 flex mt-10">
          <label className="text-white w-full h-10 ml-2 font-md">
            Billing Address
            <input
              type="text"
              className="h-10 w-full bg-lockplus-opacGray bg-opacity-50 -ml-1 mt-2 border-2 border-lockplus-blue rounded-xl pl-3 placeholder-lockplus-placeholderGray font-light focus:outline-none text-lockplus-placeholderGray"
              placeholder="Address"
            />
          </label>
        </div>
        <div className="w-auto mx-4 flex mt-10">
          <label className="text-white w-48 h-10 ml-2 font-md">
            City
            <input
              type="text"
              className="h-10 w-48 bg-lockplus-opacGray bg-opacity-50 -ml-1 mt-2 border-2 border-lockplus-blue rounded-xl pl-3 placeholder-lockplus-placeholderGray font-light focus:outline-none text-lockplus-placeholderGray"
              placeholder="City"
            />
          </label>
          <label className="text-white w-24 h-10 ml-4 font-md">
            State
            <input
              type="text"
              className="h-10 w-24 bg-lockplus-opacGray bg-opacity-50 mr-2 ml mt-2 border-2 border-lockplus-blue rounded-xl pl-3 placeholder-lockplus-placeholderGray font-light focus:outline-none text-lockplus-placeholderGray"
              placeholder="State"
            />
          </label>
          <label className="text-white w-36 h-10 ml-4 font-md tracking-wider">
            Zip Code
            <input
              type="text"
              className="h-10 w-36 tracking-wider bg-lockplus-opacGray bg-opacity-50 mr-2 mt-2 border-2 border-lockplus-blue rounded-xl pl-3 placeholder-lockplus-placeholderGray font-light focus:outline-none text-lockplus-placeholderGray"
              placeholder="Zip Code"
            />
          </label>
        </div>
        <div className="w-auto mx-5 border border-lockplus-blue mt-14"></div>
        <div className="flex h-12 w-auto mx-4">
          <div className="text-lockplus-blue text-lg ml-2 mt-2">
            Shipping Address
          </div>
          <button className="h-5 w-5 my-auto ml-1.5 text-lockplus-blue pb-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        <div className="w-auto mx-5 border border-lockplus-blue"></div>
        <div className="text-lockplus-blue text-lg ml-6 mt-2">
          Order Information
        </div>
        <div className="h-72 w-auto mx-6 border-2 border-gray-300 mt-4 mb-4 rounded-lg"></div>
      </div>
    </>
  );
}
