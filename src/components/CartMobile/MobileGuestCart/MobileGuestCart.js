import React from 'react';
import { useIntl } from 'react-intl';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import Layout from '../../Layout';
import MobileGuestCartContainer from './MobileGuestCartContainer';
import MobileGuestCheckoutSection from './MobileGuestCheckoutSection';

export default function MobileGuestCart({ setCheckOutPopupOpen }) {
  const { formatMessage } = useIntl();
  const {
    guestCartItems,
    guestCartTotal,
    guestCartItemsLoading,
    isGuestGetCartError,
  } = React.useContext(CartAndWishlistProvider);
  if (isGuestGetCartError) {
    return (
      <Layout>
        <div
          className="py-1 mx-2 flex items-center justify-center"
          style={{ minHeight: 'calc(-80px + 100vh)' }}
        >
          <h1>{formatMessage({ id: 'something-went-wrong-snackbar' })}</h1>
        </div>
      </Layout>
    );
  }
  return (
    <>
      <MobileGuestCheckoutSection setCheckOutPopupOpen={setCheckOutPopupOpen} />
      <MobileGuestCartContainer
        cartTotal={guestCartTotal}
        cartItems={guestCartItems}
        cartItemsLoading={guestCartItemsLoading}
      />
    </>
  );
}
