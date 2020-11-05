import React from 'react';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { AiOutlineApartment } from 'react-icons/ai';
import { AiOutlineHistory } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import { FaLanguage } from 'react-icons/fa';
import { RiCustomerServiceFill } from 'react-icons/ri';
import { DataProvider } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';
import TopSection from '../SideMenuMobile/TopSection';
import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';
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
  const { locale, formatMessage } = useIntl();

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
      innerRef.current.classList.remove(`${locale}-page${page + 1}`);
      innerRef.current.classList.remove(`${locale}-page${page}`);
      innerRef.current.classList.remove(`${locale}-page${page - 1}`);
      innerRef.current.classList.add(`${locale}-page${page}`);
    }
  }, [page, locale]);

  const listVariants = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      transition: {
        duration: 0.2,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };
  const childVariants = {
    from: {
      opacity: 0,
      y: 50,
    },
    to: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <div
      ref={sideMenuRef}
      className={`${
        isLightTheme
          ? 'bg-side-light text-side-light-text'
          : 'bg-side-dark text-side-dark-text'
      }  z-20  absolute top-0 ${
        locale === 'ar' ? 'right-0' : 'left-0'
      } min-w-75p h-screen sm:text-lg`}
      style={{ maxWidth: '75%' }}
    >
      <TopSection isLightTheme={isLightTheme} toggleSideMenu={toggleSideMenu} />

      <div className="relative overflow-hidden mt-2 ">
        <div ref={innerRef} className="sidebar__inner  ">
          <motion.div
            variants={listVariants}
            initial="from"
            animate="to"
            className="sidebar-first "
          >
            <motion.button
              variants={childVariants}
              onClick={handleClickNextZero}
              className="py-2 px-2 mb-2 flex items-center justify-between "
            >
              <div className="flex items-center">
                <AiOutlineApartment className=" w-25p h-25p" />
                <h1 className="mx-2">
                  {formatMessage({ id: 'all-categories' })}
                </h1>
              </div>
              {locale === 'ar' ? <BsChevronLeft /> : <BsChevronRight />}
            </motion.button>
            <motion.button
              onClick={toggleSideMenu}
              className="py-2 px-2 mb-2   "
              variants={childVariants}
            >
              <Link to={`/${locale}/cart`} className="flex items-center">
                <HiOutlineShoppingBag className=" w-25p h-25p" />
                <h1 className="mx-2">{formatMessage({ id: 'cart' })}</h1>
              </Link>
            </motion.button>
            <motion.button
              className="py-2 px-2 mb-2"
              onClick={toggleSideMenu}
              variants={childVariants}
            >
              <Link
                to={`/${locale}/user/account/profile`}
                className="flex items-center"
              >
                <CgProfile className=" w-25p h-25p" />
                <h1 className="mx-2">{formatMessage({ id: 'my-account' })}</h1>
              </Link>
            </motion.button>
            <motion.button
              variants={childVariants}
              onClick={toggleSideMenu}
              className="py-2 px-2 mb-2  "
            >
              <div className=" flex items-center">
                <AiOutlineHistory className=" w-25p h-25p" />
                <h1 className="mx-2">
                  {formatMessage({ id: 'order-history' })}
                </h1>
              </div>
            </motion.button>
            <hr />
            <motion.button
              variants={childVariants}
              onClick={toggleSideMenu}
              className="py-2 px-2 mb-2    "
            >
              <div className=" flex items-center">
                <AiOutlineHeart className=" w-25p h-25p" />
                <h1 className="mx-2">{formatMessage({ id: 'wishlist' })}</h1>
              </div>
            </motion.button>
            <motion.button
              variants={childVariants}
              onClick={toggleSideMenu}
              className="py-2 px-2 mb-2    "
            >
              <div className=" flex items-center">
                <AiOutlineEye className=" w-25p h-25p" />
                <h1 className="mx-2 whitespace-no-wrap">
                  {formatMessage({ id: 'viewed-items' })}
                </h1>
              </div>
            </motion.button>
            <hr />
            <motion.button
              variants={childVariants}
              onClick={toggleSideMenu}
              className="py-2 px-2 mb-2    "
            >
              <div className=" flex items-center">
                <MdLocationOn className=" w-25p h-25p" />
                <h1 className="mx-2">
                  {formatMessage({ id: 'deliver-to' })} : Kuwait
                </h1>
              </div>
            </motion.button>
            <motion.button
              variants={childVariants}
              onClick={toggleSideMenu}
              className="py-2 px-2 mb-2    "
            >
              <div className=" flex items-center">
                <RiCustomerServiceFill className=" w-25p h-25p" />
                <h1 className="mx-2">
                  {formatMessage({ id: 'customer-service' })}
                </h1>
              </div>
            </motion.button>
            <hr />
            <motion.button
              variants={childVariants}
              onClick={toggleSideMenu}
              className="py-2 px-2 mb-2    "
            >
              <div className=" flex items-center">
                <FaLanguage className=" w-25p h-25p" />
                <h1 className="mx-2">{formatMessage({ id: 'language' })}</h1>
              </div>
            </motion.button>
          </motion.div>
          {products && (
            <>
              <div className="sidebar-second">
                <button
                  onClick={handleClickBackFirst}
                  className="py-2 px-2 mb-2   "
                >
                  {formatMessage({ id: 'go-back' })}
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
                      {locale === 'ar' ? <BsChevronLeft /> : <BsChevronRight />}
                    </button>
                  );
                })}
              </div>
              <div className="sidebar-second">
                <button
                  onClick={() => handleClickBackSecond(subPage)}
                  className="py-2 px-2 mb-2    "
                >
                  {formatMessage({ id: 'go-back' })}
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
                      {locale === 'ar' ? <BsChevronLeft /> : <BsChevronRight />}
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
                  {formatMessage({ id: 'go-back' })}
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
