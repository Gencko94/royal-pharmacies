import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import cartEmptyimg from '../../assets/illustrations/cartEmpty.png';
import { AnimatePresence, motion } from 'framer-motion';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';

import { DataProvider } from '../../contexts/DataContext';
import SideCartMenuItem from './SideCartMenuItem';
export default function SideCartMenu({ setSideMenuOpen }) {
  const {
    sideCartItems,
    sideCartSubTotal,
    sideCartCouponCost,
  } = React.useContext(CartAndWishlistProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const { formatMessage, locale } = useIntl();

  const sideMenuVariants = {
    hidden: {
      x: `${locale === 'ar' ? '-100%' : '100%'}`,
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
      x: `${locale === 'ar' ? '-100%' : '100%'}`,
      transition: {
        when: 'afterChildren',
      },
    },
  };

  return (
    <motion.div
      variants={sideMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className={`side-add-to-cart__container ${
        locale === 'ar' ? 'left-0' : 'right-0'
      }`}
    >
      <div className=" bg-body-light p-2 h-full flex flex-col ">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">
            {formatMessage({ id: 'shopping-cart' })}
          </h1>
          <button onClick={() => setSideMenuOpen(false)}>
            <MdClose className="w-5 h-5 " />
          </button>
        </div>
        <hr className="my-2" />
        {sideCartItems?.length === 0 && (
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

        {sideCartItems.length > 0 && (
          <div className=" flex-1 overflow-y-auto overflow-x-hidden">
            <AnimatePresence>
              {sideCartItems.map(item => {
                return <SideCartMenuItem key={item.options.sku} item={item} />;
              })}
            </AnimatePresence>
          </div>
        )}

        <hr className="my-1" />
        {sideCartItems.length > 0 && (
          <div>
            {sideCartCouponCost !== '0.000' && (
              <div className="flex text-green-700 justify-between semibold items-center  my-2">
                <h1 className="font-bold ">
                  {formatMessage({ id: 'coupon-sale' })}
                </h1>
                <h1 className=" font-bold">
                  {sideCartCouponCost}{' '}
                  {deliveryCountry?.currency.translation[locale].symbol}
                </h1>
              </div>
            )}
            <div className="flex justify-between semibold items-center  my-2">
              <h1 className="font-bold">{formatMessage({ id: 'subtotal' })}</h1>
              <h1 className=" font-bold">
                {sideCartSubTotal}{' '}
                {deliveryCountry?.currency.translation[locale].symbol}
              </h1>
            </div>
            <hr className="my-1" />
            <div className=" flex items-center my-2 text-center text-main-text ">
              <Link
                to={`/${locale}/cart`}
                className={`flex-1 py-2 px-3 border font-semibold border-main-color text-main-color mx-1 hover:bg-main-color hover:text-main-text uppercase transition duration-150   rounded`}
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
