import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import LazyImage from '../../helpers/LazyImage';
import { Link } from 'react-router-dom';
SwiperCore.use([Navigation]);
export default function Categories() {
  const { categories, categoriesLoading } = React.useContext(DataProvider);
  const { locale, formatMessage } = useIntl();

  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 2.25,
      spaceBetween: 10,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3.5,
      spaceBetween: 15,
    },
    640: {
      slidesPerView: 4.5,
      spaceBetween: 15,
    },
    860: {
      slidesPerView: 6,
      spaceBetween: 15,
    },
    1100: {
      slidesPerView: 8,
      spaceBetween: 15,
    },
    1440: {
      slidesPerView: 10,
      spaceBetween: 15,
    },
  };
  return (
    <div className="my-3 text-body-text-light">
      <div className="flex items-center mb-8">
        <h1 className="text-xl md:text-2xl flex-1 font-bold">
          {formatMessage({ id: 'shop-by-category' })}
        </h1>
      </div>
      <Swiper
        freeMode
        // navigation
        id="main"
        spaceBetween={10}
        breakpoints={breakpoints}
      >
        {categoriesLoading &&
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            return (
              <SwiperSlide key={i} className="overflow-hidden ">
                <ContentLoader
                  speed={2}
                  viewBox="0 0 400 500"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="50%" cy="50%" r="200" width="100%" />
                </ContentLoader>
              </SwiperSlide>
            );
          })}
        {categories &&
          categories.map(item => {
            return (
              <SwiperSlide key={item.id} className="rounded-full">
                <div className="  overflow-hidden  relative ">
                  <Link to={`/${locale}/category/${item.slug}/${item.id}`}>
                    <LazyImage
                      src={item.translation[locale].image?.link}
                      alt={item.translation[locale].name}
                      origin="small"
                      pb="calc(100% * 260/260)"
                    />
                    {/* <div className="flex items-center justify-center p-2 text-sm text-center border-t">
                      <h1 className="">{item.translation[locale].name}</h1>
                    </div> */}
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
