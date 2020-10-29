import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlineStar,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from 'react-icons/ai';
import Rating from 'react-rating';

import {
  CarouselProvider,
  Slider,
  Slide,
  ImageWithZoom,
  DotGroup,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { DataProvider } from '../contexts/DataContext';
import { TiShoppingCart } from 'react-icons/ti';
import InView, { useInView } from 'react-intersection-observer';
import { CSSTransition } from 'react-transition-group';
import MultiClamp from 'react-multi-clamp';
import RelatedItems from '../components/SingleProduct/RelatedItems';
import { Helmet } from 'react-helmet';
import ContentLoader from 'react-content-loader';
import { useLazyLoadFetch } from '../hooks/useLazyLoadFetch';
import LayoutMobile from '../components/LayoutMobile';

export default function SingleProductMobile({
  match: {
    params: { id, name },
  },
}) {
  const {
    addItemToCart,
    cartItems,
    removeItemFromCart,
    calculateItemsPrice,
    deliveryCountry,

    allItems,
  } = React.useContext(DataProvider);
  const items = allItems.filter(item => item.id === id);
  const [data, setData] = React.useState(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [detailsTab, setDetailsTab] = React.useState(0);
  const [showAddedToCart, setShowAddedToCart] = React.useState(false);

  const [isFetching, setFetching] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [relatedData, hasMore] = useLazyLoadFetch(allItems, page);
  const [related, setRelated] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      setData(items[0]);
    }, 5000);
  }, [items]);
  const [triggerRef, inView] = useInView();
  const isItemInCart = () => {
    const itemInCart = cartItems.find(item => items[0].id === item.id);
    if (itemInCart !== undefined) {
      return true;
    } else {
      return false;
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
        <CSSTransition
          in={showAddedToCart}
          timeout={200}
          unmountOnExit
          classNames="after__addToCart-mobile"
        >
          <div className="after__addToCart-container-mobile">
            <div className=" after__addToCart-details-mobile mb-1   ">
              <img
                src={items[0].photos.small}
                alt={items[0].name}
                className="max-w-full h-auto"
              />
              <MultiClamp className="font-semibold" clamp={2} ellipsis="...">
                {items[0].name}
              </MultiClamp>
              <div className="flex flex-col  items-center">
                <h1 className="text-sm">Cart Total</h1>
                <h1 className="text-sm font-semibold">
                  {calculateItemsPrice()} KD
                </h1>
              </div>
            </div>
            <div className="  text-nav-secondary ">
              <button className="p-2 text-sm bg-blue-600 w-full font-semibold  rounded mr-2">
                Checkout
              </button>
              {/* <button className="p-1 bg-nav-secondary flex-1  rounded">
              Continue shopping
            </button> */}
            </div>
          </div>
        </CSSTransition>
        <div className="flex px-3 py-5 items-center flex-wrap">
          <h1>Home</h1>
          <BiChevronRight />
          <h1>Home & Garden</h1>
          <BiChevronRight />
          <h1>Bathroom & Laundry</h1>
          <BiChevronRight />
          <h1>Drying Racks & Pegs</h1>
        </div>

        <div className="details__container-mobile">
          <CarouselProvider
            naturalSlideHeight={480}
            naturalSlideWidth={480}
            totalSlides={4}
            visibleSlides={1}
            currentSlide={currentSlide}
            className="bg-white"
            lockOnWindowScroll={true}
          >
            {!data && (
              <ContentLoader
                speed={2}
                viewBox="0 0 420 480"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
              </ContentLoader>
            )}
            {data && (
              <>
                <Slider className="">
                  {items[0].photos.main.map((photo, i) => {
                    return (
                      <Slide index={i} key={i} innerClassName="">
                        <div
                          className=" "
                          style={{
                            minHeight: '300px',

                            minWidth: '300px',
                            width: '100%',
                            height: '100%',
                          }}
                        >
                          <ImageWithZoom src={photo} alt="g" />
                        </div>
                      </Slide>
                    );
                  })}
                </Slider>
                <DotGroup
                  className="mt-2"
                  renderDots={() => (
                    <div
                      className="flex 
                 
                 justify-evenly"
                    >
                      {items[0].photos.main.map((photo, i) => {
                        return (
                          <button
                            className="mb-1"
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                          >
                            <img
                              style={{ width: '50px', height: '50px' }}
                              src={photo}
                              alt={photo}
                              className={`${
                                currentSlide === i
                                  ? 'border border-red-700'
                                  : ''
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
              </>
            )}
          </CarouselProvider>
          <hr />
          <div className="flex flex-col w-full  px-3 py-2 bg-white">
            {!data && (
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
            {data && (
              <>
                <h1 className="font-semibold text-xl">{items[0].name}</h1>
                <div className="flex items-center ">
                  <Rating
                    initialRating={4.5}
                    emptySymbol={<AiOutlineStar className="text-red-700" />}
                    fullSymbol={<AiFillStar className="text-red-700" />}
                    className="mr-2 pt-1"
                  />
                  <h1 className="text-sm">36 Ratings</h1>
                </div>

                <h1 className=" font-semibold mb-1 text-green-600">In Stock</h1>
                <h1 className="text-sm   mb-1 text-gray-700">
                  Model Number : NK2O-4952
                </h1>

                <hr />
                <div className=" mb-1 text-sm  font-bold">
                  <h1 className=" ">
                    Price Before :{' '}
                    <span className=" text-base italic  line-through text-gray-700">
                      {items[0].priceBefore} KD
                    </span>{' '}
                  </h1>

                  <h1 className=" mr-5   ">
                    Price Now :{' '}
                    <span className=" text-xl  text-red-700">
                      {items[0].price} KD
                    </span>{' '}
                    <span className=" font-normal  text-gray-700">
                      (VAT Inclusive)
                    </span>
                  </h1>

                  <h1 className="   ">
                    You Save :{' '}
                    <span className=" text-xl  text-red-700">18%</span>{' '}
                  </h1>
                  <button
                    className={`my-2 px-2 text-sm bg-green-200 rounded font-semibold`}
                  >
                    Free Delivery To {deliveryCountry}
                  </button>
                </div>
              </>
            )}
            <hr />

            <div className="relative  ">
              {!data && (
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
              {data && (
                <>
                  <div className="  my-2 flex items-center">
                    <h1 className=" mr-2 font-semibold">Quantity : </h1>
                    <select
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                      className="select-mobile border-gray-400 border py-1 px-2 rounded"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                  <div className="relative flex items-center">
                    <button className="bg-green-400 p-1 rounded mr-2 flex-1  text-white flex items-center justify-center font-semibold ">
                      <span>
                        <AiOutlineHeart className="w-25p h-25p mr-2" />
                      </span>
                      Add to Wishlist
                    </button>
                    {isItemInCart() ? (
                      <button
                        onClick={() => removeItemFromCart(items[0])}
                        className="bg-red-700 text-gray-100 flex-1   p-1 rounded px-2  flex items-center justify-center font-semibold "
                      >
                        <span>
                          <TiShoppingCart className="w-25p h-25p mr-2" />
                        </span>
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowAddedToCart(true);
                          setTimeout(() => {
                            setShowAddedToCart(false);
                          }, 3000);

                          addItemToCart({ data: items[0], quantity });
                        }}
                        className=" bg-blue-700 flex-1 text-gray-100   p-1 px-2 rounded   flex items-center justify-center font-semibold"
                      >
                        <span>
                          <TiShoppingCart className="w-25p h-25p mr-2" />
                        </span>
                        Add to Cart
                      </button>
                    )}
                    {/* {animateIcon && (
                <span ref={animationIconRef} className="cart__icon__animate">
                  <TiShoppingCart />
                </span>
              )} */}
                  </div>
                </>
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
        <CSSTransition
          in={inView}
          timeout={200}
          unmountOnExit={true}
          classNames="floating-cart-button"
        >
          <div className={`floating-button border-t bg-second-nav-text-light`}>
            <div className=" flex items-center justify-center flex-1">
              <button onClick={handleSubstractQuantity} className="p-1 mr-2">
                <AiOutlineMinusCircle
                  className={`w-6 h-6 ${
                    quantity === 1 ? 'text-gray-700' : 'text-blue-700'
                  }`}
                />
              </button>
              <span className="mr-2">{quantity}</span>
              <button onClick={handleAddQuantity} className="p-1">
                <AiOutlinePlusCircle className={`w-6 h-6 text-blue-700`} />
              </button>
            </div>
            <div className="p-1 text-center">
              {quantity * items[0].price} KD
            </div>
            {isItemInCart() ? (
              <button
                onClick={() => removeItemFromCart(items[0])}
                className="text-sm bg-red-700 text-gray-100  flex-1  py-1 px-2 rounded   flex items-center justify-center font-semibold "
              >
                <span>
                  <TiShoppingCart className="w-25p h-25p mr-2" />
                </span>
                Remove
              </button>
            ) : (
              <button
                onClick={() => addItemToCart({ data: items[0], quantity })}
                className="text-sm bg-blue-700 text-gray-100 flex-1  py-1 px-2 rounded  flex items-center justify-center font-semibold"
              >
                <span>
                  <TiShoppingCart className="w-25p h-25p mr-2" />
                </span>
                Add to Cart
              </button>
            )}
          </div>
        </CSSTransition>
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
