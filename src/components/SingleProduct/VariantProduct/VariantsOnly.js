import React from 'react';
import { useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Navigation]);
export default function VariantsOnly({
  variants,
  setSelectedVariant,
  selectedVariation,
}) {
  const breakpoints = {
    // when window width is >= 640px
    320: {
      slidesPerView: 3,
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
        {variants[selectedVariation]?.[`name_${locale}`]}
      </h1>

      {Object.keys(variants).length > 6 ? (
        <Swiper navigation id="main" spaceBetween={3} breakpoints={breakpoints}>
          {Object.keys(variants).map(variation => {
            return (
              <SwiperSlide
                key={variants[variation].addon_item_id}
                className={`overflow-hidden   relative my-1 rounded`}
              >
                {variants[variation].image ? (
                  <button
                    className={`${
                      selectedVariation === variation &&
                      'border overflow-hidden rounded shadow border-main-color'
                    }`}
                    onClick={() => setSelectedVariant(variation)}
                  >
                    <img
                      alt={variants[variation].id}
                      src={`${process.env.REACT_APP_IMAGES_URL}/small/${variants[variation].image}`}
                    />
                    <h1 className="mt-1 text-sm font-semibold">
                      {variants[variation].addon_item_value}
                    </h1>
                  </button>
                ) : (
                  <button
                    className={`${
                      selectedVariation === variation &&
                      'bg-main-color text-main-text'
                    } p-2 uppercase border flex items-center justify-center`}
                    onClick={() => setSelectedVariant(variation)}
                  >
                    {variants[variation].addon_item_value}
                  </button>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="single-product-variants__container">
          {Object.keys(variants).map(variation =>
            variants[variation].image ? (
              <button
                key={variation}
                className={`${
                  selectedVariation === variation &&
                  'border shadow rounded overflow-hidden border-main-color'
                }`}
                onClick={() => setSelectedVariant(variation)}
              >
                <img
                  alt={variants[variation].id}
                  src={`${process.env.REACT_APP_IMAGES_URL}/small/${variants[variation].image}`}
                />
                <h1 className="mt-1 text-sm font-semibold">
                  {variants[variation].addon_item_value}
                </h1>
              </button>
            ) : (
              <button
                className={`${
                  selectedVariation === variation &&
                  'bg-main-color text-main-text'
                } p-2 uppercase border flex items-center justify-center`}
                onClick={() => setSelectedVariant(variation)}
              >
                {variants[variation].addon_item_value}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
