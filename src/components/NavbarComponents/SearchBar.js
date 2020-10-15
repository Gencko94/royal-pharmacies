import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { DataProvider } from '../../contexts/DataContext';
// import OrderFrom from './OrderFrom';

export default function SearchBar() {
  const { isLightTheme } = React.useContext(DataProvider);
  return (
    <div
      className={`flex  mr-3 py-0 rounded overflow-hidden  relative  ${
        isLightTheme
          ? 'bg-nav-cat-light text-nav-cat-text-light'
          : 'bg-nav-cat-dark text-nav-cat-text-dark'
      }    `}
    >
      <div className="grid place-items-center p-2 bg-nav-cat-light border-r mr-1 ">
        <BiSearch className=" w-5 h-5" />
      </div>
      <input
        className={`flex-grow  p-2 ${
          isLightTheme
            ? 'bg-nav-cat-light text-nav-cat-text-light placeholder-gray-700'
            : 'bg-nav-cat-dark text-nav-cat-text-dark placeholder-gray-500'
        }  `}
        style={{ width: '600px' }}
        type="text"
        placeholder="What are you looking for ?"
      />
      {/* <OrderFrom /> */}
    </div>
  );
}
