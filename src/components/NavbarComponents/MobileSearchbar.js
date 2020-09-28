import React from 'react';

export default function MobileSearchbar({ inputRef }) {
  return (
    <div
      ref={inputRef}
      className="flex sticky  mt-n54p z-9 w-full bg-red-500 items-center p-2  transition-all duration-200 "
    >
      <input
        className=" bg-white rounded flex-grow  p-1  "
        placeholder="Search for something..."
      />
      <button className="py-1 px-2 bg-red-400 rounded ml-3 text-white hover:text-red-400  transition duration-150 ">
        Search
      </button>
    </div>
  );
}
