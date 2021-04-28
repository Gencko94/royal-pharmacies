import React from 'react';
import MainContentLoader from '../components/CartMobile/ContentLoaders/MainContentLoader';
import { useIntl } from 'react-intl';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import MobileCartLoader from '../components/CartMobile/ContentLoaders/MobileCartLoader';
import { AuthProvider } from '../contexts/AuthContext';
import WishlistMobileContainer from '../components/WishlistMobile/WishlistMobileContainer';
import Layout from '../components/Layout';
import { AnimatePresence, motion } from 'framer-motion';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuMobile';
export default function WishlistMobile({ userId }) {
  const { formatMessage } = useIntl();
  const [
    removeFromWishListButtonLoading,
    setRemoveFromWishListButtonLoading,
  ] = React.useState(null);

  const {
    wishlistItems,
    wishlistItemsLoading,
    isGetWishlistError,
    removeFromWishListMutation,
  } = React.useContext(CartAndWishlistProvider);
  const { authenticationLoading } = React.useContext(AuthProvider);
  const [cartMenuOpen, setCartMenu] = React.useState(false);

  const handleRemoveItemFromWishList = async id => {
    setRemoveFromWishListButtonLoading(id);
    try {
      await removeFromWishListMutation({ id, userId });
      setRemoveFromWishListButtonLoading(null);
    } catch (error) {
      setRemoveFromWishListButtonLoading(null);
    }
  };

  if (isGetWishlistError) {
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
      <AnimatePresence>
        {cartMenuOpen && (
          <SideCartMenuMobile key="side-cart" setSideMenuOpen={setCartMenu} />
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
      <div className=" py-1 px-2" style={{ minHeight: 'calc(-120px + 100vh)' }}>
        {authenticationLoading && <MobileCartLoader />}
        {wishlistItemsLoading && <MainContentLoader />}

        {!wishlistItemsLoading && !isGetWishlistError && (
          <WishlistMobileContainer
            handleRemoveItemFromWishList={handleRemoveItemFromWishList}
            removeFromWishListButtonLoading={removeFromWishListButtonLoading}
            wishlistItems={wishlistItems}
            wishlistItemsLoading={wishlistItemsLoading}
          />
        )}
      </div>
    </Layout>
  );
}
