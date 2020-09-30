import React from 'react';
import Slider from 'react-slick';

import { DataProvider } from '../../contexts/DataContext';
import { useMediaQuery } from 'react-responsive';
export default function MainCarousel() {
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
          slidesToScroll: 3,
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
    <div className="md:my-4 my-6">
      <Slider className="" {...settings}>
        {data.map((item, i) => {
          return (
            <div key={i} className="px-0 md:px-1">
              <img
                src={item.src}
                alt="something"
                className=" md:rounded w-full h-full "
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
