import React from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { AiOutlineGift } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
export default function NavIcons({ color = 'nav-primary' }) {
  return (
    <div className={`flex  text-${color}`}>
      <button className="p-1 flex   relative">
        <TiShoppingCart className="w-25p h-25p" />
        <span className="h-4 w-4 text-nav-secondary font-bold rounded-full absolute top-0 right-0 text-xs grid place-items-center bg-nav-primary">
          5
        </span>
      </button>
      <button className="p-1 flex ">
        <AiOutlineGift className="w-25p h-25p" />
      </button>
      <button className="p-1 flex ">
        <AiOutlineHeart className="w-25p h-25p" />
      </button>
    </div>
  );
}
