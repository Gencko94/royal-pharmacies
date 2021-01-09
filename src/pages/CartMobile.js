import React from 'react';
import { useIntl } from 'react-intl';
import { AnimatePresence } from 'framer-motion';
import CheckoutPopupMobile from '../components/CartMobile/CheckoutPopupMobile';
import { AuthProvider } from '../contexts/AuthContext';

import MobileCheckoutSection from '../components/CartMobile/MobileCheckoutSection';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import MobileCartLoader from '../components/CartMobile/ContentLoaders/MobileCartLoader';
import MobileCartContainer from '../components/CartMobile/MobileCartContainer';
import MobileGuestCart from '../components/CartMobile/MobileGuestCart/MobileGuestCart';
import StaticSwiper from '../components/Swipers/StaticSwiper';
import Layout from '../components/Layout';
import CartEmptyMobile from '../components/CartMobile/CartEmptyMobile';
import { scrollTo } from 'scroll-js';

export default function CartMobile() {
  const { formatMessage } = useIntl();
  const { userId, authenticationLoading } = React.useContext(AuthProvider);
  const [checkoutPopupOpen, setCheckOutPopupOpen] = React.useState(false);
  const {
    cartItems,
    cartMessage,
    cartItemsLoading,
    isGetCartError,
  } = React.useContext(CartAndWishlistProvider);
  const scrollToTop = () => {
    scrollTo(window, { top: 0 });
  };
  if (isGetCartError) {
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
    <Layout>
      <div className="py-1 px-2 relative text-body-text-light">
        <AnimatePresence>
          {checkoutPopupOpen && (
            <CheckoutPopupMobile setCheckOutPopupOpen={setCheckOutPopupOpen} />
          )}
        </AnimatePresence>

        {authenticationLoading && <MobileCartLoader />}
        <AnimatePresence>
          {!authenticationLoading &&
            userId &&
            !cartItemsLoading &&
            !isGetCartError &&
            cartItems.length === 0 && <CartEmptyMobile />}
        </AnimatePresence>
        {!authenticationLoading &&
          userId &&
          !isGetCartError &&
          cartItems?.length !== 0 && (
            <>
              <MobileCheckoutSection />
              <MobileCartContainer
                cartItems={cartItems}
                cartItemsLoading={cartItemsLoading}
                cartMessage={cartMessage}
              />
            </>
          )}
        {!authenticationLoading && !userId && (
          <MobileGuestCart setCheckOutPopupOpen={setCheckOutPopupOpen} />
        )}

        <StaticSwiper type="perfumes" title="Perfumes" cb={scrollToTop} />
      </div>
    </Layout>
  );
}
