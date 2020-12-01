import React from 'react';
import { useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';

import { AuthProvider } from '../../contexts/AuthContext';
import {
  addToCart,
  removeFromCart,
  getStaticSwiperData,
} from '../../Queries/Queries';
import { AnimatePresence } from 'framer-motion';
import BuyOptions from '../Home/ItemsSlider/BuyOptions';
import { TiShoppingCart } from 'react-icons/ti';
import { BsPlus } from 'react-icons/bs';
import { useQuery } from 'react-query';
import LazyImage from '../../helpers/LazyImage';
import SwiperLoader from '../Home/SwiperLoader';
SwiperCore.use([Navigation]);
export default function StaticSwiper({ type }) {
  const { formatMessage, locale } = useIntl();
  const [size, setSize] = React.useState('xs');
  const [quantity, setQuantity] = React.useState(1);
  const [activeBuyOptions, setActiveBuyOptions] = React.useState(null);
  const { userId } = React.useContext(AuthProvider);
  const [loadingButton, setLoadingButton] = React.useState(null);
  const handleBuyOptionsToggle = id => {
    if (activeBuyOptions === id) {
      setActiveBuyOptions(null);
      setQuantity(1);
      setSize('xs');
      return;
    }
    setActiveBuyOptions(id);
    setSize('xs');
    setQuantity(1);
  };
  const { data, isLoading } = useQuery(
    ['staticSwiper', type],
    getStaticSwiperData,
    { retry: true }
  );
  const [cartItems, setCartItems] = React.useState([]);

  const handleAddToCart = async id => {
    setLoadingButton(id);
    const newItem = { id, quantity: quantity, size };
    try {
      await addToCart({ newItem, userId });
      setCartItems(prev => {
        return [...prev, id];
      });
      setLoadingButton(null);
    } catch (error) {
      setLoadingButton(null);
      console.error(error.response);
    }
  };
  const handleRemoveFromCart = async id => {
    setLoadingButton(id);
    try {
      await removeFromCart(id, userId);
      setCartItems(prev => {
        return prev.filter(i => i !== id);
      });
    } catch (error) {
      setLoadingButton(null);
      console.error(error.response);
    }
  };
  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    860: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1100: {
      slidesPerView: 7,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 8,
      spaceBetween: 20,
    },
  };
  return (
    <div className="my-8 overflow-hidden   ">
      {isLoading && <div className="mb-4 " style={{ height: '30px' }}></div>}
      {!isLoading && (
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-bold flex-1 ">{type}</h1>
          <button className="py-1 px-2  bg-main-color text-second-nav-text-light rounded whitespace-no-wrap">
            {formatMessage({ id: 'seeAll' })}
          </button>
        </div>
      )}
      {isLoading && <SwiperLoader />}
      {!isLoading && (
        <Swiper
          navigation
          id="main"
          spaceBetween={10}
          breakpoints={breakpoints}
        >
          {data.map(item => {
            return (
              <SwiperSlide
                key={item.id}
                className={`overflow-hidden slider-item border  relative my-1
            shadow-itemsSlider-shallo shadow
            rounded`}
              >
                <span className="sale-mini__banner text-xs font-semibold bg-main-color text-main-text px-1 ">
                  32% {formatMessage({ id: 'off' })}
                </span>
                <a href={`/${locale}/c/${item.id}`}>
                  <LazyImage
                    src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.image.link}`}
                    alt={item.translation[locale].title}
                    pb="calc(100% * 286/210)"
                  />
                </a>

                <div className={`bg-body-light text-body-text-light`}>
                  <div className="p-2" style={{ height: '50px' }}>
                    <a
                      title={item.translation[locale].title}
                      className="hover:underline inline-block"
                      href={`/${locale}/c/${item.id}`}
                    >
                      <h1 className="text-clamp-2 text-xs">
                        {item.translation[locale].title}
                      </h1>
                    </a>
                  </div>

                  <div className=" py-1 px-3 flex items-center justify-between">
                    <p className="   text-lg font-semibold text-main-color whitespace-no-wrap">
                      50 <span className="text-xs ">KD</span>
                    </p>
                    <button
                      onClick={() => handleBuyOptionsToggle(item.id)}
                      className=" rounded-full  p-2  shadow-itemsSlider-shallow relative text-body-light z-3 bg-main-color"
                    >
                      <TiShoppingCart
                        style={{
                          height: '20px',
                          width: '20px',
                          marginTop: '3px',
                          marginRight: '2px',
                        }}
                      />
                      <BsPlus
                        className="w-4 h-4 absolute  "
                        style={{ right: '4px', top: '3px' }}
                      />
                    </button>
                    {/* {data.sale && (
                    <p className="text-xs mx-3  line-through text-gray-500  font-bold whitespace-no-wrap">
                      {' '}
                      {data.priceBefore} <span className="font-normal">KD</span>
                    </p>
                  )} */}
                  </div>
                </div>
                <AnimatePresence>
                  {activeBuyOptions === item.id && (
                    <BuyOptions
                      cartItems={cartItems}
                      setQuantity={setQuantity}
                      item={item}
                      size={size}
                      quantity={quantity}
                      setSize={setSize}
                      loadingButton={loadingButton}
                      handleRemoveFromCart={handleRemoveFromCart}
                      handleAddToCart={handleAddToCart}
                    />
                  )}
                </AnimatePresence>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
