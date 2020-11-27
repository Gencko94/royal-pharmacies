import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import WishlistContainer from '../components/Wishlist/WishlistContainer';
import WishlistRightSide from '../components/Wishlist/WishlistRightSide';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';

export default function Wishlist({ userId }) {
  const [
    removeFromWishListButtonLoading,
    setRemoveFromWishListButtonLoading,
  ] = React.useState(null);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    null
  );
  const {
    wishlistItems,
    wishlistItemsLoading,
    isGetWishlistError,
    getWishlistError,
    removeFromWishListMutation,
    addToCartMutation,
    removeFromCartMutation,
  } = React.useContext(CartAndWishlistProvider);

  const handleRemoveItemFromWishList = async id => {
    setRemoveFromWishListButtonLoading(id);
    try {
      await removeFromWishListMutation(id, userId);
      setRemoveFromWishListButtonLoading(null);
    } catch (error) {
      setRemoveFromWishListButtonLoading(null);
      console.log(error.response);
    }
  };
  const handleAddToCart = async item => {
    setAddToCartButtonLoading(item.id);
    try {
      await addToCartMutation(item, userId);
      setAddToCartButtonLoading(null);
    } catch (error) {
      setAddToCartButtonLoading(null);
      console.log(error.response);
    }
  };
  const handleRemoveFromCart = async id => {
    setAddToCartButtonLoading(id);
    try {
      await removeFromCartMutation(id, userId);
      setAddToCartButtonLoading(null);
    } catch (error) {
      setAddToCartButtonLoading(null);
      console.log(error.response);
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>Wishlist | MRG</title>
      </Helmet>
      <div className="px-4 py-2 max-w-default mx-auto">
        <div className="wishlist-main-grid">
          <WishlistContainer
            wishlistItemsLoading={wishlistItemsLoading}
            wishlistItems={wishlistItems}
            handleRemoveItemFromWishList={handleRemoveItemFromWishList}
            removeFromWishListButtonLoading={removeFromWishListButtonLoading}
            addToCartButtonLoading={addToCartButtonLoading}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
          <WishlistRightSide
            wishlistItems={wishlistItems}
            wishlistItemsLoading={wishlistItemsLoading}
          />
        </div>
      </div>
    </Layout>
  );
}
