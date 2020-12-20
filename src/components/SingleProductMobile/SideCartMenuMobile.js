import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import cartEmptyimg from '../../assets/illustrations/cartEmpty.png';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../contexts/DataContext';

import SideCartMenuItemMobile from './SideCartMenuItemMobile';
export default function SideCartMenuMobile({ setSideMenuOpen }) {
  const { sideCartItems, sideCartSubTotal } = React.useContext(
    CartAndWishlistProvider
  );
  const { deliveryCountry } = React.useContext(DataProvider);
  const handleCloseMenu = () => {
    setSideMenuOpen(false);
  };
  const { formatMessage, locale } = useIntl();

  const sideMenuVariants = {
    hidden: {
      x: `${locale === 'ar' ? '100%' : '-100%'}`,
      opacity: 0,
    },
    visible: {
      x: '0%',
      opacity: 1,
      transition: {
        type: 'tween',
      },
    },
    exited: {
      x: `${locale === 'ar' ? '100%' : '-100%'}`,
      transition: {
        when: 'afterChildren',
        type: 'tween',
      },
    },
  };

  return (
    <motion.div
      variants={sideMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className={`side-add-to-cart__container-mobile ${
        locale === 'ar' ? 'right-0' : 'left-0'
      } `}
    >
      <div className=" bg-body-light p-2 h-full flex flex-col ">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">
            {formatMessage({ id: 'shopping-cart' })}
          </h1>
          <button onClick={handleCloseMenu}>
            <MdClose className="w-5 h-5 " />
          </button>
        </div>
        <hr className="my-2" />
        {sideCartItems.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <img src={cartEmptyimg} alt="Empty cart" />
            <h1 className="font-bold mb-2">
              {formatMessage({ id: 'cart-empty' })}
            </h1>
            <Link
              to={`/${locale}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {formatMessage({ id: 'check-today-deals' })}
            </Link>
          </div>
        )}
        {sideCartItems.length !== 0 && (
          <div
            className="flex-1 overflow-y-auto overflow-x-hidden"
            style={{ maxHeight: 'calc(-110px + 100vh)' }}
          >
            <AnimatePresence>
              {sideCartItems.map(item => {
                return (
                  <SideCartMenuItemMobile key={item.options.sku} item={item} />
                );
              })}
            </AnimatePresence>
          </div>
        )}
        <hr className="my-1" />
        {sideCartItems.length !== 0 && (
          <div>
            <div className="flex justify-between semibold items-center  my-2">
              <h1 className="">{formatMessage({ id: 'subtotal' })}</h1>
              <h1 className=" font-semibold">
                {sideCartSubTotal}{' '}
                {deliveryCountry?.currency.translation[locale].symbol}
              </h1>
            </div>
            <hr className="my-1" />
            <div className=" my-2">
              <Link
                to={`/${locale}/cart`}
                className={` py-2 block text-center uppercase px-3 text-main-color mx-1 border-main-color border   rounded`}
              >
                {formatMessage({ id: 'go-to-cart' })}
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
