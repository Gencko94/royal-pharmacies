import React from 'react';
import NavIcons from './NavbarComponents/NavIcons';
import ShipTo from './NavbarComponents/ShipTo';
import Language from './NavbarComponents/Language';
import LoginRegister from './NavbarComponents/LoginRegister';
import Logo from './NavbarComponents/Logo';
import SearchBar from './NavbarComponents/SearchBar';
import NavCategory from './NavbarComponents/NavCategory';

import { FaShippingFast } from 'react-icons/fa';
import { GiCash } from 'react-icons/gi';
import OtherShops from './NavbarComponents/OtherShops';
export default function Navbar() {
  return (
    <>
      <nav className=" z-20 sticky  top-0 left-0  bg-gradient-to-tr bg-white text-black">
        <div className="flex items-center justify-between font-semibold py-1 text-gray-100 bg-red-700 text-sm px-4">
          <h1 className="mr-2">Download our App</h1>
          <div className="flex items-center justify-center flex-1  text-sm">
            <div className="flex items-center mr-5">
              <FaShippingFast className="w-5 h-5 mr-2" />
              <h1>FREE FAST DELIVERY</h1>
            </div>
            <div className="flex items-center">
              <GiCash className="w-5 h-5 mr-2" />
              <h1>BEST PRICES EVERYDAY</h1>
            </div>
          </div>
          <div className="flex justify items-center">
            <ShipTo />
            <Language />
          </div>
        </div>
        <div className="flex items-center  justify-start pt-1 pb-0 px-5">
          <Logo />
          <SearchBar />
          <NavIcons />
          <LoginRegister />
        </div>

        <OtherShops />
      </nav>
      <NavCategory />
    </>
  );
}
