import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../../contexts/DataContext';
import CartEmpty from '../CartEmpty';
import CartContainerLoader from '../loaders/CartContainerLoader';
import GuestCartItem from './GuestCartItem';

export default function GuestCartContainer() {
  const {
    guestCartItems,
    guestCartTotal,
    guestCartItemsLoading,
  } = React.useContext(CartAndWishlistProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const { formatMessage, locale } = useIntl();
  const resolvePlural = () => {
    switch (guestCartItems.length) {
      case 1:
        return formatMessage({ id: 'one-item' });

      case 2:
        return formatMessage({ id: 'two-items' });

      case guestCartItems.length > 10:
        return formatMessage({ id: 'more-than-10-items' });
      default:
        return formatMessage({ id: 'multiple-items' });
    }
  };
  if (guestCartItemsLoading) {
    return <CartContainerLoader locale={locale} />;
  }
  return (
    <div className="text-body-text-light">
      <AnimatePresence>
        {guestCartItems.length === 0 && <CartEmpty />}
      </AnimatePresence>
      {guestCartItems.length !== 0 && (
        <>
          <div className="cart-grid-titles font-semibold text-lg">
            <div></div>
            <h1 className="  ">{formatMessage({ id: 'the-item' })}</h1>
            <h1 className="text-center">{formatMessage({ id: 'price' })}</h1>
            <h1 className="text-center">{formatMessage({ id: 'total' })}</h1>
          </div>
          <hr />
          <AnimateSharedLayout>
            <motion.div
              initial={false}
              layout
              className=" grid grid-cols-1 gap-2"
            >
              <AnimatePresence>
                {guestCartItems.map(item => {
                  return <GuestCartItem key={item.options.sku} item={item} />;
                })}
              </AnimatePresence>
            </motion.div>

            <motion.div
              layout
              className="flex justify-end p-2 rounded mt-2 border bg-gray-100"
              style={{ fontWeight: '900' }}
            >
              <h1>{formatMessage({ id: 'cart-total' })}</h1>
              <h1 className="mx-1 whitespace-no-wrap ">
                (
                {locale === 'ar'
                  ? guestCartItems.length > 2 && guestCartItems.length
                  : `${guestCartItems.length} `}
                {resolvePlural()})
              </h1>
              <h1>{guestCartTotal}</h1>{' '}
              {deliveryCountry?.currency.translation[locale].symbol}
            </motion.div>
            <motion.div layout className="text-sm my-4">
              <h1>{formatMessage({ id: 'cart-tos' })}</h1>
            </motion.div>
          </AnimateSharedLayout>
        </>
      )}

      <hr />
    </div>
  );
}
