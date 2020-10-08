import React from 'react';
import { BiSearch } from 'react-icons/bi';
import OrderFrom from './OrderFrom';

export default function SearchBar() {
  return (
    <div className="flex  mr-3 py-0  relative bg-nav-secondary  rounded-sm  ">
      <div className="grid place-items-center px-1 text-gray-800 ">
        <BiSearch className=" w-5 h-5" />
      </div>
      <input
        className="flex-grow bg-nav-secondary text-gray-900   placeholder-gray-700  "
        style={{ width: '300px' }}
        type="text"
        placeholder="What are you looking for ?"
      />
      <OrderFrom />
    </div>
  );
}
