import React from 'react';
// import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';
import { DataProvider } from '../contexts/DataContext';

import ItemsSlider from '../components/Home/ItemsSlider/ItemsSlider';
import { Helmet } from 'react-helmet';
import CheckoutModal from '../components/Cart/CheckoutModal';
import useClickAway from '../hooks/useClickAway';
import Layout from '../components/Layout';
import ErrorSnackbar from '../components/ErrorSnackbar';
import CartContainer from '../components/Cart/CartContainer';
import CartRightSide from '../components/Cart/CartRightSide';
import { AnimatePresence } from 'framer-motion';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import { AuthProvider } from '../contexts/AuthContext';
export default function Cart() {
  const { healthCare, isLightTheme } = React.useContext(DataProvider);
  const {
    cartItems,
    cartItemsLoading,
    isGetCartError,
    getCartError,
    removeFromCartMutation,
    addToWishListMutation,
    removeFromWishListMutation,
  } = React.useContext(CartAndWishlistProvider);
  const { userId } = React.useContext(AuthProvider);

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

  const handleRemoveItemFromCart = async (id, item_id) => {
    setRemoveFromCartButtonLoading(id);
    try {
      await removeFromCartMutation(id, userId, item_id);
      setRemoveFromCartButtonLoading(null);
    } catch (error) {
      setRemoveFromCartButtonLoading(null);
      console.log(error.response);
    }
  };
  const handleRemoveItemFromWishlist = async id => {
    setAddToWishListButtonLoading(id);
    try {
      await removeFromWishListMutation(id, userId);
      setAddToWishListButtonLoading(null);
    } catch (error) {
      setAddToWishListButtonLoading(null);
      console.log(error.response);
    }
  };
  const handleAddItemToWishlist = async item => {
    setAddToWishListButtonLoading(item.id);
    try {
      await addToWishListMutation(item);
      setAddToWishListButtonLoading(null);
    } catch (error) {
      setAddToWishListButtonLoading(null);
      console.log(error.response);
    }
  };
  const closeErrorSnackbar = () => {
    setErrorOpen(false);
  };
  if (isGetCartError) {
    return (
      <Layout>
        <div className="px-4 py-2 max-w-default mx-auto">
          Something Went Wrong,Please try again
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
        <div className="cart-main-grid">
          <CartContainer
            cartItemsLoading={cartItemsLoading}
            handleRemoveItemFromCart={handleRemoveItemFromCart}
            cartItems={cartItems}
            removefromCartButtonLoading={removefromCartButtonLoading}
            handleRemoveItemFromWishlist={handleRemoveItemFromWishlist}
            handleAddItemToWishlist={handleAddItemToWishlist}
            addToWishListButtonLoading={addToWishListButtonLoading}
          />
          <CartRightSide
            cartItems={cartItems}
            cartItemsLoading={cartItemsLoading}
            setCheckOutModalOpen={setCheckOutModalOpen}
          />
        </div>
        <ItemsSlider
          data={healthCare}
          miniLogo={false}
          type="healthCare"
          title="Health Care Essentials"
          isLightTheme={isLightTheme}
        />
        <AnimatePresence>
          {checkoutModalOpen && (
            <CheckoutModal setCheckOutModalOpen={setCheckOutModalOpen} />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
