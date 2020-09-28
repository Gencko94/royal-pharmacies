import React from 'react';
import Cart from './NavbarComponents/Cart';
import Flag from './NavbarComponents/Flag';
import Language from './NavbarComponents/Language';
import Logo from './NavbarComponents/Logo';
import SearchBar from './NavbarComponents/SearchBar';

export default function Navbar() {
  return (
    <nav className=" z-20 sticky  top-0 left-0  bg-gradient-to-tr from-red-400 to-red-700 text-white">
      <div className="flex items-center justify-end py-2 px-4">
        <Flag />
        <Language />
      </div>
      <div className="flex items-center py-2 px-4">
        <Logo />
        <SearchBar />
        <Cart />
      </div>
    </nav>
  );
}
