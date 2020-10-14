import React from 'react';
import NavIcons from './NavbarComponents/NavIcons';
import ShipTo from './NavbarComponents/ShipTo';
import Language from './NavbarComponents/Language';
import LoginRegister from './NavbarComponents/LoginRegister';
import Logo from './NavbarComponents/Logo';
import SearchBar from './NavbarComponents/SearchBar';
import NavCategory from './NavbarComponents/NavCategory';
import { DataProvider } from '../contexts/DataContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { isLightTheme } = React.useContext(DataProvider);
  return (
    <div>
      <nav className="z-10 top-0 left-0  ">
        <div
          className={`flex items-center justify-between font-semibold py-1  ${
            isLightTheme
              ? 'bg-first-nav-light text-first-nav-text-light'
              : 'bg-first-nav-dark text-first-nav-text-dark'
          } text-sm px-4`}
        >
          <ShipTo />
          <div className="flex justify items-center">
            {/* <button
              className="mr-2"
              onClick={() => setLightTheme(!isLightTheme)}
            >
              Light Theme Toggle
            </button> */}
            <Link className="mr-2" to="/user/account/profile">
              My Account
            </Link>
            <LoginRegister />
            <Language />
          </div>
        </div>
        <div
          className={`flex items-center ${
            isLightTheme
              ? 'bg-second-nav-light text-second-nav-text-light'
              : 'bg-second-nav-dark text-second-nav-text-dark'
          }  justify-evenly py-4 px-20`}
        >
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
