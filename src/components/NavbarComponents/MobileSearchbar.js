import React from 'react';
import OrderFrom from './OrderFrom';

export default function MobileSearchbar({ inputRef }) {
  return (
    <div
      ref={inputRef}
      className=" flex flex-start  p-1    z-9 w-full bg-red-700 items-center  transition-all duration-200 "
    >
      <input
        className=" bg-white rounded flex-1 w-40  p-1 placeholder-gray-600  "
        placeholder="Search for something..."
      />
      <OrderFrom py="2" px="1" border={false} color="gray-100" />
    </div>
  );
}
