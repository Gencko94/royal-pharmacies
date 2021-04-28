import React from 'react';

import { DataProvider } from '../contexts/DataContext';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet';
import ImageZoomMobile from '../components/SingleProductMobile/ImageZoomMobile';
import ItemDescription from '../components/SingleProductMobile/ItemDescription';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuMobile';
import FloatingAddToCart from '../components/SingleProductMobile/FloatingAddToCart';
import { useQuery } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import SingleProductMobileLoader from '../components/SingleProductMobile/SingleProductMobileLoader';
import AdditionalDetailsMobile from '../components/SingleProductMobile/AdditionalDetailsMobile';
import { getProductReviews, getSingleItem } from '../Queries/Queries';
import { Redirect, useParams } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import Layout from '../components/Layout';
import VariantProductMobile from '../components/SingleProductMobile/VariantProductMobile/VariantProductMobile';
import MoreFrom from '../components/MoreFrom/MoreFrom';
import { useIntl } from 'react-intl';

export default function SingleProductMobile() {
  const { id } = useParams();
  const { addViewedItems, deliveryCountry } = React.useContext(DataProvider);
  const { locale, formatMessage } = useIntl();
  const { userId } = React.useContext(AuthProvider);
  const {
    addToCartMutation,
    addToGuestCartMutation,
    coupon,
  } = React.useContext(CartAndWishlistProvider);
  const [itemInCart, setItemInCart] = React.useState(false);

  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);

  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [quantity, setQuantity] = React.useState(1);

  const [detailsTab, setDetailsTab] = React.useState(0);

  const [triggerRef, inView] = useInView();

  /**
   * Main Fetch
   */
  const { data, isLoading, error, isFetching } = useQuery(
    ['singleProduct', id],
    getSingleItem,
    {
      refetchOnWindowFocus: false,
      retry: true,
      onSuccess: async () => {
        // add Item to localStorage
        return await addViewedItems(id);
      },
    }
  );
  const { data: reviewsData, isLoading: reviewsLoading } = useQuery(
    ['product-reviews', id],
    getProductReviews,
    { retry: true, enabled: data }
  );
  React.useEffect(() => {
    return () => setItemInCart(false);
  }, [id]);
  const handleAddToCart = async () => {
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
              } ${formatMessage({ id: 'on-mrg-mall-kuwait' })}`
            : 'MRG Mall Kuwait Online Shop |  متجر إم آر جي الإلكتروني الكويت'}
        </title>
        <meta
          name="description"
          content={
            data
              ? `${formatMessage({ id: 'shop' })} ${
                  data?.full_translation?.[locale].title
                } ${formatMessage({ id: 'on-mrg-mall-kuwait' })}`
              : 'MRG Mall Kuwait Online Shop | متجر إم آر جي الإلكتروني الكويت'
          }
        />
        <meta
          property="og:title"
          content={
            data
              ? `${formatMessage({ id: 'shop' })} ${
                  data?.full_translation?.[locale].title
                } ${formatMessage({ id: 'on-mrg-mall-kuwait' })}`
              : 'MRG Mall Kuwait Online Shop | متجر إم آر جي الإلكتروني الكويت'
          }
        />
        <meta
          property="og:description"
          content={
            data
              ? `${formatMessage({ id: 'shop' })} ${
                  data?.full_translation?.[locale].title
                } ${formatMessage({ id: 'on-mrg-mall-kuwait' })}`
              : 'MRG Mall Kuwait Online Shop | متجر إم آر جي الإلكتروني الكويت'
          }
        />
      </Helmet>
      <div className="overflow-hidden">
        <AnimatePresence>
          {sideMenuOpen && (
            <SideCartMenuMobile key={998} setSideMenuOpen={setSideMenuOpen} />
          )}
          {sideMenuOpen && (
            <motion.div
              key={369}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSideMenuOpen(false)}
              className="side__addCart-bg"
            ></motion.div>
          )}
        </AnimatePresence>

        {(isLoading || isFetching) && <SingleProductMobileLoader />}
        {!isLoading &&
          !isFetching &&
          (data.type === 'variation' &&
          Object.entries(data.new_variation_addons).length > 0 ? (
            <VariantProductMobile
              data={data}
              quantity={quantity}
              setQuantity={setQuantity}
              reviews={reviewsData}
              reviewsLoading={reviewsLoading}
              setSideMenuOpen={setSideMenuOpen}
              setDetailsTab={setDetailsTab}
              inView={inView}
            />
          ) : (
            <div>
              <ImageZoomMobile data={data} />

              <hr />
              <div className="flex flex-col w-full  px-3 py-2 bg-white">
                <ItemDescription
                  handleAddToCart={handleAddToCart}
                  data={data}
                  itemInCart={itemInCart}
                  addToCartButtonLoading={addToCartButtonLoading}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  reviewsLoading={reviewsLoading}
                  ratingCount={reviewsData?.ratingCount}
                  averageRating={reviewsData?.averageRating}
                  setDetailsTab={setDetailsTab}
                  userId={userId}
                />

                <hr />
              </div>
            </div>
          ))}
        {!isLoading && !isFetching && (
          <AdditionalDetailsMobile
            data={data}
            detailsTab={detailsTab}
            setDetailsTab={setDetailsTab}
            reviews={reviewsData?.reviews}
            reviewsLoading={reviewsLoading}
            ratingCount={reviewsData?.ratingCount}
            averageRating={reviewsData?.averageRating}
          />
        )}
        <br ref={triggerRef} />
        <AnimatePresence>
          {inView &&
            !itemInCart &&
            !isLoading &&
            !isFetching &&
            data.type === 'simple' && (
              <FloatingAddToCart
                quantity={quantity}
                setQuantity={setQuantity}
                handleAddToCart={handleAddToCart}
                id={data.id}
                addToCartButtonLoading={addToCartButtonLoading}
                itemInCart={itemInCart}
                price={data.simple_addons.price}
                qty={data.simple_addons.quantity}
              />
            )}
        </AnimatePresence>

        <hr />
        {!isLoading &&
          !isFetching &&
          (data?.categories[0]?.parent_slug || data?.categories[0]?.slug) && (
            <div className="px-3">
              <MoreFrom
                categories={data?.categories}
                setSideMenuOpen={setSideMenuOpen}
              />
            </div>
          )}
      </div>
    </Layout>
  );
}
