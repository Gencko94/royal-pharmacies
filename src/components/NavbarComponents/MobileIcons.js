import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';

export default function MobileIcons() {
  const { cartItems } = React.useContext(DataProvider);

  return (
    <div className="  ">
      <div className="flex text-nav-secondary">
        <Link to="/cart" className="p-1 flex   relative">
          <HiOutlineShoppingBag className="w-25p h-25p" />
          <span className="h-4 w-4 text-nav-secondary font-bold rounded-full absolute top-0 right-0 text-xs grid place-items-center bg-nav-primary">
            {cartItems.length}
          </span>
        </Link>
        <Link to="/user/account/profile" className="p-1 ml-1 ">
          <MdAccountCircle className="w-25p h-25p" />
        </Link>
      </div>
    </div>
  );
}
