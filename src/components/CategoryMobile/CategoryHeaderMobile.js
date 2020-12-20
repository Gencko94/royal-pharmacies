import React from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import CategoryChildrenMobile from './CategoryChildrenMobile';
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
    <div>
      <div
        className="h-64 flex items-center justify-center text-6xl"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_IMAGES_URL}/original/${categoryInfo.cover_mobile?.link})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {categoryInfo.translation[locale].name}
      </div>
      {categoryInfo.children.length !== 0 && (
        <CategoryChildrenMobile categoryInfo={categoryInfo} />
      )}
    </div>
  );
}
