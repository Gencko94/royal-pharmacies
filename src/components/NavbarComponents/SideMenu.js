import React from 'react';

import Hamburger from './Hamburger';
import Logo from './Logo';

export default function SideMenu({ toggleSideMenu, sideMenuRef }) {
  return (
    <section
      ref={sideMenuRef}
      className="z-20 transform -translate-x-full transition-transform duration-300 absolute top-0 left-0 min-w-75p h-screen bg-gray-400 p-2 "
    >
      <div className="flex items-center ">
        <Hamburger toggleSideMenu={toggleSideMenu} color={'#555'} />
        <Logo />
      </div>
    </section>
  );
}
