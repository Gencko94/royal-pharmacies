import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { AiFillStar, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
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
import { useInView } from 'react-intersection-observer';
import { CSSTransition } from 'react-transition-group';
import MultiClamp from 'react-multi-clamp';
export default function SingleProductMobile({
  match: {
    params: { id },
  },
}) {
  const {
    bestSeller,
    addItemToCart,
    cartItems,
    removeItemFromCart,
    calculateItemsPrice,
  } = React.useContext(DataProvider);
  const data = bestSeller.filter(item => item.id === id);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [detailsTab, setDetailsTab] = React.useState(0);
  // const [animateIcon, setAnimateIcon] = React.useState(false);
  const [showAddedToCart, setShowAddedToCart] = React.useState(false);

  const [triggerRef, inView] = useInView();
  // const animationIconRef = React.useRef(null);
  const isItemInCart = () => {
    const itemInCart = cartItems.find(item => data[0].id === item.id);
    if (itemInCart !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className=" bg-gray-100">
      <CSSTransition
        in={showAddedToCart}
        timeout={200}
        unmountOnExit
        classNames="after__addToCart"
      >
        <div className="after__addToCart-container">
          <div className=" after__addToCart-details mb-1  ">
            <img
              src={data[0].photos.small}
              alt={data[0].name}
              className="max-w-full h-auto"
            />
            <MultiClamp className="font-semibold" clamp={2} ellipsis="...">
              {data[0].name}
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
          <Slider className="">
            {data[0].photos.main.map((photo, i) => {
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
                {data[0].photos.main.map((photo, i) => {
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
                          currentSlide === i ? 'border border-red-700' : ''
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          />
        </CarouselProvider>
        <hr />
        <div className="flex flex-col w-full  px-3 py-2 bg-white">
          <h1 className="font-semibold text-xl">{data[0].name}</h1>
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
          <hr />
          <div className=" mb-1   font-semibold">
            <h1 className=" mr-2 ">
              Price :{' '}
              <span className=" text-xl font-bold text-red-700">
                {data[0].price} KD
              </span>{' '}
            </h1>
          </div>

          <ul className="text-sm list-disc pl-4 mb-2">
            <li>
              The nephilim Edition contains all the loot from the Collector's
              Edition as well as the Limited Edition Darksiders: the forbidden
              land board game!{' '}
            </li>
            <li>
              Blast Angels and demons as the gunslinging Horseman strife,
              playable for the first time
            </li>
            <li>
              Swap between the powerful swordsman war and strife instantly in
              frenetic, single-player gameplay
            </li>
            <li>
              Explore the epic world of Darksiders and wreak havoc with a friend
              in two-player cooperative mode{' '}
            </li>
            <li>
              Experience a brand new story campaign that takes place before the
              original Darksiders, exploring the origin of the Seven seals{' '}
            </li>
          </ul>
          
        <div className="relative  ">
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
                  onClick={() => removeItemFromCart(data[0])}
                  className="bg-red-700 text-gray-100    p-1 rounded   flex items-center justify-center font-semibold "
                >
                  <span>
                    <TiShoppingCart className="w-25p h-25p mr-2" />
                  </span>
                  Remove From Cart
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowAddedToCart(true);
                    setTimeout(() => {
                      setShowAddedToCart(false);
                    }, 3000);

                    addItemToCart({ data: data[0], quantity });
                  }}
                  className=" bg-blue-700 flex-1 text-gray-100   p-1 rounded   flex items-center justify-center font-semibold"
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
          </div>
        </div>
      </div>
      <div ref={triggerRef}>
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
          <div className="px-3 text-sm">{data[0].description}</div>
        </div>
      </div>
      <CSSTransition
        in={inView}
        timeout={200}
        unmountOnExit={true}
        classNames="floating-cart-button"
      >
        <div className={`floating-button bg-second-nav-text-light`}  >
          <div className="mr-2 flex items-center">
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
          {isItemInCart() ? (
            <button
              onClick={() => removeItemFromCart(data[0])}
              className="bg-red-700 text-gray-100  flex-1  p-1 rounded   flex items-center justify-center font-semibold "
            >
              <span>
                <TiShoppingCart className="w-25p h-25p mr-2" />
              </span>
              Remove From Cart
            </button>
          ) : (
            <button
              onClick={() => addItemToCart({ data: data[0], quantity })}
              className="bg-blue-700 text-gray-100 flex-1  p-1 rounded  flex items-center justify-center font-semibold"
            >
              <span>
                <TiShoppingCart className="w-25p h-25p mr-2" />
              </span>
              Add to Cart
            </button>
          )}
        </div>
      </CSSTransition>
    </div>
  );
}
