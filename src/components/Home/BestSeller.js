import React from 'react';
import Slider from 'react-slick';
import { DataProvider } from '../../contexts/DataContext';
import zalo from '../../assets/offers/zalo.png';
import { TiShoppingCart } from 'react-icons/ti';

export default function BestSeller() {
  const { bestSeller } = React.useContext(DataProvider);
  const settings = {
    className: '',

    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
                style={{ minHeight: '300px' }}
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
