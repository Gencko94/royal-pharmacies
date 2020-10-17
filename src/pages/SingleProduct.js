import React from 'react';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { DataProvider } from '../contexts/DataContext';
import Breadcrumbs from '../components/SingleProduct/Breadcrumbs';
import ImageZoom from '../components/SingleProduct/ImageZoom';
import MiddleSection from '../components/SingleProduct/MiddleSection';
import RightSection from '../components/SingleProduct/RightSection';
import RelatedItems from '../components/SingleProduct/RelatedItems';
import { Helmet } from 'react-helmet';
import { gsap } from 'gsap';
import { Power2 } from 'gsap';
import MultiClamp from 'react-multi-clamp';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import ContentLoader from 'react-content-loader';
import InView from 'react-intersection-observer';
import { useLazyLoadFetch } from '../hooks/useLazyLoadFetch';

export default function SingleProduct({
  match: {
    params: { id },
  },
}) {
  let tl = gsap.timeline({
    defaults: { duration: 0.5, ease: Power2.easeOut },
    paused: true,
  });

  const {
    bestSeller,
    deliveryCountry,
    calculateItemsPrice,
    addItemToCart,
    removeItemFromCart,
    relatedItems,
  } = React.useContext(DataProvider);

  const [quantity, setQuantity] = React.useState(1);
  const items = bestSeller.filter(item => item.id === id);
  const [isFetching, setFetching] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [relatedData, hasMore] = useLazyLoadFetch(relatedItems, page);
  const [data, setData] = React.useState(null);
  const [related, setRelated] = React.useState(null);
  const [detailsTab, setDetailsTab] = React.useState(0);

  const handleLoadMore = inView => {
    if (inView) {
      if (hasMore) {
        setFetching(true);
        setPage(page + 1);
      }
    }
  };
  const handleAddToCart = () => {
    addItemToCart({ data: data[0], quantity });
    tl.play();
  };
  const handleRemoveFromCart = () => {
    removeItemFromCart(data[0]);
  };
  const handleCloseMenu = () => {
    tl.reverse(0.5);
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
    const isItemInHistory = visitedItems.find(item => item.id === items[0].id);
    if (isItemInHistory !== undefined) {
      return;
    } else {
      visitedItems.push(items[0]);
      localStorage.setItem('visitedItems', JSON.stringify(visitedItems));
    }
  });
  React.useEffect(() => {
    tl.fromTo(
      '.side__addCart-container ',
      {
        visibility: 'hidden',
        x: '100%',
      },
      { visibility: 'visible', x: '0%' }
    )
      .fromTo(
        '.side__addCart-bg',
        {
          visibility: 'hidden',
          opacity: 0,
        },
        { visibility: 'visible', opacity: 0.5 },
        '-=0.3'
      )
      .fromTo(
        '.after__addToCart-related',
        { x: '100%' },
        { x: '0%', stagger: '0.1' },
        '-=0.5'
      );
  });
  React.useEffect(() => {
    setTimeout(() => {
      setData(items[0]);
    }, 5000);
  }, [items]);
  return (
    <>
      <Helmet>
        <title>{items[0].name} | MRG </title>
      </Helmet>
      <div onClick={handleCloseMenu} className="side__addCart-bg"></div>
      <div className="side__addCart-container ">
        <div className=" bg-body-light p-2 ">
          <div>
            <div className=" after__addToCart-grid mb-2">
              <div className=" grid place-items-center">
                <img
                  src={items[0].photos.small}
                  alt={items[0].name}
                  className="max-w-full h-auto"
                />
              </div>
              <div className="after__addToCart-details ">
                <MultiClamp className="font-semibold " clamp={4} ellipsis="...">
                  {items[0].name}
                </MultiClamp>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <h1 className="bg-blue-200 px-2 py-1 w-1/2 rounded text-center my-2">
                Added to Cart !
              </h1>
            </div>
            <hr className="my-1" />
            <div className="flex justify-between semibold items-center  my-2">
              <h1 className="">Cart Total</h1>
              <h1 className=" font-semibold">{calculateItemsPrice()} KD</h1>
            </div>
            <hr className="my-1" />
            <div className=" flex items-center my-2 text-center text-second-nav-text-light ">
              <button
                className={`flex-1 py-1  px-2  bg-blue-500 w-full  rounded mr-2`}
              >
                Checkout
              </button>
              <Link
                to="/cart"
                className={`flex-1 py-1 px-2 bg-green-500     rounded`}
              >
                Go to Cart
              </Link>
            </div>
          </div>
          <hr className="my-1" />
          <div
            className="overflow-y-auto overflow-x-hidden"
            style={{ maxHeight: 'calc(100vh - 280px' }}
          >
            <h1 className="font-bold">Similar Items</h1>
            {bestSeller.map((item, i) => {
              return (
                <>
                  <div key={i} className="after__addToCart-related my-1  ">
                    <img
                      src={item.photos.small}
                      alt={item.name}
                      className="max-w-full h-auto"
                    />
                    <div className="text-sm">
                      <MultiClamp
                        className="font-semibold "
                        clamp={2}
                        ellipsis="..."
                      >
                        {item.name}
                      </MultiClamp>
                      <Rating
                        initialRating={Math.round(Math.random() * 5)}
                        emptySymbol={<AiOutlineStar className="text-red-700" />}
                        fullSymbol={<AiFillStar className="text-red-700" />}
                        className="mr-2 pt-1"
                      />
                      <h1 className="text-green-700">{item.price} KD</h1>
                      <button className="p-1 text-xs bg-blue-700 text-white rounded ">
                        Add to cart
                      </button>
                    </div>
                  </div>
                  {i !== bestSeller.length - 1 && <hr />}
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className=" px-4 ">
        <div className="mx-auto" style={{ maxWidth: '1560px ' }}>
          <Breadcrumbs />

          <div className="details__container">
            <div className="relative ">
              {!data && (
                <ContentLoader
                  speed={2}
                  viewBox="0 0 480 480"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
                </ContentLoader>
              )}
              {data && <ImageZoom data={data} />}
            </div>

            <MiddleSection data={data} deliveryCountry={deliveryCountry} />
            <RightSection
              data={data}
              quantity={quantity}
              setQuantity={setQuantity}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
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
            <div className="px-2 text-sm">{items[0].description}</div>
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
    </>
  );
}
