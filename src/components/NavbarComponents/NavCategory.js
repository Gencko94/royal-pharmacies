import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import AllCategories from './AllCategories/AllCategories';
import { AnimatePresence } from 'framer-motion';
import ReactHoverObserver from 'react-hover-observer';
import MegaMenu from './MegaMenu';
import NavCategoriesContainer from './NavCategoriesContainer';
export default function NavCategory() {
  const dropDownbgRef = React.useRef(null);
  const { navCategories, isLightTheme } = React.useContext(DataProvider);

  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const [catData, setCatData] = React.useState(null);
  const [data, setData] = React.useState([]);

  const handleDropDownOpen = id => {
    const category = data.find(item => item.category === id);
    setCatData(category);
  };

  React.useEffect(() => {
    setData(navCategories);
  }, [navCategories]);
  return (
    <>
      <div
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
