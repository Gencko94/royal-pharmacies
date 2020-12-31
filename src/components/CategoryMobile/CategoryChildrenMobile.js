import React from 'react';
import { useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import { Link } from 'react-router-dom';
import LazyImage from '../../helpers/LazyImage';
export default function CategoryChildrenMobile({ children, title }) {
  const { locale, formatMessage } = useIntl();
  SwiperCore.use([Navigation]);
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
  };
  return (
    <div>
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-bold flex-1 ">
          {formatMessage({ id: 'shop' })} {title?.[locale].name}{' '}
          {formatMessage({ id: 'by-category' })}
        </h1>
      </div>

      <Swiper navigation id="main" className="my-1" breakpoints={breakpoints}>
        {children.map(child => {
          return (
            <SwiperSlide
              key={child.id}
              className={`overflow-hidden border my-2  relative bg-gray-100
             shadow
            rounded`}
            >
              <Link to={`/${locale}/${child.slug}`}>
                <div className="p-2">
                  <LazyImage
                    src={`${process.env.REACT_APP_IMAGES_URL}/original/${child.translation[locale].image?.link}`}
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
    </div>
  );
}
