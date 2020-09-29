import React from 'react';
import { TiShoppingCart } from 'react-icons/ti';
export default function Cart() {
  return (
    <button className="p-1 flex outline-none text-nav-secondary relative">
      <span className="text-base font-semibold mx-1 ">Cart</span>
      <TiShoppingCart className="w-25p h-25p" />
      <span className="h-4 w-4 text-nav-secondary font-bold rounded-full absolute top-0 right-0 text-xs grid place-items-center bg-nav-primary">
        5
      </span>
    </button>
  );
}
