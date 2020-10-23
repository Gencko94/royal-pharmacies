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
    <>
      <div
        className={`flex items-center justify-between font-semibold py-1 z-10 ${
          isLightTheme
            ? 'bg-first-nav-light text-first-nav-text-light'
            : 'bg-first-nav-dark text-first-nav-text-dark'
        } text-sm px-4`}
      >
        <div className="flex items-center">
          <Language />
          <ShipTo />
        </div>
        {/* <Promos /> */}
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
        </div>
      </div>
      <div
        className={` z-10 sticky top-0 left-0   ${
          isLightTheme
            ? 'bg-second-nav-light text-second-nav-text-light'
            : 'bg-second-nav-dark text-second-nav-text-dark'
        }   py-4 px-20 `}
      >
        <div className="max-w-default mx-auto flex items-center justify-evenly">
          <Logo />
          <SearchBar />
          <NavIcons />
        </div>
      </div>

      {/* <OtherShops /> */}
      {/* <div
        className="bg-nav-cat-light "
        style={{ top: '72px' }}
      > */}
      <NavCategory />
      {/* </div> */}
    </>
  );
}
