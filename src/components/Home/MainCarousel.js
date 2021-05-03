import React from 'react';

import { useMediaQuery } from 'react-responsive';
import ContentLoader from 'react-content-loader';
import { useQuery } from 'react-query';
import { getMainCarouselItems } from '../../Queries/Queries';
import { useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import BannerLazyImage from '../../helpers/BannerLazyImage';
SwiperCore.use([Pagination, Autoplay]);
const MainCarousel = () => {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 668px)' });
  const { locale } = useIntl();
  const { data, isLoading } = useQuery(
    ['mainCarousel', isTabletOrAbove],
    getMainCarouselItems,
    { refetchOnWindowFocus: false, retry: true }
  );
  console.log(data);
  return (
    <div className="mb-6 bg-body-light">
      <Swiper
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true, dynamicBullets: true }}
        id="main"
        slidesPerView={1}
        spaceBetween={10}
        centeredSlides
      >
        {isLoading &&
          [0, 1, 2].map(i => {
            return (
              <SwiperSlide key={i} className="">
                <ContentLoader
                  speed={4}
                  viewBox={`0 0 ${isTabletOrAbove ? '1440' : '800'} ${
                    isTabletOrAbove ? '300' : '500'
                  }`}
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect
                    x="0"
                    y="0"
                    rx="5"
                    ry="5"
                    width="100%"
                    height={`${isTabletOrAbove ? '300' : '500'}`}
                  />
                </ContentLoader>
              </SwiperSlide>
            );
          })}
        {!isLoading &&
          data.map(item => {
            return (
              <SwiperSlide key={item.id}>
                <a
                  href={`/${locale}/category/${item.category?.slug}/${item.category?.id}`}
                >
                  <BannerLazyImage
                    src={item.translation[locale].image?.link}
                    alt="something"
                    origin="original"
                    pb={`${
                      isTabletOrAbove
                        ? 'calc(100% * 300/1440)'
                        : 'calc(100% * 500/800)'
                    }`}
                  />
                </a>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};
export default MainCarousel;
