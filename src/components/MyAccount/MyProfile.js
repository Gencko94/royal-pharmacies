import React from 'react';

export default function MyProfile() {
  return (
    <div>
      <div className="">
        <div className="px-3 py-3 flex bg-red-200">
          <h1 className="text-lg font-semibold"> General Information</h1>
          <button className="p-1 text-sm ml-auto">Edit</button>
        </div>
        <div className="">
          <div className="py-4 px-3 flex  bg-gray-100">
            <h1 className="mr-5 font-semibold w-2/6">Full Name</h1>
            <h1 className="">John Doe</h1>
          </div>

          <div className="py-4 px-3 flex  bg-gray-200">
            <h1 className="mr-5 font-semibold w-2/6">Phone Number</h1>
            <h1 className="">+8792156875</h1>
          </div>
          <div className="py-4 px-3 flex  bg-gray-100">
            <h1 className="mr-5 font-semibold w-2/6">Date of Birth</h1>
            <h1 className="">18-8-2018</h1>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="">
        <div className="px-2 py-3 flex bg-red-200">
          <h1 className="text-lg font-semibold"> Security</h1>
          <button className="p-1 text-sm ml-auto">Edit</button>
        </div>
        <div className="">
          <div className="py-4 px-3 flex  bg-gray-100">
            <h1 className="mr-5 font-semibold w-2/6">Email Address</h1>
            <h1 className="">John@Doe.com</h1>
          </div>
          <div className="py-4 px-3 flex  bg-gray-200">
            <h1 className="mr-5 font-semibold w-2/6">Password</h1>
            <h1 className="">**********</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
