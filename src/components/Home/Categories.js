import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';

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
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          variableWidth: true,
          arrows: false,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-semibold flex-grow">Categories</h1>
        <button className="p-1">See all</button>
      </div>
      <Slider className="" {...settings}>
        {categories.map((item, i) => {
          return (
            <div
              key={i}
              className="px-1 overflow-hidden "
              style={{ width: '300px' }}
            >
              <div className="  overflow-hidden  relative  rounded-lg  ">
                <img
                  src={item.main}
                  alt="something"
                  className=" h-auto w-full rounded mb-0  "
                />
                <span
                  style={{
                    maxWidth: '50%',
                    top: isTabletOrAbove ? '16%' : '10%',
                  }}
                  className="absolute  font-semibold left-10 text-xl sm:text-xl md:text-2xl "
                >
                  {item.title}
                </span>
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
                        className=" mt-2  rounded "
                        style={{
                          backgroundColor: item.color,
                          height: '120px',
                        }}
                      >
                        <div
                          style={{ height: '70px' }}
                          className="pt-2 p-1 flex justify-center items-center"
                        >
                          <img
                            src={photo.src}
                            alt="ima"
                            className="max-w-full max-h-full"
                          />
                        </div>
                        <h1 className="text-center text-xs font-semibold sm:text-xs md:text-sm lg:text-base  ">
                          {photo.title}
                        </h1>
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
