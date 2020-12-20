import React from 'react';
import { useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';

import { getStaticSwiperData } from '../../Queries/Queries';
import { useQuery } from 'react-query';
import SwiperLoader from '../Home/SwiperLoader';
import SwiperItem from './SwiperItem';
import VariantSwiperItem from './VariantSwiperItem';
SwiperCore.use([Navigation]);
export default function StaticSwiper({ type, cb, title }) {
  const { formatMessage } = useIntl();

  const { data, isLoading } = useQuery(
    ['staticSwiper', type],
    getStaticSwiperData,
    { retry: true, refetchOnWindowFocus: false }
  );

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
    <div className="my-8">
      {isLoading && <div className="mb-4 " style={{ height: '30px' }}></div>}
      {isLoading && <SwiperLoader />}
      {!isLoading && (
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-bold flex-1 ">{title}</h1>
          <button className="py-1 px-2  bg-main-color text-second-nav-text-light rounded whitespace-no-wrap">
            {formatMessage({ id: 'seeAll' })}
          </button>
        </div>
      )}
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
                className={`overflow-hidden   relative my-1 rounded`}
              >
                {item.type === 'simple' ? (
                  <SwiperItem item={item} setCartMenuOpen={cb} />
                ) : (
                  <VariantSwiperItem item={item} setCartMenuOpen={cb} />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
