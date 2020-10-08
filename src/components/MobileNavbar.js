import React from 'react';
import useClickAway from '../hooks/useClickAway';
import Hamburger from './NavbarComponents/Hamburger';
import Logo from './NavbarComponents/Logo';
import MobileIcons from './NavbarComponents/MobileIcons';
import MobileSearchbar from './NavbarComponents/MobileSearchbar';
import SideMenu from './NavbarComponents/SideMenu';
import { CSSTransition } from 'react-transition-group';

export default function MobileNavbar() {
  const [searchBarOpen, setSearchBarOpen] = React.useState(false);
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [windowScrolled, setWindowScrolled] = React.useState(false);
  const inputRef = React.useRef(null);
  const sideMenuRef = React.useRef(null);
  useClickAway(sideMenuRef, () => {
    if (sideMenuOpen) {
      sideMenuRef.current.classList.add('-translate-x-full');
      setSideMenuOpen(false);
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
        if (searchBarOpen) {
          toggleSearchBar();
        }
      }
    }
  };
  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 140) {
        setWindowScrolled(true);
      } else {
        setWindowScrolled(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', null);
    };
  }, []);
  return (
    <>
      <div className=" w-full left-0 top-0 z-10 ">
        <nav className="    p-2  flex items-center bg-nav-primary text-white">
          <Hamburger toggleSideMenu={toggleSideMenu} />
          <Logo withTypography={false} />
          <MobileIcons
            toggleSearchBar={toggleSearchBar}
            searchBarOpen={searchBarOpen}
          />
        </nav>
        <div className="p-2 bg-nav-primary">
          <MobileSearchbar inputRef={inputRef} />
        </div>
        <SideMenu toggleSideMenu={toggleSideMenu} sideMenuRef={sideMenuRef} />
      </div>
      <CSSTransition
        in={windowScrolled}
        timeout={400}
        classNames="mobile-nav__secondary"
        unmountOnExit={true}
      >
        <>
          <nav className="  fixed w-full z-10 top-0 left-0  p-2  flex items-center bg-red-700 text-white">
            <Hamburger toggleSideMenu={toggleSideMenu} />
            <MobileSearchbar inputRef={inputRef} />
            <MobileIcons
              toggleSearchBar={toggleSearchBar}
              searchBarOpen={searchBarOpen}
            />
          </nav>

          <SideMenu toggleSideMenu={toggleSideMenu} sideMenuRef={sideMenuRef} />
        </>
      </CSSTransition>
    </>
  );
}
