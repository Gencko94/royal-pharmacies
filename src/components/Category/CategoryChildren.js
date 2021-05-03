import React from 'react';
import { useIntl } from 'react-intl';
import { NavLink, useParams } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import LazyImage from '../../helpers/LazyImage';

export default function CategoryChildren({ categoryInfo }) {
  const { locale, formatMessage } = useIntl();
  const { category } = useParams();
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
  const resolveChildren = () => {
    if (categoryInfo?.children.length > 0) {
      return categoryInfo.children;
    } else {
      return categoryInfo?.parentChildren;
    }
  };
  return (
    <div>
      <Swiper id="main" className="my-3" breakpoints={breakpoints}>
        {categoryInfo?.children.length > 0 && (
          <SwiperSlide
            key="first"
            className={`overflow-hidden  rounded-lg m-2  relative`}
          >
            <NavLink
              activeClassName="border-l-8  border-main-color"
              isActive={() => {
                if (category === categoryInfo?.slug) return true;
              }}
              to={`/${locale}/category/${categoryInfo?.slug}/${categoryInfo?.id}`}
              className="block rounded-lg overflow-hidden shadow-lg m-2"
            >
              <LazyImage
                src={categoryInfo?.title[locale].image?.link}
                alt={categoryInfo?.title[locale].name}
                pb="calc(100% * 210/210)"
                origin="original"
              />
            </NavLink>
            <h1 className="text-center mt-4 text-lg font-semibold">
              {formatMessage({ id: 'all' })}
            </h1>
          </SwiperSlide>
        )}
        {resolveChildren().map(child => {
          return (
            <SwiperSlide
              key={child.id}
              className={`overflow-hidden  rounded-lg m-2  relative 
             
            `}
            >
              <NavLink
                activeClassName="border-l-8  border-main-color"
                isActive={() => {
                  if (category === child?.slug) return true;
                }}
                to={`/${locale}/category/${child.slug}/${child.id}`}
                className="block rounded-lg overflow-hidden shadow-lg m-2"
                replace={categoryInfo?.children.length === 0}
              >
                <LazyImage
                  src={child.translation[locale].image?.link}
                  alt={child.translation[locale].name}
                  pb="calc(100% * 210/210)"
                  origin="original"
                />
              </NavLink>
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
