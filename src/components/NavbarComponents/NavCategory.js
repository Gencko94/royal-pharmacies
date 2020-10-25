import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import MegaMenu from './MegaMenu';
import AllCategories from './AllCategories/AllCategories';
import { gsap } from 'gsap';
export default function NavCategory() {
  const buttonRef = React.useRef(null);
  const dropDownbgRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const { navCategories, isLightTheme } = React.useContext(DataProvider);

  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const [catData, setCatData] = React.useState(null);
  const [data, setData] = React.useState([]);
  const animation = React.useMemo(
    () =>
      gsap.timeline({
        defaults: { duration: 0.2 },
        paused: true,
      }),
    []
  );
  React.useEffect(() => {
    animation.fromTo(
      menuRef.current,
      { height: 0, opacity: 0 },
      { height: 'auto', opacity: 1 }
    );
  }, [animation]);
  React.useEffect(() => {
    if (dropDownOpen) {
      animation.play();
    } else {
      animation.reverse();
    }
  }, [animation, dropDownOpen]);
  const triggerDropDownOpen = () => {
    const trigger = document.querySelector('#menu-trigger');
    // const menu = document.querySelector('#mega-menu');
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
        // menu.classList.remove('hidden');
        setDropDownOpen(true);
        dropDownbgRef.current.classList.remove('hidden');
      }
    }, 250);
  };
  const triggerDropDownClose = () => {
    // const menu = document.querySelector('#mega-menu');

    // menu.classList.add('hidden');
    // tl.reverse();
    setDropDownOpen(false);
    dropDownbgRef.current.classList.add('hidden');
    // setCatData(null);
  };
  const openDropDown = i => {
    // const button = document.querySelector(`#navButton${i}`);
    setCatData(data[i]);
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
  React.useEffect(() => {
    setData(navCategories);
  }, [navCategories]);
  return (
    <>
      <div
        ref={buttonRef}
        className={`   sticky     z-10  ${
          isLightTheme
            ? 'bg-nav-cat-light text-nav-cat-text-light'
            : 'bg-nav-cat-dark text-nav-cat-text-dark'
        }  `}
        style={{ top: '62px' }}
      >
        <div className="max-w-default mx-auto items-center flex px-6   ">
          <AllCategories dropDownbgRef={dropDownbgRef} />
          <div id="menu-trigger" className="relative pl-3">
            <div
              onMouseEnter={triggerDropDownOpen}
              onMouseLeave={triggerDropDownClose}
              className={` ${
                isLightTheme
                  ? 'bg-nav-cat-light text-nav-cat-text-light'
                  : 'bg-nav-cat-dark text-nav-cat-text-dark'
              } flex items-center   `}
            >
              {data.map((button, i) => (
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
                  {button.category}
                </button>
              ))}
              <MegaMenu
                menuRef={menuRef}
                data={catData}
                isLightTheme={isLightTheme}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        ref={dropDownbgRef}
        className=" z-9 hidden absolute top-0 left-0 w-full  min-h-full bg-gray-700 opacity-50  "
      />
    </>
  );
}
