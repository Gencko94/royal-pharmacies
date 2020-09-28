import React from 'react';
import Slider from 'react-slick';

import { DataProvider } from '../../contexts/DataContext';
import { useMediaQuery } from 'react-responsive';
export default function MainCarousel() {
  const { mainCarouselItems } = React.useContext(DataProvider);
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 668px)' });
  const settings = {
    className: '',
    centerMode: true,
    centerPadding: isTabletOrAbove ? '150px' : '50px',
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: isTabletOrAbove && true,
  };
  return (
    <div className="py-3">
      <Slider className="" {...settings}>
        {mainCarouselItems.map((item, i) => {
          return (
            <div key={i} className="px-1" style={{ width: '400px' }}>
              <img src={item.src} alt="something" className="rounded w-full " />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
