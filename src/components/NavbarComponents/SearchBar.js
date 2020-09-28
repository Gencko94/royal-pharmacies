import React from 'react';
import { BiSearch } from 'react-icons/bi';

export default function SearchBar() {
  return (
    <div className="flex flex-grow mr-3  relative bg-white  rounded-lg  ">
      <div className="grid items-center p-1 text-orange-500 ">
        <BiSearch className=" w-5 h-5" />
      </div>
      <input
        className=" pr-1 flex-grow  text-nav-primary font-semibold placeholder-nav-primary "
        type="text"
        placeholder="What are you looking for ?"
      />
      <button className="p-2 font-bold uppercase rounded-lg text-sm text-nav-primary border-l-2 border-nav-primary   hover:text-nav-secondary hover:bg-red-400 transition duration-150">
        search
      </button>
    </div>
  );
}
