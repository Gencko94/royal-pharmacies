import React from 'react';
import { Link } from 'react-router-dom';
import NavLogoMobile from '../MobileNavbar/NavLogoMobile';
import Hamburger from '../MobileNavbar/Hamburger';
import { AiFillHome } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { BsBagFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';

export default function TopSection({ isLightTheme, toggleSideMenu }) {
  return (
    <div
      className={`${
        isLightTheme
          ? 'bg-second-nav-light text-second-nav-text-light'
          : 'bg-second-nav-dark text-second-nav-text-dark'
      } p-1`}
    >
      <div className={`p-1 flex items-center `}>
        <Hamburger toggleSideMenu={toggleSideMenu} />
        <div className=" flex-1 justify-center ">
          <NavLogoMobile />
        </div>
      </div>
      <div className="  px-1 pt-4 ">
        {/* <div className="grid place-items-center mb-2">
          <Link
            to="/app/login"
            className=" font-semibold p-1 rounded text-center shadow "
          >
            Hello,Sign in
          </Link>
        </div> */}
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="px-1 py-1 flex flex-col rounded justify-center items-center shadow"
            style={{ width: '60px' }}
          >
            <AiFillHome className="w-5 h-5 mb-1" />
            <h1 className="text-xs  font-semibold">Home</h1>
          </Link>
          <Link
            style={{ width: '60px' }}
            to="/cart"
            className="px-1 py-1 flex flex-col rounded justify-center items-center shadow"
          >
            <BsBagFill className="w-5 h-5 mb-1" />
            <h1 className="text-xs  font-semibold">Cart</h1>
          </Link>
          <Link
            style={{ width: '60px' }}
            to="/wishlist"
            className="px-1 py-1 flex flex-col rounded justify-center items-center shadow"
          >
            <FaHeart className="w-5 h-5 mb-1" />
            <h1 className="text-xs  font-semibold">Wishlist</h1>
          </Link>
          <Link
            style={{ width: '60px' }}
            to="/wishlist"
            className="px-1 py-1 flex flex-col rounded justify-center items-center shadow"
          >
            <MdAccountCircle className="w-5 h-5 mb-1" />
            <h1 className="text-xs  font-semibold">Sign in</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
