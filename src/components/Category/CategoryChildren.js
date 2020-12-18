import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import LazyImage from '../../helpers/LazyImage';
SwiperCore.use([Navigation]);
export default function CategoryChildren({ categoryInfo }) {
  const { locale } = useIntl();
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
    <Swiper navigation id="main" className="my-1" breakpoints={breakpoints}>
      {categoryInfo.children.map(child => {
        return (
          <SwiperSlide
            key={child.id}
            className={`overflow-hidden border my-2  relative bg-gray-100
             shadow
            rounded`}
          >
            <Link to={`/${locale}/categories/${child.slug}`}>
              <div className="p-2">
                <LazyImage
                  src={`${process.env.REACT_APP_IMAGES_URL}/original/${child.image?.link}`}
                  alt={child.translation[locale].name}
                  pb="calc(100% * 286/210)"
                />
              </div>
              <h1 className="font-semibold text-center p-1">
                {child.translation[locale].name}
              </h1>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
