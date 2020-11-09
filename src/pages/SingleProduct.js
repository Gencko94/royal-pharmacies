import React from 'react';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { DataProvider } from '../contexts/DataContext';
import Breadcrumbs from '../components/SingleProduct/Breadcrumbs';
import ImageZoom from '../components/SingleProduct/ImageZoom';
import MiddleSection from '../components/SingleProduct/MiddleSection';
import RightSection from '../components/SingleProduct/RightSection';
import RelatedItems from '../components/SingleProduct/RelatedItems';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import InView from 'react-intersection-observer';
import { useLazyLoadFetch } from '../hooks/useLazyLoadFetch';
import Layout from '../components/Layout';
import SideCartMenu from '../components/SingleProduct/SideCartMenu';
import { queryCache, useMutation, useQuery } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import SingleProductLoader from '../components/SingleProduct/SingleProductLoader';

export default function SingleProduct() {
  const { id, name } = useParams();
  const {
    deliveryCountry,
    addItemToCart,
    removeItemFromCart,
    allItems,

    getSingleItemDetails,
  } = React.useContext(DataProvider);
  const quantityOptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
  ];

  /**
   * Main Fetch
   */
  const { data, isLoading } = useQuery(
    ['singleProduct', id],
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
        queryCache.setQueryData(['singleProduct', id], prev => {
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
        queryCache.setQueryData(['singleProduct', id], prev => {
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
  const [quantity, setQuantity] = React.useState(quantityOptions[0]);
  const [isFetching, setFetching] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [relatedData, hasMore] = useLazyLoadFetch(allItems, page);
  const [related, setRelated] = React.useState(null);
  const [detailsTab, setDetailsTab] = React.useState(0);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const handleLoadMore = inView => {
    if (inView) {
      if (hasMore) {
        setFetching(true);
        setPage(page + 1);
      }
    }
  };
  const handleAddToCart = async () => {
    try {
      await addMutation({
        id: data.item.id,
        quantity: quantity.value,
        price: data.item.price,
        name: data.item.name,
        photo: data.item.photos.small,
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

  const fetchData = () => {
    setTimeout(() => {
      setRelated(relatedData);

      setFetching(false);
    }, 1500);
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Add item to localStorage //
  React.useEffect(() => {
    const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));
    const isItemInHistory = visitedItems.find(item => item.id === id);
    if (isItemInHistory !== undefined) {
      return;
    } else {
      visitedItems.push({ id });
      localStorage.setItem('visitedItems', JSON.stringify(visitedItems));
    }
  }, [id]);

  return (
    <Layout>
      <Helmet>
        <title>{` Shop ${name.split('-').join(' ')} on MRG`} </title>
        <meta
          name="description"
          content={`Shop  ${name.split('-').join(' ')} | MRG`}
        />
      </Helmet>

      <AnimatePresence>
        {sideMenuOpen && (
          <SideCartMenu
            key={879}
            cartItems={data.cartItems}
            cartTotal={data.cartTotal}
            setSideMenuOpen={setSideMenuOpen}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        )}
        {sideMenuOpen && (
          <motion.div
            key={268}
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
          <Breadcrumbs />
          {isLoading && <SingleProductLoader />}
          {!isLoading && (
            <div className="details__container">
              <div className="relative ">
                <ImageZoom
                  data={{ images: data.item.photos.main, name: data.item.name }}
                />
              </div>

              <MiddleSection
                data={data.item}
                deliveryCountry={deliveryCountry}
              />
              <RightSection
                data={data.item}
                quantity={quantity}
                setQuantity={setQuantity}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                quantityOptions={quantityOptions}
                addToCartButtonLoading={addToCartButtonLoading}
                itemInCart={data.itemInCart}
              />
            </div>
          )}
          <div id="details" className="py-2 mb-2">
            <h1 className="text-xl font-semibold mb-1 px-2">
              Additional Details
            </h1>
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
              <button
                onClick={() => setDetailsTab(2)}
                className={`text-lg py-2 flex-1 text-center   ${
                  detailsTab === 2 && 'border-red-700 border-b-2 text-red-700'
                }   bg-gray-400`}
              >
                Reviews
              </button>
            </div>
            {!isLoading && (
              <div className="px-2 text-sm">{data.description}</div>
            )}
          </div>
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
    </Layout>
  );
}
