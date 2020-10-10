import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';

export default function MobileIcons() {
  const { cartItems } = React.useContext(DataProvider);

  return (
    <div className=" items-center ">
      <div className="text-nav-secondary">
        <Link to="/cart" className="p-1 flex   relative">
          <HiOutlineShoppingBag className="w-25p h-25p" />
          <span className="h-4 w-4 text-nav-secondary font-bold rounded-full absolute top-0 right-0 text-xs grid place-items-center bg-nav-primary">
            {cartItems.length}
          </span>
        </Link>
      </div>
    </div>
  );
}
