import React from 'react';
import { DataProvider } from '../contexts/DataContext';
import ImageZoom from '../components/SingleProduct/ImageZoom';
import MiddleSection from '../components/SingleProduct/MiddleSection';
import RightSection from '../components/SingleProduct/RightSection';
import { Helmet } from 'react-helmet';
import { Redirect, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import SideCartMenu from '../components/SingleProduct/SideCartMenu';
import { useQuery } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import SingleProductLoader from '../components/SingleProduct/SingleProductLoader';
import AdditionalDetails from '../components/SingleProduct/AdditionalDetails';
import { getProductReviews, getSingleItem } from '../Queries/Queries';
import { AuthProvider } from '../contexts/AuthContext';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import VariantProduct from '../components/SingleProduct/VariantProduct/VariantProduct';
import { useIntl } from 'react-intl';
import MoreFrom from '../components/MoreFrom/MoreFrom';
import { scrollTo } from 'scroll-js';

export default function SingleProduct() {
  const { id } = useParams();

  const { deliveryCountry, addViewedItems, settings } = React.useContext(
    DataProvider
  );
  const { locale, formatMessage } = useIntl();
  const {
    addToCartMutation,
    addToWishListMutation,
    addToGuestCartMutation,
    coupon,
  } = React.useContext(CartAndWishlistProvider);

  const { userId } = React.useContext(AuthProvider);

  /**
   * Main Fetch
   */
  const { data, isLoading, isFetching, error } = useQuery(
    ['singleProduct', id],
    getSingleItem,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {
        // add Item to localStorage
        addViewedItems(id);
      },
      retry: true,
    }
  );
  const { data: reviews, isLoading: reviewsLoading } = useQuery(
    ['product-reviews', id],
    getProductReviews,
    { retry: true, enabled: data, refetchOnWindowFocus: false }
  );

  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [itemInCart, setItemInCart] = React.useState(false);
  const [itemInWishList, setItemInWishList] = React.useState(false);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [detailsTab, setDetailsTab] = React.useState(0);
  const [
    addToWishListButtonLoading,
    setAddToWishListButtonLoading,
  ] = React.useState(false);
  React.useEffect(() => {
    return () => setItemInCart(false);
  }, [id]);
  const handleAddToCart = async quantity => {
    setAddToCartButtonLoading(true);
    if (userId) {
      try {
        const newItem = { id: data.id, quantity };
        await addToCartMutation({ newItem, userId, deliveryCountry, coupon });
        setAddToCartButtonLoading(false);
        setSideMenuOpen(true);
        setItemInCart(true);
      } catch (error) {
        if (error.response.data.message === 'Item founded on the Cart') {
          setItemInCart(true);
        }
        setAddToCartButtonLoading(false);
      }
    } else {
      try {
        const price = data.simple_addons.promotion_price
          ? data.simple_addons.promotion_price
          : data.simple_addons.price;
        const sku = data.simple_addons.sku;
        const newItem = { id: data.id, quantity, price, sku };
        await addToGuestCartMutation({ newItem, deliveryCountry, coupon });
        setAddToCartButtonLoading(false);
        setSideMenuOpen(true);
        setItemInCart(true);
      } catch (error) {
        setAddToCartButtonLoading(false);
      }
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
  if (error) {
    if (error.response.data.message === 'Product not founded') {
      return <Redirect to={`/${locale}/page/404`} />;
    }
  }
  return (
    <Layout>
      <Helmet>
        <title>
          {data
            ? `${formatMessage({ id: 'shop' })} ${
                data?.full_translation?.[locale].title
              }`
            : settings?.store_name_en}
        </title>
        <meta
          name="description"
          content={
            data
              ? `${formatMessage({ id: 'shop' })} ${
                  data?.full_translation?.[locale].title
                }`
              : settings?.store_name_en
          }
        />
        <meta
          property="og:title"
          content={
            data
              ? `${formatMessage({ id: 'shop' })} ${
                  data?.full_translation?.[locale].title
                }`
              : settings?.store_name_en
          }
        />
        <meta
          property="og:description"
          content={
            data
              ? `${formatMessage({ id: 'shop' })} ${
                  data?.full_translation?.[locale].title
                } `
              : settings?.store_name_en
          }
        />
      </Helmet>

      <AnimatePresence>
        {sideMenuOpen && (
          <SideCartMenu key="side-cart" setSideMenuOpen={setSideMenuOpen} />
        )}
        {sideMenuOpen && (
          <motion.div
            key="sidecart-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setSideMenuOpen(false)}
            className="side__addCart-bg"
          ></motion.div>
        )}
      </AnimatePresence>

      <div
        className=" p-4 mx-auto max-w-default"
        style={{ minHeight: 'calc(-150px + 100vh)' }}
      >
        {(isLoading || isFetching) && <SingleProductLoader />}
        {!isLoading &&
          !isFetching &&
          (data?.type === 'variation' &&
          Object.entries(data.new_variation_addons).length > 0 ? (
            <VariantProduct
              data={data}
              reviewsLoading={reviewsLoading}
              reviews={reviews}
              setSideMenuOpen={setSideMenuOpen}
              setDetailsTab={setDetailsTab}
            />
          ) : (
            <div className="single-product__container-desktop">
              <div className=" ">
                <ImageZoom data={data} />
              </div>

              <MiddleSection
                data={data}
                reviewsLoading={reviewsLoading}
                ratingCount={reviews?.ratingCount}
                averageRating={reviews?.averageRating}
                setDetailsTab={setDetailsTab}
              />
              <RightSection
                handleAddToCart={handleAddToCart}
                handleAddToWishList={handleAddToWishList}
                addToCartButtonLoading={addToCartButtonLoading}
                addToWishListButtonLoading={addToWishListButtonLoading}
                itemInCart={itemInCart}
                itemInWishList={itemInWishList}
                userId={userId}
                qty={data.simple_addons.quantity}
              />
            </div>
          ))}
        <div id="details" className="py-2 mb-2">
          {!isLoading && !isFetching && (
            <AdditionalDetails
              reviews={reviews?.reviews}
              averageRating={reviews?.averageRating}
              reviewsLoading={reviewsLoading}
              ratingCount={reviews?.ratingCount}
              detailsTab={detailsTab}
              setDetailsTab={setDetailsTab}
              data={data}
            />
          )}
        </div>
        <hr className="my-8" />
        {!isLoading &&
          (data?.categories[0]?.parent_slug || data?.categories[0]?.slug) && (
            <MoreFrom
              categories={data?.categories}
              setSideMenuOpen={setSideMenuOpen}
            />
          )}
      </div>
      <div className="flex items-center justify-center mt-8 mb-4">
        <button
          onClick={() => scrollTo(window, { top: 0, behavior: 'smooth' })}
          className="p-2 uppercase bg-main-color rounded text-main-text"
        >
          {formatMessage({ id: 'back-to-top' })}
        </button>
      </div>
    </Layout>
  );
}
