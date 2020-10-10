import React from 'react';
import { BiSearch } from 'react-icons/bi';

export default function MobileSearchbar() {
  return (
    <div className="bg-nav-primary">
      <div className=" rounded flex items-center   bg-white p-1 text-red-700 ">
        <BiSearch className=" w-25p h-25p mr-2 " />
        <input className="placeholder-gray-600 " placeholder="Search..." />
      </div>
    </div>
  );
}
