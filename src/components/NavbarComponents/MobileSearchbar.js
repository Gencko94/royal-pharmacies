import React from 'react';

export default function MobileSearchbar({ inputRef }) {
  return (
    <div
      ref={inputRef}
      className="flex sticky  mt-n57p z-9 w-full bg-gradient-to-r  from-nav-gradient-from to-nav-gradient-to items-center px-2 py-3  transition-all duration-200 "
    >
      <input
        className=" bg-white rounded flex-grow  p-1 placeholder-gray-600  "
        placeholder="Search for something..."
      />
      <button className="py-1 px-2 bg-nav-primary rounded ml-3 text-white hover:bg-red-600  transition duration-150 ">
        Search
      </button>
    </div>
  );
}
