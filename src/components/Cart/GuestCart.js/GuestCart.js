import React from 'react';
// import { Helmet } from 'react-helmet';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
// import ErrorSnackbar from '../../ErrorSnackbar';
// import Layout from '../../Layout';
import GuestCartContainer from './GuestCartContainer';
import GuestCartRightSide from './GuestCartRightSide';

export default function GuestCart({ setCheckOutModalOpen }) {
  const {
    guestCartItems,
    guestCartTotal,
    guestCartItemsLoading,
  } = React.useContext(CartAndWishlistProvider);
  return (
    <div className="cart-main-grid">
      <GuestCartContainer
        cartItemsLoading={guestCartItemsLoading}
        cartItems={guestCartItems}
        cartTotal={guestCartTotal}
      />
      <GuestCartRightSide setCheckOutModalOpen={setCheckOutModalOpen} />
    </div>
  );
}
