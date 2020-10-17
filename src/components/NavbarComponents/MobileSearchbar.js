import React from 'react';
import { BiSearch } from 'react-icons/bi';

export default function MobileSearchbar({ isLightTheme }) {
  return (
    <div
      className={`${
        isLightTheme
          ? 'bg-nav-cat-light text-nav-cat-text-light placeholder-gray-700 '
          : 'bg-first-nav-light text-nav-cat-text-dark placeholder-gray-500 shadow-itemsSlider-shallow'
      } rounded flex items-center overflow-hidden flex-1 `}
    >
      <div
        className={`${
          isLightTheme
            ? 'bg-nav-cat-light text-nav-cat-text-light'
            : 'bg-nav-cat-dark text-nav-cat-text-dark'
        }  p-1  `}
      >
        <BiSearch className=" w-25p h-25p " />
      </div>
      <input
        className={` ${
          isLightTheme
            ? 'bg-nav-cat-light text-nav-cat-text-light placeholder-gray-700'
            : 'bg-first-nav-light text-nav-cat-text-dark placeholder-gray-500'
        } p-1`}
        placeholder="Search..."
      />
    </div>
  );
}
