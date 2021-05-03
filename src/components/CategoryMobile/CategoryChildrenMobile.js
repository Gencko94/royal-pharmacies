import React from 'react';
import { useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import { NavLink, useParams } from 'react-router-dom';
import LazyImage from '../../helpers/LazyImage';
export default function CategoryChildrenMobile({ categoryInfo }) {
  const { locale, formatMessage } = useIntl();
  const { category } = useParams();
  SwiperCore.use([Navigation]);
  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 4.25,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 5.25,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 6.25,
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
    <Swiper id="main" className="m-3 " breakpoints={breakpoints}>
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
            className={`overflow-hidden  rounded-lg my-2  relative`}
          >
            <NavLink
              activeClassName="border-l-8  border-main-color"
              isActive={() => {
                if (category === child?.slug) return true;
              }}
              className="block relative shadow-lg rounded-lg m-2 overflow-hidden"
              to={`/${locale}/category/${child.slug}/${child.id}`}
              replace={categoryInfo?.children.length === 0}
            >
              <LazyImage
                src={child.translation[locale].image?.link}
                alt={child.translation[locale].name}
                height="75px"
                origin="original"
              />
            </NavLink>
            <h1 className="text-center mt-3 text-sm  font-semibold">
              {child.translation[locale].name}
            </h1>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
