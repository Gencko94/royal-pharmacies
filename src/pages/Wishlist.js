import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import CartLoader from '../components/Cart/loaders/CartLoader';
import Layout from '../components/Layout';
import SideCartMenu from '../components/SingleProduct/SideCartMenu';
import StaticSwiper from '../components/Swipers/StaticSwiper';
import WishlistContainer from '../components/Wishlist/WishlistContainer';
import WishlistRightSide from '../components/Wishlist/WishlistRightSide';
import { AuthProvider } from '../contexts/AuthContext';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';

export default function Wishlist({ userId }) {
  const { formatMessage } = useIntl();
  const [
    removeFromWishListButtonLoading,
    setRemoveFromWishListButtonLoading,
  ] = React.useState(null);
  const [cartMenuOpen, setCartMenu] = React.useState(false);
  const setCartMenuOpen = () => {
    setCartMenu(true);
  };

  const { authenticationLoading } = React.useContext(AuthProvider);

  const {
    wishlistItems,
    wishlistItemsLoading,
    isGetWishlistError,
    removeFromWishListMutation,
  } = React.useContext(CartAndWishlistProvider);

  const handleRemoveItemFromWishList = async id => {
    setRemoveFromWishListButtonLoading(id);
    try {
      await removeFromWishListMutation({ id, userId });
      setRemoveFromWishListButtonLoading(null);
    } catch (error) {
      setRemoveFromWishListButtonLoading(null);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{formatMessage({ id: 'wishlist' })} | MRG</title>
      </Helmet>
      <AnimatePresence>
        {cartMenuOpen && (
          <SideCartMenu key="side-cart" setSideMenuOpen={setCartMenu} />
        )}
        {cartMenuOpen && (
          <motion.div
            key="sidecart-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartMenu(false)}
            className="side__addCart-bg"
          ></motion.div>
        )}
      </AnimatePresence>
      <div className="px-4 py-2 max-w-default mx-auto">
        {authenticationLoading && <CartLoader />}
        {!authenticationLoading && userId && !isGetWishlistError && (
          <div className="wishlist-main-grid">
            <WishlistContainer
              wishlistItemsLoading={wishlistItemsLoading}
              wishlistItems={wishlistItems}
              handleRemoveItemFromWishList={handleRemoveItemFromWishList}
              removeFromWishListButtonLoading={removeFromWishListButtonLoading}
            />
            <WishlistRightSide />
          </div>
        )}
        <hr className="my-4" />
        <StaticSwiper
          type="latest_products"
          title={'New Arrivals'}
          cb={setCartMenuOpen}
        />
      </div>
    </Layout>
  );
}
