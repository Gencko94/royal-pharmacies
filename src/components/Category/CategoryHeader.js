import React from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import CategoryChildren from './CategoryChildren';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import LazyImage from '../../helpers/LazyImage';
export default function CategoryHeader({ categoryInfo, categoryInfoLoading }) {
  const { locale } = useIntl();
  if (categoryInfoLoading) {
    return (
      <>
        <ContentLoader
          speed={4}
          viewBox="0 0 1440 300"
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
          className="my-3"
          // breakpoints={breakpoints}
        >
          {[0, 1, 2, 3, 4, 5, 6].map(i => {
            return (
              <SwiperSlide key={i} className="my-2">
                <ContentLoader
                  speed={4}
                  viewBox="0 0   171 258.36"
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
    <div>
      <LazyImage
        src={`${process.env.REACT_APP_IMAGES_URL}/original/${categoryInfo.cover_desktop?.link}`}
        alt={categoryInfo.translation[locale].name}
        pb="calc(100% * 300/1440)"
      />
      {categoryInfo.children.length !== 0 && (
        <CategoryChildren categoryInfo={categoryInfo} />
      )}
    </div>
  );
}
