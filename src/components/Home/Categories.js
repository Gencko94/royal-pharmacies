import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import MultiClamp from 'react-multi-clamp';

export default function Categories() {
  const { categories } = React.useContext(DataProvider);
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(min-width: 360px)' });
  const settings = {
    className: '',
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="mb-6 text-body-text-light">
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-semibold flex-grow">Categories</h1>
        <button className="p-1">See all</button>
      </div>
      <Slider className="" {...settings}>
        {categories.map((item, i) => {
          return (
            <div key={i} className="px-1 overflow-hidden ">
              <div className="  overflow-hidden  relative  rounded-lg  ">
                <img
                  src={item.main}
                  alt="something"
                  className=" h-auto w-full rounded mb-0  "
                />
                <h1
                  style={{
                    maxWidth: '50%',
                    top: isTabletOrAbove ? '16%' : '10%',
                  }}
                  className="absolute text-center  font-semibold left-10 text-base sm:text-lg md:text-xl lg:text-2xl "
                >
                  {item.title}
                </h1>
                <div
                  className=""
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit,minmax(50px,1fr)',
                    gap: isMobile ? '6px' : '8px',
                  }}
                >
                  {item.sub.map((photo, j) => {
                    return (
                      <div
                        key={j + i}
                        className=" mt-2 grid grid-cols-1 rounded  justify-center "
                        style={{
                          backgroundColor: item.color,
                          // maxHeight: '120px',
                          minHeight: '120px',
                        }}
                      >
                        <div
                          // style={{ maxHeight: '70px' }}
                          className=" flex justify-center items-center py-1"
                        >
                          <img
                            src={photo.src}
                            alt={photo.title}
                            className="max-w-full h-auto py-1"
                          />
                        </div>
                        <MultiClamp
                          className="text-center text-xs p-1 font-semibold"
                          clamp={2}
                          ellipsis="..."
                        >
                          {photo.title}
                        </MultiClamp>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
