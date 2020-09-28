import React from 'react';
import Cart from './Cart';
import { BiSearch } from 'react-icons/bi';
export default function MobileIcons({ toggleSearchBar, searchBarOpen }) {
  return (
    <div className="flex items-center ml-auto mr-2 overflow-hidden">
      <div
        className={`${
          searchBarOpen && 'bg-red-300 '
        } rounded-full p-1 grid place-items-center`}
      >
        <BiSearch
          onClick={toggleSearchBar}
          className="w-25p h-25p  text-nav-secondary"
        />
      </div>
      <Cart />
    </div>
  );
}
