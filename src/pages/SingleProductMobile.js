import React from 'react';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { DataProvider } from '../contexts/DataContext';
import InView, { useInView } from 'react-intersection-observer';
import RelatedItems from '../components/SingleProduct/RelatedItems';
import { Helmet } from 'react-helmet';
import ContentLoader from 'react-content-loader';
import { useLazyLoadFetch } from '../hooks/useLazyLoadFetch';
import LayoutMobile from '../components/LayoutMobile';
import ImageZoomMobile from '../components/SingleProductMobile/ImageZoomMobile';
import ItemDescription from '../components/SingleProductMobile/ItemDescription';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuMobile';
import FloatingAddToCart from '../components/SingleProductMobile/FloatingAddToCart';
import { queryCache, useMutation, useQuery } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';

export default function SingleProductMobile({
  match: {
    params: { id, name },
  },
}) {
  const {
    addItemToCart,

    removeItemFromCart,
    deliveryCountry,
    getSingleItemDetails,
    allItems,
  } = React.useContext(DataProvider);

  /**
   * Main Fetch
   */
  const { data, isLoading } = useQuery(
    ['singleProductMobile', id],
    async (key, id) => {
      const res = await getSingleItemDetails(id);
      return res;
    },
    { refetchOnWindowFocus: false }
  );

  /**
   * Add Mutation
   */

  const [addMutation] = useMutation(
    async item => {
      setAddToCartButtonLoading(true);
      const res = await addItemToCart(item);
      return res;
    },
    {
      onSuccess: data => {
        queryCache.setQueryData(['singleProductMobile', id], prev => {
          console.log(data.cartTotal);
          return {
            ...prev,
            cartItems: data.cartItems,
            cartTotal: data.cartTotal,
            itemInCart: true,
          };
        });
        setAddToCartButtonLoading(false);
        setSideMenuOpen(true);
      },
    }
  );

  /**
   * Remove Mutation
   */

  const [removeMutation] = useMutation(
    async id => {
      setAddToCartButtonLoading(true);
      const res = await removeItemFromCart(id);
      return res;
    },
    {
      onSuccess: data => {
        queryCache.setQueryData(['singleProductMobile', id], prev => {
          return {
            ...prev,
            cartItems: data.cartItems,
            cartTotal: data.cartTotal,
            itemInCart: false,
          };
        });
        setAddToCartButtonLoading(false);
      },
    }
  );

  const items = allItems.filter(item => item.id === id);

  const [detailsTab, setDetailsTab] = React.useState(0);
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

  const [triggerRef, inView] = useInView();

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

  const handleAddToCart = async ({ id, quantity }) => {
    try {
      await addMutation({
        id,
        quantity: quantity.value,
        price: data.item.price,
        name: data.item.name,
        photo: data.item.photos.small,
        category: data.item.category,
        color,
        size,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveFromCart = async id => {
    try {
      await removeMutation(id);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <LayoutMobile>
      <Helmet>
        <title>{` Shop ${name.split('-').join(' ')} on MRG`} </title>
        <meta
          name="description"
          content={`${name.split('-').join(' ')} | MRG`}
        />
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

        <div className="">
          {isLoading && (
            <ContentLoader
              speed={2}
              viewBox="0 0 420 480"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
            </ContentLoader>
          )}
          {!isLoading && (
            <ImageZoomMobile
              data={{ images: data.item.photos.main, name: data.item.name }}
            />
          )}
          <hr />
          <div className="flex flex-col w-full  px-3 py-2 bg-white">
            {isLoading && (
              <ContentLoader
                speed={2}
                viewBox="0 0 480 470"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="40" />
                <rect x="0" y="60" rx="5" ry="5" width="90%" height="40" />
                <rect x="0" y="120" rx="5" ry="5" width="80%" height="40" />
                <rect x="0" y="180" rx="5" ry="5" width="70%" height="35" />
                <rect x="0" y="240" rx="5" ry="5" width="60%" height="35" />
                <rect x="0" y="300" rx="5" ry="5" width="40%" height="35" />
                <rect x="0" y="360" rx="5" ry="5" width="60%" height="35" />
                <rect x="0" y="420" rx="5" ry="5" width="40%" height="35" />
              </ContentLoader>
            )}
            {!isLoading && (
              <ItemDescription
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                deliveryCountry={deliveryCountry}
                data={{
                  price: data.item.price,
                  priceBefore: data.item.priceBefore,
                  name: data.item.name,
                  id: data.item.id,
                  colors: data.item.colors,
                  availableColors: data.item.availableColors,
                  sizes: data.item.sizes,
                  availableSizes: data.item.availableSizes,
                }}
                itemInCart={data.itemInCart}
                addToCartButtonLoading={addToCartButtonLoading}
                quantity={quantity}
                setQuantity={setQuantity}
                size={size}
                setSize={setSize}
                color={color}
                setColor={setColor}
              />
            )}
            <hr />

            <div className="relative  ">
              {isLoading && (
                <ContentLoader
                  speed={2}
                  viewBox="0 0 480 100"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="0" y="20" rx="5" ry="5" width="100%" height="25" />
                  <rect x="0" y="60" rx="5" ry="5" width="49%" height="25" />
                  <rect x="50%" y="60" rx="5" ry="5" width="50%" height="25" />
                </ContentLoader>
              )}
            </div>
          </div>
        </div>
        <div>
          <div id="details" className="py-2">
            <h1 className="text-xl font-semibold mb-1 px-3">Product Details</h1>
            <div className="flex justify-center mb-2">
              <button
                onClick={() => setDetailsTab(0)}
                className={`text-lg py-2 flex-1 text-center   ${
                  detailsTab === 0 && 'border-red-700 border-b-2 text-red-700'
                }   bg-gray-400`}
              >
                Description
              </button>

              <button
                onClick={() => setDetailsTab(1)}
                className={`text-lg py-2 flex-1 text-center   ${
                  detailsTab === 1 && 'border-red-700 border-b-2 text-red-700'
                }   bg-gray-400`}
              >
                Specifications
              </button>
            </div>
            <div className="px-3 text-sm">{items[0].description}</div>
          </div>
        </div>

        {!isLoading && (
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
        )}

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
