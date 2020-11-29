import React from 'react';
// import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';

import ItemsSlider from '../components/Home/ItemsSlider/ItemsSlider';
import { Helmet } from 'react-helmet';
import CheckoutModal from '../components/Cart/CheckoutModal';
import Layout from '../components/Layout';
import ErrorSnackbar from '../components/ErrorSnackbar';
import CartContainer from '../components/Cart/CartContainer';
import CartRightSide from '../components/Cart/CartRightSide';
import { AnimatePresence } from 'framer-motion';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import { AuthProvider } from '../contexts/AuthContext';
import GuestCart from '../components/Cart/GuestCart.js/GuestCart';
import CartLoader from '../components/Cart/loaders/CartLoader';
import { useIntl } from 'react-intl';
export default function Cart() {
  const {
    cartItems,
    cartTotal,
    cartItemsLoading,
    isGetCartError,
    removeFromCartMutation,
    addToWishListMutation,
    removeFromWishListMutation,
  } = React.useContext(CartAndWishlistProvider);
  const { userId, authenticationLoading } = React.useContext(AuthProvider);
  const [checkoutModalOpen, setCheckOutModalOpen] = React.useState(false);
  const [
    removefromCartButtonLoading,
    setRemoveFromCartButtonLoading,
  ] = React.useState(null);
  const [
    addToWishListButtonLoading,
    setAddToWishListButtonLoading,
  ] = React.useState(null);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [wishlistItems, setWishlistItems] = React.useState([]);
  const { formatMessage } = useIntl();
  const handleRemoveItemFromCart = async (id, cart_id) => {
    console.log(cart_id);
    setRemoveFromCartButtonLoading(id);
    try {
      await removeFromCartMutation({ id, userId, cart_id });
      setRemoveFromCartButtonLoading(null);
    } catch (error) {
      setRemoveFromCartButtonLoading(null);
      console.log(error.response);
    }
  };
  const handleRemoveItemFromWishlist = async id => {
    setAddToWishListButtonLoading(id);
    try {
      await removeFromWishListMutation({ id, userId });
      setAddToWishListButtonLoading(null);
      console.log(id);
      console.log(wishlistItems.filter(item => item.id !== id));
      setWishlistItems(prev => {
        return prev.filter(item => item !== id);
      });
    } catch (error) {
      setAddToWishListButtonLoading(null);
      console.log(error.response);
    }
  };
  const handleAddItemToWishlist = async item => {
    setAddToWishListButtonLoading(item.id);
    try {
      await addToWishListMutation({ id: item.id, userId });
      setAddToWishListButtonLoading(null);
      setWishlistItems(prev => {
        return [...prev, item.id];
      });
    } catch (error) {
      setAddToWishListButtonLoading(null);
      console.log(error.response);
    }
  };
  const closeErrorSnackbar = () => {
    setErrorOpen(false);
  };

  if (!cartItemsLoading && isGetCartError) {
    return (
      <Layout>
        <div className="px-4 py-2 max-w-default mx-auto min-h-screen">
          <h1>{formatMessage({ id: 'something-went-wrong-snackbar' })}</h1>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Helmet>
        <title>Cart | MRG</title>
      </Helmet>
      {errorOpen && (
        <ErrorSnackbar
          message={errorMessage}
          closeFunction={closeErrorSnackbar}
        />
      )}
      <div className="px-4 py-2 max-w-default mx-auto">
        {authenticationLoading && <CartLoader />}
        {!authenticationLoading && userId && !isGetCartError && (
          <div className="cart-main-grid">
            <CartContainer
              cartItemsLoading={cartItemsLoading}
              handleRemoveItemFromCart={handleRemoveItemFromCart}
              cartItems={cartItems}
              removefromCartButtonLoading={removefromCartButtonLoading}
              handleRemoveItemFromWishlist={handleRemoveItemFromWishlist}
              handleAddItemToWishlist={handleAddItemToWishlist}
              addToWishListButtonLoading={addToWishListButtonLoading}
              cartTotal={cartTotal}
              wishlistItems={wishlistItems}
            />
            <CartRightSide
              cartTotal={cartTotal}
              cartItems={cartItems}
              cartItemsLoading={cartItemsLoading}
              setCheckOutModalOpen={setCheckOutModalOpen}
            />
          </div>
        )}
        {!authenticationLoading && !userId && <GuestCart />}
        {/* <ItemsSlider
          data={healthCare}
          miniLogo={false}
          type="healthCare"
          title="Health Care Essentials"
          isLightTheme={isLightTheme}
        /> */}
        <AnimatePresence>
          {checkoutModalOpen && (
            <CheckoutModal setCheckOutModalOpen={setCheckOutModalOpen} />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
