import React from 'react';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { DataProvider } from '../contexts/DataContext';
import Breadcrumbs from '../components/SingleProduct/Breadcrumbs';
import ImageZoom from '../components/SingleProduct/ImageZoom';
import MiddleSection from '../components/SingleProduct/MiddleSection';
import RightSection from '../components/SingleProduct/RightSection';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
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

export default function SingleProduct() {
  const { id } = useParams();
  const { deliveryCountry, addViewedItems } = React.useContext(DataProvider);
  const {
    addToCartMutation,
    addToWishListMutation,
    addToGuestCartMutation,
  } = React.useContext(CartAndWishlistProvider);

  const { userId } = React.useContext(AuthProvider);
  const [selectedVariation, setSelectedVariant] = React.useState(0);
  const [selectedSize, setSelectedSize] = React.useState(0);

  /**
   * Main Fetch
   */
  const { data, isLoading } = useQuery(['singleProduct', id], getSingleItem, {
    refetchOnWindowFocus: false,
    onSuccess: () => {
      // add Item to localStorage
      addViewedItems(id);
    },
    retry: true,
  });
  const { data: reviews, isLoading: reviewsLoading } = useQuery(
    ['product-reviews', id],
    getProductReviews,
    { retry: true, enabled: data, refetchOnWindowFocus: false }
  );
  // const [quantity, setQuantity] = React.useState(quantityOptions[0]);

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

  const handleAddToCart = async quantity => {
    setAddToCartButtonLoading(true);
    if (userId) {
      try {
        const newItem = { id: data.id, quantity };
        await addToCartMutation({ newItem, userId, deliveryCountry });
        setAddToCartButtonLoading(false);
        setSideMenuOpen(true);
        setItemInCart(true);
      } catch (error) {
        // console.clear();

        console.log(error.response);
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
        await addToGuestCartMutation({ newItem, deliveryCountry });
        setAddToCartButtonLoading(false);
        setSideMenuOpen(true);
        setItemInCart(true);
      } catch (error) {
        console.log(error.response);
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
      console.clear();
      if (error.response.data.message === 'Item founded on the Wishlist') {
        setItemInWishList(true);
      }
      setAddToWishListButtonLoading(false);
      console.log(error.response);
    }
  };
  return (
    <Layout>
      <Helmet>
        {/* <title>{` Shop ${name.split('-').join(' ')} on MRG`} </title>
        <meta
          name="description"
          content={`Shop  ${name.split('-').join(' ')} | MRG`}
        /> */}
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

      <div className=" px-4 ">
        <div className="mx-auto max-w-default">
          {!isLoading && <Breadcrumbs data={data.categories} />}
          {isLoading && <SingleProductLoader />}
          {!isLoading &&
            (data.type === 'simple' ? (
              <div className="single-product__container-desktop">
                <div className=" ">
                  <ImageZoom
                    data={data}
                    selectedVariation={selectedVariation}
                  />
                </div>

                <MiddleSection
                  selectedVariation={selectedVariation}
                  data={data}
                  deliveryCountry={deliveryCountry}
                  setSelectedVariant={setSelectedVariant}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
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
                />
              </div>
            ) : (
              <VariantProduct
                data={data}
                reviewsLoading={reviewsLoading}
                reviews={reviews}
                setSideMenuOpen={setSideMenuOpen}
                setDetailsTab={setDetailsTab}
              />
            ))}
          <div id="details" className="py-2 mb-2">
            {!isLoading && (
              <AdditionalDetails
                reviews={reviews?.reviews}
                averageRating={reviews?.averageRating}
                reviewsLoading={reviewsLoading}
                ratingCount={reviews?.ratingCount}
                detailsTab={detailsTab}
                setDetailsTab={setDetailsTab}
              />
            )}
          </div>
          {/* {related && <RelatedItems relatedData={related} />}
          {isFetching && <div>Loading ...</div>}
          <InView
            as="div"
            onChange={(inView, entry) => {
              handleLoadMore(inView);
            }}
          >
            <div></div>
          </InView> */}
        </div>
      </div>
    </Layout>
  );
}
