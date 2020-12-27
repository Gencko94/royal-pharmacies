import React from 'react';
// import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';

import { Helmet } from 'react-helmet';
import CheckoutModal from '../components/Cart/CheckoutModal';
import Layout from '../components/Layout';
import CartContainer from '../components/Cart/CartContainer';
import CartRightSide from '../components/Cart/CartRightSide';
import { AnimatePresence } from 'framer-motion';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import { AuthProvider } from '../contexts/AuthContext';
import GuestCart from '../components/Cart/GuestCart.js/GuestCart';
import CartLoader from '../components/Cart/loaders/CartLoader';
import { useIntl } from 'react-intl';
import StaticSwiper from '../components/Swipers/StaticSwiper';
import { scrollTo } from 'scroll-js';
export default function Cart() {
  const { cartItemsLoading, isGetCartError } = React.useContext(
    CartAndWishlistProvider
  );
  const { userId, authenticationLoading } = React.useContext(AuthProvider);
  const [checkoutModalOpen, setCheckOutModalOpen] = React.useState(false);
  const scrollToTop = () => {
    scrollTo(window, { top: 0 });
  };
  const { formatMessage } = useIntl();

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
        <title>{formatMessage({ id: 'cart' })} | MRG</title>
      </Helmet>

      <div className="px-4 py-2 max-w-default mx-auto">
        <AnimatePresence>
          {checkoutModalOpen && (
            <CheckoutModal setCheckOutModalOpen={setCheckOutModalOpen} />
          )}
        </AnimatePresence>
        {authenticationLoading && <CartLoader />}
        {!authenticationLoading && userId && !isGetCartError && (
          <div className="cart-main-grid">
            <CartContainer />
            <CartRightSide setCheckOutModalOpen={setCheckOutModalOpen} />
          </div>
        )}
        {!authenticationLoading && !userId && (
          <GuestCart setCheckOutModalOpen={setCheckOutModalOpen} />
        )}
        <StaticSwiper title="Perfumes" type="perfumes" cb={scrollToTop} />
      </div>
    </Layout>
  );
}
