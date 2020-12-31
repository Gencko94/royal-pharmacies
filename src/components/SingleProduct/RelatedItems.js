import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import RelatedItem from './RelatedItem';
import VariantRelatedItem from './VariantRelatedItem';
import { useIntl } from 'react-intl';
SwiperCore.use([Navigation]);
export default function RelatedItems({ data }) {
  const { formatMessage } = useIntl();
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
      slidesPerView: 4,
      spaceBetween: 20,
    },
  };
  return (
    <div className=" p-1">
      <h1 className="font-semibold mb-2">
        {formatMessage({ id: 'related-products' })} :
      </h1>
      <Swiper navigation id="main" spaceBetween={3} breakpoints={breakpoints}>
        {data.map(item => {
          return (
            <SwiperSlide
              key={item.id}
              className={`overflow-hidden   relative my-1 rounded`}
            >
              {item.type === 'variation' &&
              Object.entries(item.new_variation_addons).length > 0 ? (
                <VariantRelatedItem item={item} />
              ) : (
                <RelatedItem item={item} />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
