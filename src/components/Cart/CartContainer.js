import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../contexts/DataContext';
import CartEmpty from './CartEmpty';
import CartItem from './CartItem';
import CartContainerLoader from './loaders/CartContainerLoader';

export default function CartContainer({
  removefromCartButtonLoading,
  handleRemoveItemFromCart,
  handleAddItemToWishlist,
  handleRemoveItemFromWishlist,
  wishlistItems,
}) {
  const { cartItems, cartItemsLoading, cartSubtotal } = React.useContext(
    CartAndWishlistProvider
  );
  const { deliveryCountry } = React.useContext(DataProvider);
  const resolvePlural = () => {
    switch (cartItems.length) {
      case 1:
        return formatMessage({ id: 'one-item' });

      case 2:
        return formatMessage({ id: 'two-items' });

      case cartItems.length > 10:
        return formatMessage({ id: 'one-items' });
      default:
        return formatMessage({ id: 'multiple-items' });
    }
  };
  const { formatMessage, locale } = useIntl();
  if (cartItemsLoading) {
    return <CartContainerLoader locale={locale} />;
  }
  return (
    <div>
      <AnimatePresence>
        {cartItems.length === 0 && <CartEmpty />}
      </AnimatePresence>
      {cartItems.length !== 0 && (
        <>
          <div className="cart-grid-titles font-semibold text-lg">
            <div></div>
            <h1 className="  ">{formatMessage({ id: 'the-item' })}</h1>
            <h1 className="text-center">{formatMessage({ id: 'price' })}</h1>
          </div>
          <hr />
          <AnimateSharedLayout>
            <motion.div
              initial={false}
              layout
              className=" grid grid-cols-1 gap-2"
            >
              <AnimatePresence>
                {cartItems.map(item => {
                  return (
                    <CartItem
                      key={item.id}
                      item={item}
                      handleRemoveItemFromCart={handleRemoveItemFromCart}
                      removefromCartButtonLoading={removefromCartButtonLoading}
                      handleRemoveItemFromWishlist={
                        handleRemoveItemFromWishlist
                      }
                      handleAddItemToWishlist={handleAddItemToWishlist}
                      wishlistItems={wishlistItems}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.div>

            <motion.div
              layout
              className="flex justify-end p-2 rounded mt-2 border bg-gray-100"
            >
              <h1>{formatMessage({ id: 'cart-total' })}</h1>
              <h1 className="mx-1 whitespace-no-wrap ">
                (
                {locale === 'ar'
                  ? cartItems.length > 2 && cartItems.length
                  : `${cartItems.length} `}
                {resolvePlural()})
              </h1>
              <h1>{cartSubtotal}</h1>{' '}
              {deliveryCountry?.currency.translation[locale].symbol}
            </motion.div>
            <motion.div layout className="text-sm my-4">
              <h1>{formatMessage({ id: 'cart-tos' })}</h1>
            </motion.div>
          </AnimateSharedLayout>
        </>
      )}

      <hr />
      {/* {visitedItems.length > 7 ? (
            <RecentlyVisitedHorizontal visitedItems={visitedItems} />
          ) : (
            <ItemsSlider
              data={phone}
              miniLogo={false}
              isLightTheme={isLightTheme}
              title="Save Big with Phones & Tablets"
            />
          )} */}
    </div>
  );
}
