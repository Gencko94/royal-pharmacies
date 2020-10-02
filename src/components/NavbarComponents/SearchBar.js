import React from 'react';
import { BiSearch } from 'react-icons/bi';

export default function SearchBar() {
  return (
    <div className="flex flex-grow mr-3  relative bg-gray-100  rounded-lg  ">
      <div className="grid items-center p-1 text-red-700 ">
        <BiSearch className=" w-5 h-5" />
      </div>
      <input
        className="flex-grow bg-gray-100   font-semibold  "
        type="text"
        placeholder="What are you looking for ?"
      />
      <button className="p-2 font-bold uppercase rounded text-sm text-gray-100  bg-red-700  hover:bg-red-500 transition duration-150">
        search
      </button>
    </div>
  );
}
