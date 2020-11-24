import React from 'react';
import Slider from 'react-slick';

import { useMediaQuery } from 'react-responsive';
import ContentLoader from 'react-content-loader';
import { useQuery } from 'react-query';
import { getMainCarouselItems } from '../../Queries/Queries';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useIntl } from 'react-intl';
const MainCarousel = () => {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 668px)' });
  const { locale } = useIntl();
  const { data, isLoading } = useQuery(
    ['mainCarousel', isTabletOrAbove],
    getMainCarouselItems,
    { refetchOnWindowFocus: false, retry: true }
  );
  const settings = {
    className: '',
    dots: true,
    centerMode: true,
    centerPadding: '50px',
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="my-6 bg-body-light">
      <Slider className="bg-body-light" {...settings}>
        {isLoading &&
          [0, 1, 2].map(i => {
            return (
              <div key={i} className="px-1">
                <ContentLoader
                  speed={4}
                  viewBox={`0 0 900 ${isTabletOrAbove ? '185' : '340'}`}
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect
                    x="0"
                    y="0"
                    rx="5"
                    ry="5"
                    width="100%"
                    height={`${isTabletOrAbove ? '185' : '340'}`}
                  />
                </ContentLoader>
              </div>
            );
          })}
        {!isLoading &&
          data.map(item => {
            return (
              <a
                href={`/categories/${item.category.slug}`}
                key={item.id}
                className="px-0 md:px-1"
              >
                <LazyLoadImage
                  src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.translation[locale].image.link}`}
                  alt="something"
                  effect="blur"
                  className=" md:rounded w-full h-full "
                />
              </a>
            );
          })}
      </Slider>
    </div>
  );
};
export default MainCarousel;
