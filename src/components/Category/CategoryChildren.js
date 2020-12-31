import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import LazyImage from '../../helpers/LazyImage';

SwiperCore.use([Navigation]);
export default function CategoryChildren({ children, title }) {
  const { locale, formatMessage } = useIntl();
  const breakpoints = {
    // when window width is >= 320px

    640: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    860: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1100: {
      slidesPerView: 6,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 7,
      spaceBetween: 20,
    },
  };

  return (
    <div>
      <div className="flex items-center mt-2">
        <h1 className="text-xl font-bold flex-1 ">
          {formatMessage({ id: 'shop' })} {title?.[locale].name}{' '}
          {formatMessage({ id: 'by-category' })}
        </h1>
      </div>

      <Swiper navigation id="main" className="my-3" breakpoints={breakpoints}>
        {children.map(child => {
          return (
            <SwiperSlide
              key={child.id}
              className={`overflow-hidden border my-2  relative bg-gray-100
             shadow
            rounded`}
            >
              <Link to={`/${locale}/${child.slug}`}>
                <LazyImage
                  src={child.image?.link}
                  alt={child.translation[locale].name}
                  pb="calc(100% * 286/210)"
                  origin="original"
                />

                <h1 className="font-semibold text-center p-1">
                  {child.translation[locale].name}
                </h1>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
