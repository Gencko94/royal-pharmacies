import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import zalo from '../../assets/offers/zalo.png';

import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const RightArrow = ({ onClick }) => {
  return (
    <div
      className="hover:bg-gray-300 rounded-full grid place-items-center absolute top-1/2 right-n25 lg:right-n42 w-8 h-8 lg:h-12 lg:w-12 z-1 transform -translate-x-1/2 -translate-y-1/2 bg-white transition duration-150 shadow-2xl border border-gray-300"
      onClick={onClick}
    >
      <BsChevronRight />
    </div>
  );
};
const LeftArrow = ({ className, style, onClick }) => {
  return (
    <div
      className="hover:bg-gray-300 rounded-full flex justify-center w-8 h-8  lg:h-12 lg:w-12    items-center absolute left-8 top-1/2   z-1 transform -translate-x-1/2 -translate-y-1/2 bg-white transition-colors duration-150 shadow-2xl border border-gray-300"
      onClick={onClick}
    >
      <BsChevronLeft />
    </div>
  );
};
export default function RelatedItems({ data }) {
  const settings = {
    className: '',
    arrows: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 4,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="mb-2">
      <div className="mb-1 text-lg font-semibold">
        <h1>You may also like</h1>
      </div>
      <Slider className="" {...settings}>
        {data.map((item, i) => {
          return (
            <div key={i} className="px-2  ">
              <div
                style={{ minHeight: '250px' }}
                className=" bg-white border overflow-hidden flex flex-col relative  rounded-lg shadow-lg "
              >
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.photos.small}
                    alt="something"
                    className=" h-auto w-full  "
                  />
                </Link>

                <div className=" relative flex flex-col pt-8 p-3 bg-white text-black">
                  <img
                    src={zalo}
                    alt="playstore"
                    className="absolute rounded-full shadow-xl "
                    style={{
                      width: '50px',
                      height: '50px',
                      top: '-25px',
                      left: '18px',
                    }}
                  />
                  <h3 className="text-sm lg:text-base sm:text-sm font-semibold truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs line-through text-gray-500  font-bold">
                    {' '}
                    18.99 <span className="">KD</span>
                  </p>
                  <p className="text-base font-bold">
                    {item.price} <span className="text-sm">KD</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
