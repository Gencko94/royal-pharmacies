import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { AuthProvider } from '../../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../../contexts/DataContext';
import FloatingAddToCart from '../FloatingAddToCart';
import VariantImageZoomMobile from './VariantImageZoomMobile';
import VariantItemDescription from './VariantItemDescription';

export default function VariantProductMobile({
  data,
  setQuantity,
  quantity,
  reviews,
  reviewsLoading,
  setSideMenuOpen,
  setDetailsTab,
  inView,
}) {
  const {
    addToCartMutation,
    removeFromWishListMutation,
    addToWishListMutation,
  } = React.useContext(CartAndWishlistProvider);
  const { userId } = React.useContext(AuthProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const [itemInCart, setItemInCart] = React.useState(false);
  const [itemInWishList, setItemInWishList] = React.useState(false);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [selectedVariation, setSelectedVariant] = React.useState(() => {
    return Object.keys(data.new_variation_addons)[0];
  });
  const [selectedOption, setSelectedOption] = React.useState(() => {
    let keys = {};
    Object.keys(data.new_variation_addons).forEach(variation => {
      keys[variation] = 0;
    });
    return keys;
  });
  const handleAddToWishList = async () => {
    try {
      await addToWishListMutation({ id: data.id, userId });
      setItemInWishList(true);
    } catch (error) {
      console.clear();
      setItemInWishList(true);
      console.log(error.response);
    }
  };
  const handleRemoveFromWishList = async id => {
    try {
      await removeFromWishListMutation({ id, userId });
      setItemInWishList(false);
    } catch (error) {
      console.clear();
      console.log(error.response);
    }
  };

  const handleAddToCart = async quantity => {
    setAddToCartButtonLoading(true);
    try {
      const newItem = { id: data.id, quantity: quantity };
      await addToCartMutation({ newItem, userId, deliveryCountry });
      setAddToCartButtonLoading(false);
      setSideMenuOpen(true);
      setItemInCart(true);
    } catch (error) {
      console.clear();

      if (error.response.data.message === 'Item founded on the Cart') {
        setItemInCart(true);
      }
      console.log(error.response);
      setAddToCartButtonLoading(false);
    }
  };

  return (
    <>
      <div className="">
        <VariantImageZoomMobile
          data={data}
          selectedVariation={selectedVariation}
          selectedOption={selectedOption}
        />

        <hr />
        <div className="flex flex-col w-full  px-3 py-2 bg-white">
          <VariantItemDescription
            handleAddToCart={handleAddToCart}
            handleAddToWishList={handleAddToWishList}
            data={data}
            itemInCart={itemInCart}
            itemInWishList={itemInWishList}
            addToCartButtonLoading={addToCartButtonLoading}
            quantity={quantity}
            setQuantity={setQuantity}
            reviewsLoading={reviewsLoading}
            ratingCount={reviews?.ratingCount}
            averageRating={reviews?.averageRating}
            setDetailsTab={setDetailsTab}
            userId={userId}
            handleRemoveFromWishList={handleRemoveFromWishList}
            selectedVariation={selectedVariation}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            setSelectedVariant={setSelectedVariant}
          />

          <hr />
        </div>
      </div>
      <AnimatePresence>
        {inView && !itemInCart && (
          <FloatingAddToCart
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
            data={data}
            addToCartButtonLoading={addToCartButtonLoading}
            itemInCart={itemInCart}
            selectedOption={selectedOption}
            selectedVariation={selectedVariation}
          />
        )}
      </AnimatePresence>
    </>
  );
}
