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
import { Link } from 'react-router-dom';
SwiperCore.use([Navigation]);
export default function StaticSwiper({ type, cb, title }) {
  const { formatMessage, locale } = useIntl();

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
          <h1 className="text-xl flex-1 " style={{ fontWeight: '900' }}>
            {data?.title[locale]?.name}
          </h1>
          {type !== 'latest_products' && type !== 'best_seller' && (
            <Link
              to={`/${locale}/${data?.slug}`}
              className="py-1 px-2  bg-main-color text-second-nav-text-light rounded whitespace-no-wrap"
              style={{ fontWeight: '900' }}
            >
              {formatMessage({ id: 'seeAll' })}
            </Link>
          )}
        </div>
      )}
      {!isLoading && (
        <Swiper
          navigation
          id="main"
          spaceBetween={10}
          breakpoints={breakpoints}
        >
          {data.products.map(item => {
            return (
              <SwiperSlide
                key={item.id}
                className={`overflow-hidden   relative my-2 rounded`}
              >
                {item.type === 'variation' &&
                Object.entries(item.new_variation_addons).length > 0 ? (
                  <VariantSwiperItem item={item} setCartMenuOpen={cb} />
                ) : (
                  <SwiperItem item={item} setCartMenuOpen={cb} />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
