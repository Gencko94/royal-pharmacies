import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import MegaMenu from './MegaMenu';
// import { gsap } from 'gsap';
export default function NavCategory() {
  // const tl = gsap.timeline({ defaults: { duration: 0.5, paused: true } });
  const buttonRef = React.useRef(null);
  const dropDownbgRef = React.useRef(null);
  const { navCategories, isLightTheme } = React.useContext(DataProvider);
  const openDropDown = i => {
    const button = document.querySelector(`#navButton${i}`);
    setTimeout(() => {
      const parentHeight = button.offsetParent.offsetHeight;
      const parentTop = button.offsetParent.offsetTop;
      const leftSpaceOfButton = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const rightSpaceOfButton = button.offsetLeft + buttonWidth;

      if (
        x <= rightSpaceOfButton &&
        x >= leftSpaceOfButton &&
        y >= parentTop &&
        y < parentTop + parentHeight
      ) {
        document.querySelector(`#dd${i}`).classList.remove('hidden');
        dropDownbgRef.current.classList.remove('hidden');
        // openDropDown(id);
      }
    }, 100);
  };
  const closeDropDown = i => {
    const button = buttonRef.current.querySelector(`#dd${i}`);
    dropDownbgRef.current.classList.add('hidden');
    button.classList.add('hidden');
  };
  let x;
  let y;
  function onMouseUpdate(e) {
    x = e.pageX;
    y = e.pageY;
  }
  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseUpdate, false);

    return () => {
      document.removeEventListener('mousemove', onMouseUpdate);
    };
  });
  React.useEffect(() => {});
  return (
    <>
      <div
        ref={buttonRef}
        className={`sticky  left-0 z-10  py-0 px-4 flex items-center justify-center ${
          isLightTheme
            ? 'bg-nav-cat-light text-nav-cat-text-light'
            : 'bg-nav-cat-dark text-nav-cat-text-dark'
        } `}
        style={{ top: '72px' }}
      >
        {navCategories.map((button, i) => (
          <button
            id={`navButton${i}`}
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
        className=" z-9 hidden absolute top-0 left-0 w-full  min-h-full bg-gray-700 opacity-50  "
      />
    </>
  );
}
