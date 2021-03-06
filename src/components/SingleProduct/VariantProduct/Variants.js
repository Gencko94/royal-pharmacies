import React from 'react';
import { useIntl } from 'react-intl';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Navigation]);
export default function Variants({
  variants,
  setSelectedVariant,
  selectedOption,
  selectedVariation,
}) {
  const breakpoints = {
    // when window width is >= 640px
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
      slidesPerView: 3,
      spaceBetween: 20,
    },
    860: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1100: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  };
  const { locale } = useIntl();
  return (
    <div>
      <h1 className="font-semibold mb-2 text-lg">
        {variants[selectedVariation][`name_${locale}`]}
      </h1>
      {Object.keys(variants).length > 6 ? (
        <Swiper navigation id="main" spaceBetween={3} breakpoints={breakpoints}>
          {Object.keys(variants).map(variation => {
            return (
              <SwiperSlide
                key={variants[variation].addon_item_id}
                className={`overflow-hidden   relative my-1 rounded`}
              >
                <button
                  onClick={() => setSelectedVariant(variation)}
                  key={variants[variation].addon_item_id}
                  className={`${
                    selectedVariation === variation &&
                    'border border-main-color shadow-lg rounded overflow-hidden'
                  }`}
                >
                  <img
                    alt={variants[variation].id}
                    src={`${process.env.REACT_APP_IMAGES_URL}/small/${
                      variants[variation].options[selectedOption[variation]]
                        ?.image
                    }`}
                  />
                  <h1 className="mt-1 text-sm font-semibold">
                    {variants[variation].addon_item_value}
                  </h1>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="single-product-colors__container">
          {Object.keys(variants).map(variation => {
            return (
              <button
                onClick={() => setSelectedVariant(variation)}
                key={variants[variation].addon_item_id}
                className={`${
                  selectedVariation === variation &&
                  'border border-main-color shadow-lg rounded overflow-hidden'
                }`}
              >
                <img
                  alt={variants[variation].id}
                  src={`${process.env.REACT_APP_IMAGES_URL}/small/${
                    variants[variation].options[selectedOption[variation]]
                      ?.image
                  }`}
                />
                <h1 className="mt-1 text-sm font-semibold">
                  {variants[variation].addon_item_value}
                </h1>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
