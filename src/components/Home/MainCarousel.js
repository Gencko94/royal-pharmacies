import React from 'react';
import Slider from 'react-slick';

import { DataProvider } from '../../contexts/DataContext';
import { useMediaQuery } from 'react-responsive';
import ContentLoader from 'react-content-loader';
const MainCarousel = React.memo(() => {
  const {
    mainCarouselItemsDesktop,
    mainCarouselItemsMobile,
  } = React.useContext(DataProvider);
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 668px)' });
  const data = isTabletOrAbove
    ? mainCarouselItemsDesktop
    : mainCarouselItemsMobile;
  const settings = {
    className: '',
    dots: true,
    centerMode: true,
    centerPadding: '50px',
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
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
  const [items, setItems] = React.useState(null);
  React.useEffect(() => {
    setTimeout(() => {
      setItems(data);
    }, 5000);
  }, [data]);
  return (
    <div className="my-6 bg-nav-secondary">
      <Slider className="bg-nav-secondary" {...settings}>
        {data.map((item, i) => {
          return (
            <div key={i} className="px-0 md:px-1">
              {!items && (
                <ContentLoader
                  speed={2}
                  viewBox="0 0 900 200"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="0" y="0" rx="5" ry="5" width="100%" height="200" />
                </ContentLoader>
              )}
              {items && (
                <img
                  src={item.src}
                  alt="something"
                  className=" md:rounded w-full h-full "
                />
              )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
});
export default MainCarousel;
