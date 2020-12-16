import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
export default function Hamburger({ color = '#fff', toggleSideMenu }) {
  return (
    <button
      onClick={toggleSideMenu}
      className="flex items-center justify-center p-2"
    >
      <GiHamburgerMenu className="w-20p h-20p" style={{ color: color }} />
    </button>
  );
}
