import React from 'react';

import Hamburger from './Hamburger';
import Logo from './Logo';
import { BsChevronRight } from 'react-icons/bs';
import { AiOutlineApartment } from 'react-icons/ai';
import { AiOutlineHistory } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { RiCustomerServiceFill } from 'react-icons/ri';
import { DataProvider } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';

export default function SideMenu({
  toggleSideMenu,
  sideMenuRef,
  isLightTheme,
}) {
  const { sidebarCategories } = React.useContext(DataProvider);
  const [products, setProducts] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [subPage, setSubPage] = React.useState(0);
  const [secondSubPage, setSecondSubPage] = React.useState(0);
  const innerRef = React.useRef(null);

  const handleClickBackFirst = () => {
    setPage(page - 1);
    setTimeout(() => {
      setProducts(false);
    }, 400);
  };
  const handleClickBackSecond = i => {
    setPage(page - 1);
    setSecondSubPage(i);
  };
  const handleClickNextZero = () => {
    setPage(page + 1);
    setProducts(true);
  };
  const handleClickNextFirst = i => {
    setPage(page + 1);
    setSubPage(i);
  };
  const handleClickNextSecond = i => {
    setPage(page + 1);
    setSecondSubPage(i);
  };

  React.useEffect(() => {
    if (innerRef.current) {
      innerRef.current.classList.remove(`page${page + 1}`);
      innerRef.current.classList.remove(`page${page}`);
      innerRef.current.classList.remove(`page${page - 1}`);
      innerRef.current.classList.add(`page${page}`);
    }
  }, [page]);
  return (
    <div
      ref={sideMenuRef}
      className={`${
        isLightTheme
          ? 'bg-side-light text-side-light-text'
          : 'bg-side-dark text-side-dark-text'
      }  z-20 transform -translate-x-full transition-transform duration-300 absolute top-0 left-0 min-w-75p h-screen sm:text-lg`}
      style={{ maxWidth: '75%' }}
    >
      <div
        className={`${
          isLightTheme
            ? 'bg-second-nav-light text-second-nav-text-light'
            : 'bg-second-nav-dark text-second-nav-text-dark'
        } p-1`}
        style={{ minHeight: '105px' }}
      >
        <div className={`flex items-center p-1 `}>
          <Hamburger toggleSideMenu={toggleSideMenu} />
          <div className="relative " style={{ left: '100px' }}>
            <Logo withTypography={false} />
          </div>
        </div>
        <div className="flex place-content-center p-2 ">
          <Link
            to="/app/login"
            className=" font-semibold p-1 rounded text-center "
          >
            Hello,Sign in
          </Link>
        </div>
      </div>
      {/* <hr /> */}
      <div className="relative overflow-hidden mt-2 ">
        <div ref={innerRef} className="sidebar__inner  ">
          <div className="sidebar-first ">
            <button
              onClick={handleClickNextZero}
              className="py-2 px-2 mb-2 flex items-center justify-between "
            >
              <div className="flex items-center">
                <AiOutlineApartment className="mr-2 w-25p h-25p" />
                <h1>All Products</h1>
              </div>
              <BsChevronRight />
            </button>

            <Link
              to="/cart"
              onClick={toggleSideMenu}
              className="py-2 px-2 mb-2   "
            >
              <div className="flex  items-center">
                <HiOutlineShoppingBag className="mr-2 w-25p h-25p" />
                <h1>Cart</h1>
              </div>
            </Link>
            <Link
              to="/user/account/profile"
              className="py-2 px-2 mb-2    "
              onClick={toggleSideMenu}
            >
              <div className=" flex items-center">
                <CgProfile className="mr-2 w-25p h-25p" />
                <h1>Account</h1>
              </div>
            </Link>
            <button onClick={toggleSideMenu} className="py-2 px-2 mb-2  ">
              <div className=" flex items-center">
                <AiOutlineHistory className="mr-2 w-25p h-25p" />
                <h1>Order History</h1>
              </div>
            </button>
            <hr />
            <button onClick={toggleSideMenu} className="py-2 px-2 mb-2    ">
              <div className=" flex items-center">
                <AiOutlineHeart className="mr-2 w-25p h-25p" />
                <h1>Wishlist</h1>
              </div>
            </button>
            <button onClick={toggleSideMenu} className="py-2 px-2 mb-2    ">
              <div className=" flex items-center">
                <AiOutlineEye className="mr-2 w-25p h-25p" />
                <h1>Viewed Items</h1>
              </div>
            </button>
            <hr />
            <button onClick={toggleSideMenu} className="py-2 px-2 mb-2    ">
              <div className=" flex items-center">
                <MdLocationOn className="mr-2 w-25p h-25p" />
                <h1>Ship to : Kuwait</h1>
              </div>
            </button>
            <button onClick={toggleSideMenu} className="py-2 px-2 mb-2    ">
              <div className=" flex items-center">
                <RiCustomerServiceFill className="mr-2 w-25p h-25p" />
                <h1>Customer Service</h1>
              </div>
            </button>
          </div>
          {products && (
            <>
              <div className="sidebar-second">
                <button
                  onClick={handleClickBackFirst}
                  className="py-2 px-2 mb-2   "
                >
                  Go Back
                </button>
                <hr />
                {sidebarCategories.map((category, i) => {
                  return (
                    <button
                      onClick={() => handleClickNextFirst(i)}
                      key={category.title}
                      className="py-2 px-2 mb-2 flex items-center  justify-between"
                    >
                      <div className=" flex items-center">
                        <CgProfile className="mr-2 w-25p h-25p" />
                        <h1>{category.title}</h1>
                      </div>
                      <BsChevronRight />
                    </button>
                  );
                })}
              </div>
              <div className="sidebar-second">
                <button
                  onClick={() => handleClickBackSecond(subPage)}
                  className="py-2 px-2 mb-2    "
                >
                  Go Back
                </button>
                <hr />
                {sidebarCategories[subPage].sub.map((category, i) => {
                  return (
                    <button
                      onClick={() => handleClickNextSecond(i)}
                      key={i}
                      className="py-2 px-2 mb-2 flex items-center  justify-between"
                    >
                      <div className=" flex items-center">
                        <CgProfile className="mr-2 w-25p h-25p" />
                        <h1>{category.title}</h1>
                      </div>
                      <BsChevronRight />
                    </button>
                  );
                })}
              </div>
              <div className="sidebar-second">
                {/* third flex div aka third page */}
                <button
                  onClick={() => handleClickBackSecond(secondSubPage)}
                  className="py-2 px-2 mb-2    "
                >
                  Go Back
                </button>
                <hr />
                {sidebarCategories[subPage].sub[secondSubPage].sub.map(
                  (category, i) => {
                    return (
                      <button
                        key={i}
                        className="py-2 px-2 mb-2 flex items-center  justify-between"
                      >
                        <div className=" flex items-center">
                          <CgProfile className="mr-2 w-25p h-25p" />
                          <h1>{category}</h1>
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
