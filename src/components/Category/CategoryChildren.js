import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import LazyImage from '../../helpers/LazyImage';

export default function CategoryChildren({ children }) {
  const { locale } = useIntl();
  const breakpoints = {
    // when window width is >= 320px

    640: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    860: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1100: {
      slidesPerView: 8.25,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 7,
      spaceBetween: 20,
    },
  };

  return (
    <div>
      <Swiper id="main" className="my-3" breakpoints={breakpoints}>
        {children.map(child => {
          return (
            <SwiperSlide
              key={child.id}
              className={`overflow-hidden  rounded-lg m-2  relative 
             
            `}
            >
              <Link
                to={`/${locale}/category/${child.slug}/${child.id}`}
                className="block rounded-lg overflow-hidden shadow-lg m-2"
              >
                <LazyImage
                  src={child.translation[locale].image?.link}
                  alt={child.translation[locale].name}
                  pb="calc(100% * 210/210)"
                  origin="original"
                />
              </Link>
              <h1 className="text-center mt-4 text-lg font-semibold">
                {child.translation[locale].name}
              </h1>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
