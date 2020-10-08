import React from 'react';

// import { BiSearch } from 'react-icons/bi';
import NavIcons from './NavIcons';
export default function MobileIcons({ toggleSearchBar, searchBarOpen }) {
  return (
    <div className="flex ml-auto items-center ">
      <div
        className={`${
          searchBarOpen ? 'bg-gray-100 text-red-700 ' : 'text-gray-100'
        } rounded-full p-1 grid place-items-center `}
      ></div>
      <NavIcons color={'gray-100'} />
    </div>
  );
}
