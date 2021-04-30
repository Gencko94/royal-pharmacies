import React from 'react';
import { useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import { Link } from 'react-router-dom';
import LazyImage from '../../helpers/LazyImage';
export default function CategoryChildrenMobile({ children }) {
  const { locale } = useIntl();
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
  return (
    <Swiper id="main" className="m-3 " breakpoints={breakpoints}>
      {children.map(child => {
        return (
          <SwiperSlide
            key={child.id}
            className={`overflow-hidden  rounded-lg my-2  relative`}
          >
            <Link
              className="block relative shadow-lg rounded-lg m-2 overflow-hidden"
              to={`/${locale}/category/${child.slug}/${child.id}`}
            >
              <LazyImage
                src={child.translation[locale].image?.link}
                alt={child.translation[locale].name}
                height="75px"
                origin="original"
              />
            </Link>
            <h1 className="text-center mt-3 text-sm  font-semibold">
              {child.translation[locale].name}
            </h1>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
