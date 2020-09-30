import React from 'react';
import Slider from 'react-slick';
import { DataProvider } from '../../contexts/DataContext';
import zalo from '../../assets/offers/zalo.png';
import { TiShoppingCart } from 'react-icons/ti';
import { BsChevronRight } from 'react-icons/bs';
import { BsChevronLeft } from 'react-icons/bs';

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

export default function BestSeller() {
  const { bestSeller } = React.useContext(DataProvider);
  const settings = {
    className: '',
    arrows: true,
    infinite: true,
    slidesToShow: 7,
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
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-semibold flex-grow">Best Sellers</h1>
        <button className="p-1">See all</button>
      </div>
      <Slider className="" {...settings}>
        {bestSeller.map((item, i) => {
          return (
            <div key={i} className="px-2 ">
              <div
                style={{ minHeight: '250px' }}
                className=" bg-white overflow-hidden flex flex-col relative  rounded-lg shadow-lg "
              >
                <img
                  src={item.src}
                  alt="something"
                  className=" h-auto w-full  "
                />

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
                  <h3 className="text-base lg:text-lg sm:text-base font-semibold">
                    Premium Oats
                  </h3>
                  <p className="text-xs line-through text-gray-500  font-bold">
                    {' '}
                    18.99 <span className="">KD</span>
                  </p>
                  <p className="text-base font-bold">
                    18.99 <span className="text-sm">KD</span>
                  </p>
                  <button className="bg-red-500 py-1 px-2 mt-2 rounded text-base text-white flex items-center justify-center font-semibold ">
                    <span>
                      <TiShoppingCart className="w-20p h-20p mr-2" />
                    </span>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
