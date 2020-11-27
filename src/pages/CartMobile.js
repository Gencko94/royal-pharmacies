import React from 'react';
import { DataProvider } from '../contexts/DataContext';
// import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';
import ItemsSlider from '../components/Home/ItemsSlider/ItemsSlider';
import LayoutMobile from '../components/LayoutMobile';
import { useIntl } from 'react-intl';
import CartItemMobile from '../components/CartMobile/CartItemMobile';
import CheckoutButton from '../components/CartMobile/CheckoutButton';
import CartEmptyMobile from '../components/CartMobile/CartEmptyMobile';
import MainContentLoader from '../components/CartMobile/ContentLoaders/MainContentLoader';
import { queryCache, useMutation, useQuery } from 'react-query';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { getCartItems, removeFromCart } from '../Queries/Queries';
import CheckoutPopupMobile from '../components/CartMobile/CheckoutPopupMobile';
import { AuthProvider } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import MobileCheckoutSection from '../components/CartMobile/MobileCheckoutSection';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';

export default function CartMobile() {
  const { formatMessage, locale } = useIntl();
  const [
    removefromCartButtonLoading,
    setRemoveFromCartButtonLoading,
  ] = React.useState(null);
  const [
    addToWishListButtonLoading,
    setAddToWishListButtonLoading,
  ] = React.useState(null);
  const { isAuthenticated, userId } = React.useContext(AuthProvider);
  const [checkoutPopupOpen, setCheckOutPopupOpen] = React.useState(false);
  const {
    cartItems,
    cartItemsLoading,
    isGetCartError,
    getCartError,
    removeFromCartMutation,
  } = React.useContext(CartAndWishlistProvider);
  const history = useHistory();
  /**
   * Main Fetch
   */

  /**
   * Remove Mutation
   */

  const handleRemoveItemFromCart = async (id, cart_id) => {
    try {
      await removeFromCartMutation(id, userId, cart_id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckout = () => {
    if (!isAuthenticated) {
      setCheckOutPopupOpen(true);
    } else {
      history.push(`/${locale}/checkout`);
    }
  };
  if (isGetCartError) {
    return (
      <LayoutMobile>
        <div
          className="py-1 mx-2 flex items-center justify-center"
          style={{ minHeight: 'calc(-80px + 100vh)' }}
        >
          <h1>{formatMessage({ id: 'something-went-wrong-snackbar' })}</h1>
        </div>
      </LayoutMobile>
    );
  }
  return (
    <LayoutMobile>
      <div className=" py-1 px-2 relative">
        <AnimatePresence>
          {checkoutPopupOpen && (
            <CheckoutPopupMobile setCheckOutPopupOpen={setCheckOutPopupOpen} />
          )}
        </AnimatePresence>
        {/* {!isLoading && data.length !== 0 && (
          <CheckoutButton
            data={data}
            cartTotal="50"
            handleCheckout={handleCheckout}
          />
        )} */}
        {!cartItemsLoading && cartItems.length === 0 && <CartEmptyMobile />}
        <MobileCheckoutSection
          cartItemsLoading={cartItemsLoading}
          cartItems={cartItems}
          handleCheckout={handleCheckout}
        />
        {cartItemsLoading && <MainContentLoader />}
        {!cartItemsLoading && cartItems.length !== 0 && (
          <AnimateSharedLayout>
            <motion.div initial={false} layout className="mb-2">
              <AnimatePresence>
                {cartItems.map(item => (
                  <CartItemMobile
                    key={item.id}
                    item={item}
                    handleRemoveItemFromCart={handleRemoveItemFromCart}
                    removefromCartButtonLoading={removefromCartButtonLoading}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
            <motion.h1 layout className="text-xs my-2 px-2">
              {formatMessage({ id: 'cart-tos' })}
            </motion.h1>
            <motion.hr layout />
          </AnimateSharedLayout>
        )}

        {/* <RecentlyVisitedHorizontal visitedItems={visitedItems} /> */}

        <ItemsSlider
          type="phone"
          miniLogo={false}
          title="Save Big with Phones & Tablets"
        />
      </div>
    </LayoutMobile>
  );
}
