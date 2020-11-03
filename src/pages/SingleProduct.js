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
import ContentLoader from 'react-content-loader';
import InView from 'react-intersection-observer';
import { useLazyLoadFetch } from '../hooks/useLazyLoadFetch';
import Layout from '../components/Layout';
import SideCartMenu from '../components/SingleProduct/SideCartMenu';
import { CSSTransition } from 'react-transition-group';

export default function SingleProduct() {
  // let tl = React.useMemo(
  //   () =>
  //     gsap.timeline({
  //       defaults: { duration: 0.5, ease: Power2.easeOut },
  //       paused: true,
  //     }),
  //   []
  // );
  const { id, name } = useParams();
  const {
    deliveryCountry,
    addItemToCart,
    removeItemFromCart,
    allItems,
    isItemInCart,
    getSingleItemDetails,
  } = React.useContext(DataProvider);
  const quantityOptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
  ];
  const [quantity, setQuantity] = React.useState(quantityOptions[0]);
  const [isFetching, setFetching] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [relatedData, hasMore] = useLazyLoadFetch(allItems, page);
  const [cartItems, setCartItems] = React.useState(null);
  const [cartTotal, setCartTotal] = React.useState(0);
  const [cartEmpty, setCartEmpty] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [related, setRelated] = React.useState(null);
  const [detailsTab, setDetailsTab] = React.useState(0);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [loading, setLoading] = React.useState(true);
  const [itemInCart, setItemInCart] = React.useState(false);
  const handleLoadMore = inView => {
    if (inView) {
      if (hasMore) {
        setFetching(true);
        setPage(page + 1);
      }
    }
  };
  const handleAddToCart = async () => {
    setAddToCartButtonLoading(true);
    const result = await addItemToCart({
      id: data.id,
      quantity: quantity.value,
      price: data.price,
      name: data.name,
      photo: data.photos.small,
    });
    if (result.message === 'ok') {
      setAddToCartButtonLoading(false);
      setItemInCart(true);
      setCartItems(result.cartItems);
      setSideMenuOpen(true);
      setCartTotal(result.cartTotal);
      setCartEmpty(false);
    }
  };
  const handleRemoveFromCart = async id => {
    if (id === data.id) {
      setAddToCartButtonLoading(true);
    }
    const result = await removeItemFromCart(id);
    if (result.message === 'ok') {
      if (id === data.id) {
        setAddToCartButtonLoading(false);
        setItemInCart(false);
      }
      if (sideMenuOpen) {
        setCartItems(result.cartItems);
        setCartTotal(result.cartTotal);
        if (result.cartItems.length === 0) {
          setCartEmpty(true);
        }
      }
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

  /*
  {entry}
  */

  React.useEffect(() => {
    getSingleItemDetails(id).then(item => {
      setData(item);

      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    isItemInCart(id).then(res => {
      if (res.message === 'yes') {
        setItemInCart(true);
        setAddToCartButtonLoading(false);
      } else {
        setItemInCart(false);
        setAddToCartButtonLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  });

  return (
    <Layout>
      <Helmet>
        <title>{` Shop ${name.split('-').join(' ')} on MRG`} </title>
        <meta
          name="description"
          content={`Shop  ${name.split('-').join(' ')} | MRG`}
        />
      </Helmet>

      <CSSTransition
        timeout={300}
        classNames="en-add-to-cart__sideMenu"
        unmountOnExit
        in={sideMenuOpen}
      >
        <SideCartMenu
          cartItems={cartItems}
          cartTotal={cartTotal}
          setSideMenuOpen={setSideMenuOpen}
          handleRemoveFromCart={handleRemoveFromCart}
          cartEmpty={cartEmpty}
        />
      </CSSTransition>
      <div className=" px-4 ">
        <div className="mx-auto max-w-default">
          <Breadcrumbs />

          <div className="details__container">
            <div className="relative ">
              {loading && (
                <ContentLoader
                  speed={2}
                  viewBox="0 0 480 480"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
                </ContentLoader>
              )}
              {!loading && (
                <ImageZoom
                  data={{ images: data.photos.main, name: data.name }}
                />
              )}
            </div>

            <MiddleSection
              data={data}
              deliveryCountry={deliveryCountry}
              loading={loading}
            />
            <RightSection
              data={data}
              quantity={quantity}
              setQuantity={setQuantity}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              quantityOptions={quantityOptions}
              addToCartButtonLoading={addToCartButtonLoading}
              loading={loading}
              itemInCart={itemInCart}
            />
          </div>
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
            {!loading && <div className="px-2 text-sm">{data.description}</div>}
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
