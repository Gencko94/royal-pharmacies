import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import MegaMenu from './MegaMenu';
export default function NavCategory() {
  const buttonRef = React.useRef(null);
  const dropDownbgRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const { navCategories, isLightTheme } = React.useContext(DataProvider);
  // const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const [catData, setCatData] = React.useState([]);
  const triggerDropDownOpen = () => {
    const trigger = document.querySelector('#menu-trigger');
    console.log(trigger);
    const menu = document.querySelector('#mega-menu');
    const triggerHeight = trigger.offsetHeight;
    const parentTop = trigger.offsetParent.offsetTop;
    const leftSpaceOfButton = trigger.offsetLeft;
    const triggerWidth = trigger.offsetWidth;
    const rightSpaceOfButton = trigger.offsetLeft + triggerWidth;
    setTimeout(() => {
      if (
        x <= rightSpaceOfButton &&
        x >= leftSpaceOfButton &&
        y > parentTop &&
        y < parentTop + triggerHeight
      ) {
        console.log(y);
        menu.classList.remove('hidden');
        dropDownbgRef.current.classList.remove('hidden');
      }
    }, 250);
  };
  const triggerDropDownClose = () => {
    const menu = document.querySelector('#mega-menu');

    menu.classList.add('hidden');
    // tl.reverse();
    dropDownbgRef.current.classList.add('hidden');
    setCatData([]);
  };
  const openDropDown = i => {
    // const button = document.querySelector(`#navButton${i}`);
    setCatData(navCategories[i].data);
  };
  const closeDropDown = i => {
    // const button = buttonRef.current.querySelector(`#dd${i}`);
    // dropDownbgRef.current.classList.add('hidden');
    // button.classList.add('hidden');
  };
  let x;
  let y;
  function onMouseUpdate(e) {
    x = e.pageX;
    y = e.pageY;
  }
  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseUpdate, false);
  });
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
        <div
          id="menu-trigger"
          onMouseEnter={triggerDropDownOpen}
          onMouseLeave={triggerDropDownClose}
          className="flex items-center justify-center"
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
            </button>
          ))}
          {catData !== [] && (
            <MegaMenu
              menuRef={menuRef}
              data={catData}
              isLightTheme={isLightTheme}
            />
          )}
        </div>
      </div>
      <div
        ref={dropDownbgRef}
        className=" z-9 hidden absolute top-0 left-0 w-full  min-h-full bg-gray-700 opacity-50  "
      />
    </>
  );
}
