import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import MegaMenu from './MegaMenu';

export default function NavCategory() {
  const buttonRef = React.useRef(null);
  const dropDownbgRef = React.useRef(null);
  const { navCategories, isLightTheme } = React.useContext(DataProvider);
  const openDropDown = i => {
    const node = buttonRef.current.querySelector(`#dd${i}`);
    node.classList.remove('hidden');
    dropDownbgRef.current.classList.remove('hidden');
  };
  const closeDropDown = i => {
    const node = buttonRef.current.querySelector(`#dd${i}`);
    dropDownbgRef.current.classList.add('hidden');
    node.classList.add('hidden');
  };

  return (
    <>
      <div
        ref={buttonRef}
        className={`sticky   top-0 left-0 z-10  py-0 px-4 flex items-center justify-center ${
          isLightTheme
            ? 'bg-nav-cat-light text-nav-cat-text-light'
            : 'bg-nav-cat-dark text-nav-cat-text-dark'
        } `}
      >
        {navCategories.map((button, i) => (
          <button
            id="navButton"
            key={i}
            onMouseEnter={() => openDropDown(i)}
            onMouseLeave={() => closeDropDown(i)}
            className={`p-2 text-sm  font-semibold hover:shadow-navCategory ${
              isLightTheme
                ? 'hover:bg-second-nav-text-light'
                : 'hover:bg-second-nav-dark'
            }`}
          >
            {button.title}
            <MegaMenu id={i} data={button.data} isLightTheme={isLightTheme} />
          </button>
        ))}
      </div>
      <div
        ref={dropDownbgRef}
        className=" z-9 hidden absolute top-0 left-0 w-full  min-h-screen bg-gray-700 opacity-50  "
      />
    </>
  );
}
