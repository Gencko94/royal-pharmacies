import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import MultiClamp from 'react-multi-clamp';

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
    <div className="mb-2 overflow-hidden">
      <div className=" mb-2 p-2">
        <h1 className="text-xl font-bold ">You may also like</h1>
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
                <hr />

                <div className=" relative flex flex-col pt-2 p-3 bg-white text-black">
                  <MultiClamp
                    className="text-sm  font-semibold"
                    clamp={2}
                    ellipsis="..."
                  >
                    <Link
                      title={item.name}
                      className="hover:underline"
                      to={`/products/${item.id}`}
                    >
                      {item.name}
                    </Link>
                  </MultiClamp>

                  <div className="flex items-center">
                    <p className=" mr-3  text-xs font-semibold text-red-700 whitespace-no-wrap">
                      {item.price} <span className="text-xs ">KD</span>
                    </p>
                    {item.sale && (
                      <p className="text-xs  line-through text-gray-500  font-bold whitespace-no-wrap">
                        {' '}
                        {item.priceBefore}{' '}
                        <span className="font-normal">KD</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
