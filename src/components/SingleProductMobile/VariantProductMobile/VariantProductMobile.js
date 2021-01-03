import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { AuthProvider } from '../../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../../contexts/DataContext';
import VariantFloatingAddToCart from '../VariantFloatingAddToCart';
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
    addToGuestCartMutation,
    addToWishListMutation,
    coupon,
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

  const handleAddToCart = async (quantity, sku, price) => {
    setAddToCartButtonLoading(true);
    if (userId) {
      try {
        const newItem = {
          id: data.id,
          quantity,
          variation: {
            id: data.new_variation_addons?.[selectedVariation].id,
            item_id:
              data.new_variation_addons?.[selectedVariation].addon_item_id,
          },
          option: {
            id:
              data.new_variation_addons?.[selectedVariation].options?.[
                selectedOption[selectedVariation]
              ].id,
            item_id:
              data.new_variation_addons?.[selectedVariation].options?.[
                selectedOption[selectedVariation]
              ].addon_item_id,
          },
        };
        await addToCartMutation({ newItem, userId, deliveryCountry, coupon });
        setAddToCartButtonLoading(false);
        setSideMenuOpen(true);
        setItemInCart(true);
      } catch (error) {
        // console.clear();

        console.log(error.response);

        setAddToCartButtonLoading(false);
      }
    } else {
      try {
        const newItem = {
          id: data.id,
          quantity,
          variation: {
            id: data.new_variation_addons?.[selectedVariation].id,
            item_id:
              data.new_variation_addons?.[selectedVariation].addon_item_id,
          },
          option: {
            id:
              data.new_variation_addons?.[selectedVariation].options?.[
                selectedOption[selectedVariation]
              ].id,
            item_id:
              data.new_variation_addons?.[selectedVariation].options?.[
                selectedOption[selectedVariation]
              ].addon_item_id,
          },
          price,
          sku,
        };

        await addToGuestCartMutation({ newItem, deliveryCountry, coupon });
        setAddToCartButtonLoading(false);
        setSideMenuOpen(true);
        setItemInCart(true);
      } catch (error) {
        console.log(error.response);
      }
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
          <VariantFloatingAddToCart
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
