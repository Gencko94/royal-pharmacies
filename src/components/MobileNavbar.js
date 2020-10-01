import React from 'react';
import { Link } from 'react-router-dom';
import useClickAway from '../hooks/useClickAway';
import Hamburger from './NavbarComponents/Hamburger';
import Logo from './NavbarComponents/Logo';
import MobileIcons from './NavbarComponents/MobileIcons';
import MobileSearchbar from './NavbarComponents/MobileSearchbar';
import SideMenu from './NavbarComponents/SideMenu';

export default function MobileNavbar() {
  const [searchBarOpen, setSearchBarOpen] = React.useState(false);
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const inputRef = React.useRef(null);
  const sideMenuRef = React.useRef(null);
  useClickAway(sideMenuRef, () => {
    if (sideMenuOpen) {
      inputRef.current.classList.add('mt-n57p');
      setSearchBarOpen(false);
    }
  });
  const toggleSearchBar = () => {
    if (searchBarOpen) {
      inputRef.current.classList.add('mt-n57p');
      setSearchBarOpen(false);
    } else {
      inputRef.current.classList.remove('mt-n57p');
      setSearchBarOpen(true);
    }
  };
  const toggleSideMenu = () => {
    if (sideMenuRef.current) {
      if (sideMenuOpen) {
        sideMenuRef.current.classList.add('-translate-x-full');
        setSideMenuOpen(false);
      } else {
        sideMenuRef.current.classList.remove('-translate-x-full');
        setSideMenuOpen(true);
      }
    }
  };
  return (
    <>
      <nav className="sticky top-0 z-10  left-0 p-2 flex items-center bg-gradient-to-tr from-nav-gradient-from to-nav-gradient-to text-white">
        <Hamburger toggleSideMenu={toggleSideMenu} />
        <Logo />
        <MobileIcons
          toggleSearchBar={toggleSearchBar}
          searchBarOpen={searchBarOpen}
        />
        <Link to="/user/account/profile">My Account</Link>
      </nav>
      <MobileSearchbar inputRef={inputRef} />
      <SideMenu toggleSideMenu={toggleSideMenu} sideMenuRef={sideMenuRef} />
    </>
  );
}
