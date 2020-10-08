import React from 'react';
import { BiSearch } from 'react-icons/bi';
import OrderFrom from './OrderFrom';

export default function SearchBar() {
  return (
    <div className="flex  mr-3  relative bg-gray-200  rounded-lg  ">
      <div className="grid place-items-center p-1 text-red-700 ">
        <BiSearch className=" w-5 h-5" />
      </div>
      <input
        className="flex-grow bg-gray-200  font-semibold  "
        style={{ width: '300px' }}
        type="text"
        placeholder="What are you looking for ?"
      />
      <OrderFrom />
    </div>
  );
}
