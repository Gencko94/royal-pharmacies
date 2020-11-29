import React from 'react';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { DataProvider } from '../contexts/DataContext';
import InView, { useInView } from 'react-intersection-observer';
import RelatedItems from '../components/SingleProduct/RelatedItems';
import { Helmet } from 'react-helmet';
import { useLazyLoadFetch } from '../hooks/useLazyLoadFetch';
import LayoutMobile from '../components/LayoutMobile';
import ImageZoomMobile from '../components/SingleProductMobile/ImageZoomMobile';
import ItemDescription from '../components/SingleProductMobile/ItemDescription';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuMobile';
import FloatingAddToCart from '../components/SingleProductMobile/FloatingAddToCart';
import { queryCache, useMutation, useQuery } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import SingleProductMobileLoader from '../components/SingleProductMobile/SingleProductMobileLoader';
import AdditionalDetailsMobile from '../components/SingleProductMobile/AdditionalDetailsMobile';
import { addToWishlist, getSingleItem } from '../Queries/Queries';
import { useParams } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { useIntl } from 'react-intl';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';

export default function SingleProductMobile() {
  const { id } = useParams();
  const {
    deliveryCountry,

    allItems,
    addViewedItems,
  } = React.useContext(DataProvider);
  const { locale } = useIntl();
  const { userId } = React.useContext(AuthProvider);
  const {
    addToCartMutation,
    removeFromCartMutation,
    removeFromWishListMutation,
    addToWishListMutation,
  } = React.useContext(CartAndWishlistProvider);
  const [itemInCart, setItemInCart] = React.useState(false);
  const [itemInWishList, setItemInWishList] = React.useState(false);
  const [
    addToWishListButtonLoading,
    setAddToWishListButtonLoading,
  ] = React.useState(false);
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [isFetching, setFetching] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [relatedData, hasMore] = useLazyLoadFetch(allItems, page);
  const [related, setRelated] = React.useState(null);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [quantity, setQuantity] = React.useState(1);
  const [size, setSize] = React.useState(null);
  const [color, setColor] = React.useState(null);
  const [detailsTab, setDetailsTab] = React.useState(0);

  const [triggerRef, inView] = useInView();

  /**
   * Main Fetch
   */
  const { data, isLoading } = useQuery(
    ['singleProduct', id],
    async (key, id) => {
      const res = await getSingleItem(id);
      return res;
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: async () => {
        // add Item to localStorage
        return await addViewedItems(id);
      },
    }
  );
  /**
   * Add Mutation
   */

  /**
   * Remove Mutation
   */

  const handleAddToWishList = async () => {
    setAddToWishListButtonLoading(true);
    try {
      await addToWishListMutation({ id: data.id, userId });
      setAddToWishListButtonLoading(false);
      setItemInWishList(true);
    } catch (error) {
      setAddToWishListButtonLoading(false);
      console.log(error.response);
    }
  };
  const handleRemoveFromWishList = async id => {
    setAddToWishListButtonLoading(true);
    try {
      await removeFromWishListMutation(id, userId);
      setAddToWishListButtonLoading(false);
      setItemInWishList(true);
    } catch (error) {
      setAddToWishListButtonLoading(false);
      console.log(error.response);
    }
  };
  const handleSubstractQuantity = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };
  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleLoadMore = inView => {
    if (inView) {
      if (hasMore) {
        setFetching(true);
        setPage(page + 1);
      }
    }
  };
  const fetchData = () => {
    setTimeout(() => {
      setRelated(relatedData);

      setFetching(false);
    }, 2000);
  };

  const handleAddToCart = async () => {
    setAddToCartButtonLoading(true);
    try {
      const newItem = { id: data.id, quantity: quantity, size, color };
      console.log(userId);
      await addToCartMutation({ newItem, userId });
      setAddToCartButtonLoading(false);
      setSideMenuOpen(true);
      setItemInCart(true);
    } catch (error) {
      console.log(error.response);
      console.log(error);
      setAddToCartButtonLoading(false);
    }
  };
  const handleRemoveFromCart = async (id, cart_id) => {
    setAddToCartButtonLoading(true);
    try {
      await removeFromCartMutation({ id, cart_id, userId });
      setAddToCartButtonLoading(false);
      setItemInCart(false);
    } catch (error) {
      setAddToCartButtonLoading(false);
      console.log(error.response);
    }
  };
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <LayoutMobile>
      <Helmet>
        {/* <title>{` Shop ${name.split('-').join(' ')} on MRG`} </title>
        <meta
          name="description"
          content={`${name.split('-').join(' ')} | MRG`}
        /> */}
      </Helmet>
      <div className="overflow-hidden">
        <AnimatePresence>
          {sideMenuOpen && (
            <SideCartMenuMobile
              key={998}
              cartItems={data.cartItems}
              cartTotal={data.cartTotal}
              setSideMenuOpen={setSideMenuOpen}
              handleRemoveFromCart={handleRemoveFromCart}
            />
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

        {isLoading && <SingleProductMobileLoader />}
        {!isLoading && (
          <div className="">
            <ImageZoomMobile
              data={{
                images: [data.image, ...data.gallery],
                name: data.translation[locale].title,
              }}
            />

            <hr />
            <div className="flex flex-col w-full  px-3 py-2 bg-white">
              <ItemDescription
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleAddToWishList={handleAddToWishList}
                handleRemoveFromWishList={handleRemoveFromWishList}
                deliveryCountry={deliveryCountry}
                data={data}
                itemInCart={itemInCart}
                itemInWishList={itemInWishList}
                addToCartButtonLoading={addToCartButtonLoading}
                addToWishListButtonLoading={addToWishListButtonLoading}
                quantity={quantity}
                setQuantity={setQuantity}
                size={size}
                setSize={setSize}
                color={color}
                setColor={setColor}
                reviews={data.reviews}
                rating={data.rating}
                setDetailsTab={setDetailsTab}
                userId={userId}
              />

              <hr />
            </div>
          </div>
        )}
        {/* {!isLoading && (
          <AdditionalDetailsMobile
            data={data}
            detailsTab={detailsTab}
            setDetailsTab={setDetailsTab}
          />
        )} */}

        {/* {!isLoading && (
          <FloatingAddToCart
            handleSubstractQuantity={handleSubstractQuantity}
            quantity={quantity}
            handleAddQuantity={handleAddQuantity}
            handleRemoveFromCart={handleRemoveFromCart}
            handleAddToCart={handleAddToCart}
            id={data.item.id}
            price={data.item.price}
            addToCartButtonLoading={addToCartButtonLoading}
            inView={inView}
            itemInCart={data.itemInCart}
          />
        )} */}

        <hr />
        <div ref={triggerRef}>
          {related && <RelatedItems relatedData={related} />}
          {isFetching && <div>Loading ...</div>}
          <InView
            as="div"
            onChange={(inView, entry) => {
              handleLoadMore(inView);
            }}
          >
            <div></div>
          </InView>
        </div>
      </div>
    </LayoutMobile>
  );
}
