import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import MobileFooter from '../MobileFooter';
import MobileNavbar from '../MobileNavbar';
import SideMenu from '../NavbarComponents/SideMenu';

export default function Mobile({ children }) {
  const sideMenuRef = React.useRef(null);
  const { sideMenuOpen, setSideMenuOpen } = React.useContext(DataProvider);
  const toggleSideMenu = () => {
    if (sideMenuOpen) {
      setSideMenuOpen(false);
    } else {
      setSideMenuOpen(true);
    }
  };
  const handleClose = () => {
    if (sideMenuOpen) {
      sideMenuRef.current.classList.add('-translate-x-full');
      setSideMenuOpen(false);
    }
  };

  return (
    <>
      <MobileNavbar
        sideMenuOpen={sideMenuOpen}
        setSideMenuOpen={setSideMenuOpen}
        toggleSideMenu={toggleSideMenu}
      />
      {children}
      <AnimatePresence>
        {sideMenuOpen && (
          <SideMenu
            key="side-menu"
            toggleSideMenu={toggleSideMenu}
            sideMenuRef={sideMenuRef}
          />
        )}
        {sideMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            key="sidemenu-bg"
            onClick={handleClose}
            className="bg-gray-900 opacity-25 fixed z-10 top-0 left-0 w-full h-screen"
          />
        )}
      </AnimatePresence>
      <MobileFooter />
    </>
  );
}
