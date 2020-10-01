import React from 'react';
import Cart from './NavbarComponents/Cart';
import Flag from './NavbarComponents/Flag';
import Language from './NavbarComponents/Language';
import LoginRegister from './NavbarComponents/LoginRegister';
import Logo from './NavbarComponents/Logo';
import SearchBar from './NavbarComponents/SearchBar';
import NavCategory from './NavbarComponents/NavCategory';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <>
      <nav className=" z-20 sticky  top-0 left-0  bg-gradient-to-tr from-nav-gradient-from to-nav-gradient-to text-white">
        <div className="flex items-center justify-start py-2 pb-1 px-4">
          <Language />
          <Flag />
          <LoginRegister />
          <Link className="ml-2" to="/user/account/profile">
            My Account
          </Link>
        </div>
        <div className="flex items-center py-2 px-4">
          <Logo />
          <SearchBar />
          <Cart />
        </div>
      </nav>
      <NavCategory />
    </>
  );
}
