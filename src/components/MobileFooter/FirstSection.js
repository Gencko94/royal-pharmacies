import React from 'react';
import { IoMdCall } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';

export default function FirstSection() {
  return (
    <div className="flex flex-col justify-evenly px-4 py-4 bg-red-500  ">
      <div className="text-center text-gray-100 font-bold">
        <h1 className="text-lg">We're Always here to help</h1>
        <h1 className="text-sm text-gray-800 font-semibold">
          Reach out to us through any of these support channels
        </h1>
      </div>
      <div className="flex text-gray-100 justify-around items-center flex-wrap">
        <div className="flex  items-center justify-center mt-2 ">
          <div className="p-1  rounded-full bg-gray-800 mr-2">
            <IoMdCall className=" h-20p w-20p" />
          </div>
          <div className="flex flex-col text-center  font-semibold">
            <h1 className="text-sm">Help Center</h1>
            <h1 className="text-sm">Call +123456789</h1>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2">
          <div className="p-1  rounded-full bg-gray-800 mr-2">
            <MdEmail className=" h-20p w-20p" />
          </div>
          <div className="flex text-center font-semibold flex-col">
            <h1 className="text-sm">Contact Email</h1>
            <h1 className="text-base">help@attiahmall.com</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
