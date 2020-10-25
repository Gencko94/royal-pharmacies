import React from 'react';
import Select from 'react-select';

export default function MyProfileMobile() {
  const languages = [
    { value: 'Arabic', label: 'Arabic' },
    { value: 'English', label: 'English' },
  ];
  const [language, setLanguage] = React.useState(languages[1]);
  return (
    <div>
      <div className="">
        <div className="px-3 py-3 flex  text-gray-900">
          <h1 className="text-xl font-semibold"> General Information</h1>
          <button className="px-2 py-1 text-sm ml-auto font-semibold bg-red-600 text-gray-100 rounded">
            Edit
          </button>
        </div>
        <hr />
        <div className=" ">
          <div className="py-4 px-3 flex  ">
            <h1 className=" font-semibold w-2/4">Full Name</h1>
            <h1 className="">John Doe</h1>
          </div>

          <div className="py-4 px-3 flex  bg-red-100">
            <h1 className=" font-semibold w-2/4">Phone Number</h1>
            <h1 className="">+8792156875</h1>
          </div>
          <div className="py-4 px-3 flex  ">
            <h1 className=" font-semibold w-2/4">Date of Birth</h1>
            <h1 className="">18-8-2018</h1>
          </div>
        </div>
      </div>
      <hr className="mt-4 mb-2" />
      <div className="">
        <div className="px-3 py-3 flex  text-gray-900">
          <h1 className="text-xl font-semibold"> Security</h1>
          <button className="py-1 px-2 text-sm ml-auto font-semibold bg-red-600 text-gray-100 rounded">
            Edit
          </button>
        </div>
        <hr />
        <div className="">
          <div className="py-4 px-3 flex ">
            <h1 className=" font-semibold w-2/4">Email Address</h1>
            <h1 className="">John@Doe.com</h1>
          </div>
          <div className="py-4 px-3 flex  bg-red-100">
            <h1 className=" font-semibold w-2/4">Password</h1>
            <h1 className="">**********</h1>
          </div>
        </div>
      </div>
      <hr className="mt-5 mb-2" />
      <div className="">
        <div className="px-3 py-3 text-gray-900">
          <h1 className="text-xl font-semibold"> Language Preferences</h1>
        </div>
        <hr />
        <div className="">
          <div className="py-4 px-3 flex items-center ">
            <h1 className=" font-semibold w-2/4">Preffered Language</h1>
            <Select
              defaultValue={language}
              onChange={e => setLanguage(e)}
              options={languages}
              className="flex-1 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
