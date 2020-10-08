import React from 'react';
import { BiSearch } from 'react-icons/bi';
// import OrderFrom from './OrderFrom';

export default function MobileSearchbar({ inputRef }) {
  return (
    <div
      ref={inputRef}
      className="  p-2 pt-0    z-9 w-full bg-red-700 items-center  transition-all duration-200 "
    >
      <div className=" rounded flex flex-start items-center bg-white p-1 text-red-700 ">
        <BiSearch className=" w-5 h-5 mr-2" />
        <input
          className="rounded flex-1 w-40  p-1 placeholder-gray-600  "
          placeholder="Search for something..."
        />
      </div>
      {/* <OrderFrom py="2" px="1" border={false} color="gray-100" /> */}
    </div>
  );
}
