import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../contexts/DataContext';

const variants = {
  hidden: {
    y: '100%',
  },
  visible: {
    y: 0,
    transition: {
      type: 'tween',
      // duration: 200,
    },
  },
  exited: {
    y: '100%',
  },
};
const MobileCartPopup = () => {
  const { cartSubtotal, guestCartSubtotal } = React.useContext(
    CartAndWishlistProvider
  );
  const { userId } = React.useContext(AuthProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const { locale, formatMessage } = useIntl();

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className={`mobile-cart-popup border-t bg-main-color text-main-text`}
    >
      <div className="flex items-center justify-center">
        {formatMessage({ id: 'cart-total' })}:
        <p className="mx-3 py-1 px-2 text-sm rounded-full border-main-text border flex items-center justify-center">
          {userId ? cartSubtotal : guestCartSubtotal}{' '}
          {deliveryCountry?.currency.translation[locale].symbol}
        </p>
      </div>
      <Link
        to={`/${locale}/cart`}
        className="border border-main-text rounded py-1 px-2"
      >
        {formatMessage({ id: 'go-to-cart' })}
      </Link>
    </motion.div>
  );
};

export default MobileCartPopup;
