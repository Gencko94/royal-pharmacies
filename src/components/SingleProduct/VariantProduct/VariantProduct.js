import React from 'react';
import { AuthProvider } from '../../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../../contexts/DataContext';
import VariantImageZoom from './VariantImageZoom';
import VariantMiddleSection from './VariantMiddleSection';
import VariantRightSection from './VariantRightSection';

export default function VariantProduct({
  data,
  reviews,
  reviewsLoading,
  setSideMenuOpen,
  setDetailsTab,
}) {
  const {
    addToCartMutation,
    addToWishListMutation,
    addToGuestCartMutation,
    coupon,
  } = React.useContext(CartAndWishlistProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const { userId } = React.useContext(AuthProvider);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [itemInCart, setItemInCart] = React.useState([]);
  const [itemInWishList, setItemInWishList] = React.useState(false);
  const [
    addToWishListButtonLoading,
    setAddToWishListButtonLoading,
  ] = React.useState(false);

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

  const variantOnly = React.useMemo(
    () =>
      data?.new_variation_addons?.[selectedVariation]?.options ? false : true,
    [data, selectedVariation]
  );

  const option = React.useMemo(
    () =>
      variantOnly
        ? data.new_variation_addons[selectedVariation]
        : data.new_variation_addons[selectedVariation]?.options[
            selectedOption[selectedVariation]
          ],
    [data.new_variation_addons, selectedOption, selectedVariation, variantOnly]
  );

  const isSale = React.useMemo(
    () =>
      variantOnly
        ? data.new_variation_addons[selectedVariation]?.promotion_price
          ? true
          : false
        : data.new_variation_addons[selectedVariation]?.options[
            selectedOption[selectedVariation]
          ].promotion_price
        ? true
        : false,
    [data.new_variation_addons, selectedOption, selectedVariation, variantOnly]
  );

  const handleAddToCart = async quantity => {
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
        setItemInCart(prev => [...prev, option.sku]);
      } catch (error) {
        setAddToCartButtonLoading(false);
      }
    } else {
      try {
        const price = isSale ? option.promotion_price : option.price;
        const sku = option.sku;
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
        setItemInCart(prev => [...prev, option.sku]);
      } catch (error) {}
    }
  };
  const handleAddToWishList = async () => {
    setAddToWishListButtonLoading(true);
    try {
      await addToWishListMutation({ id: data.id, userId });
      setAddToWishListButtonLoading(false);
      setItemInWishList(true);
    } catch (error) {
      if (error.response.data.message === 'Item founded on the Wishlist') {
        setItemInWishList(true);
      }
      setAddToWishListButtonLoading(false);
    }
  };

  return (
    <div className="single-product__container-desktop">
      <div>
        <VariantImageZoom
          data={data}
          selectedVariation={selectedVariation}
          selectedOption={selectedOption}
        />
      </div>

      <VariantMiddleSection
        selectedVariation={selectedVariation}
        data={data}
        deliveryCountry={deliveryCountry}
        setSelectedVariant={setSelectedVariant}
        reviewsLoading={reviewsLoading}
        ratingCount={reviews?.ratingCount}
        averageRating={reviews?.averageRating}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setDetailsTab={setDetailsTab}
        isSale={isSale}
        variantOnly={variantOnly}
        option={option}
      />
      <VariantRightSection
        handleAddToCart={handleAddToCart}
        handleAddToWishList={handleAddToWishList}
        addToCartButtonLoading={addToCartButtonLoading}
        addToWishListButtonLoading={addToWishListButtonLoading}
        itemInCart={itemInCart}
        itemInWishList={itemInWishList}
        userId={userId}
        qty={option?.quantity}
        sku={option?.sku}
      />
    </div>
  );
}
