import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import AllCategories from './AllCategories/AllCategories';
import { gsap } from 'gsap';
import { AnimatePresence } from 'framer-motion';
import ReactHoverObserver from 'react-hover-observer';
import MegaMenu from './MegaMenu';
import NavCategoriesContainer from './NavCategoriesContainer';
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

  const handleDropDownOpen = id => {
    console.log(id);
    const category = data.find(item => item.category === id);
    console.log(category);
    setCatData(category);
  };

  const closeDropDown = () => {
    setDropDownOpen(false);
  };

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
        <div className="max-w-default mx-auto  px-4 ">
          <div className="relative items-center flex">
            <AllCategories dropDownbgRef={dropDownbgRef} />
            <ReactHoverObserver hoverDelayInMs={300}>
              <NavCategoriesContainer
                isLightTheme={isLightTheme}
                data={data}
                handleDropDownOpen={handleDropDownOpen}
                setCatData={setCatData}
                closeDropDown={closeDropDown}
                setDropDownOpen={setDropDownOpen}
                catData={catData}
              />
              <AnimatePresence>
                {dropDownOpen && (
                  <MegaMenu data={catData} isLightTheme={isLightTheme} />
                )}
              </AnimatePresence>
            </ReactHoverObserver>
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
