import React from 'react';
import NavIcons from './NavbarComponents/NavIcons';
import ShipTo from './NavbarComponents/ShipTo';
import Language from './NavbarComponents/Language';
import LoginRegister from './NavbarComponents/LoginRegister';
import Logo from './NavbarComponents/Logo';
import SearchBar from './NavbarComponents/SearchBar';
import NavCategory from './NavbarComponents/NavCategory';

export default function Navbar() {
  return (
    <div>
      <nav className=" z-20 sticky   top-0 left-0  bg-gradient-to-tr bg-white text-black">
        <div className="flex items-center justify-between font-semibold py-1 text-gray-100 bg-gray-800 text-sm px-4">
          <ShipTo />
          <div className="flex justify items-center">
            <LoginRegister />
            <Language />
          </div>
        </div>
        <div className="flex items-center bg-nav-primary text-nav-secondary  justify-evenly py-4 px-20">
          <Logo />
          <SearchBar />
          <NavIcons />
        </div>

        {/* <OtherShops /> */}
      </nav>
      <NavCategory />
    </div>
  );
}
