import React from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import CategoryChildrenMobile from './CategoryChildrenMobile';
import BannerLazyImage from '../../helpers/BannerLazyImage';
export default function CategoryHeaderMobile({
  categoryInfo,
  categoryInfoLoading,
}) {
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
  const { locale, formatMessage } = useIntl();
  if (categoryInfoLoading) {
    return (
      <>
        <ContentLoader
          speed={4}
          viewBox="0 0 800 300"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="300" />
        </ContentLoader>
        <Swiper
          navigation
          id="main"
          slidesPerView={7}
          spaceBetween={15}
          className="mt-3"
          breakpoints={breakpoints}
        >
          {[0, 1, 2, 3, 4, 5, 6].map(i => {
            return (
              <SwiperSlide key={i} className="my-2">
                <ContentLoader
                  speed={4}
                  viewBox="0 0  171 258.36"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect
                    x="0"
                    y="0"
                    rx="5"
                    ry="5"
                    width="100%"
                    height="258.36"
                  />
                </ContentLoader>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    );
  }
  return (
    <div className="mb-4">
      <BannerLazyImage
        src={categoryInfo.coverMobile?.link}
        origin="original"
        alt={categoryInfo.title[locale].name}
        pb="calc(100% * 300/800)"
      />
      <div className="mt-8 px-2">
        <h1 className="text-2xl font-bold text-center ">
          {`${formatMessage({ id: 'shop' })}  ${
            categoryInfo?.title?.[locale].name
          } `}
          {categoryInfo?.children.length > 0 &&
            formatMessage({ id: 'by-category' })}
        </h1>
      </div>
      {categoryInfo.children.length !== 0 && (
        <CategoryChildrenMobile children={categoryInfo?.children} />
      )}
    </div>
  );
}
