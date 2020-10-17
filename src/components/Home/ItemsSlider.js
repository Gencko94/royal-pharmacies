import React from 'react';
import Slider from 'react-slick';
import zalo from '../../assets/offers/zalo.png';
import { BsChevronRight } from 'react-icons/bs';
import { BsChevronLeft } from 'react-icons/bs';
import MultiClamp from 'react-multi-clamp';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
// const isItemInCart = data => {
//   const itemInCart = cartItems.find(item => data.id === item.id);
//   if (itemInCart !== undefined) {
//     return true;
//   } else {
//     return false;
//   }
// };
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
const LeftArrow = ({ onClick }) => {
  return (
    <div
      className="hover:bg-gray-300 rounded-full flex justify-center w-8 h-8  lg:h-12 lg:w-12    items-center absolute left-8 top-1/2   z-1 transform -translate-x-1/2 -translate-y-1/2 bg-white transition-colors duration-150 shadow-2xl border border-gray-300"
      onClick={onClick}
    >
      <BsChevronLeft />
    </div>
  );
};

export default function ItemsSlider({
  data,
  miniLogo = false,
  title,
  isLightTheme,
}) {
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
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
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

  const [items, setItems] = React.useState(null);
  React.useEffect(() => {
    setTimeout(() => {
      setItems(data);
    }, 5000);
  });
  return (
    <div className="my-6 overflow-hidden   ">
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-bold ">{title}</h1>
        <button className="py-1 px-2 ml-auto bg-second-nav-light text-second-nav-text-light rounded whitespace-no-wrap">
          See all
        </button>
      </div>
      <Slider className="" {...settings}>
        {data.map((item, i) => {
          return (
            <div key={i} className="my-4  px-2   ">
              {!items && (
                <ContentLoader
                  speed={2}
                  viewBox="0 0 400 480"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect x="0" y="0" rx="5" ry="5" width="100%" height="370" />
                  <rect x="0" y="400" rx="5" ry="5" width="100%" height="30" />
                  <rect x="0" y="450" rx="5" ry="5" width="50%" height="30" />
                </ContentLoader>
              )}
              {items && (
                <div
                  className={`  overflow-hidden flex flex-col relative ${
                    isLightTheme
                      ? 'shadow-itemsSlider-shallow'
                      : 'shadow-itemsSlider'
                  } rounded`}
                >
                  <Link to={`/products/${item.id}`}>
                    <img
                      title={item.name}
                      src={item.photos.small}
                      alt={item.name}
                      className=" w-full object-cover "
                    />
                  </Link>
                  <hr />

                  <div
                    className={`relative flex flex-col  ${
                      miniLogo ? 'pt-8' : 'pt-2'
                    } px-2 py-1 ${
                      isLightTheme
                        ? 'bg-body-light text-body-text-light'
                        : 'bg-body-dark text-body-text-dark'
                    }`}
                    style={{ minHeight: '72px' }}
                  >
                    {miniLogo && (
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
                    )}

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

                    {/* {isItemInCart(item) ? (
                    <button
                      onClick={() => removeItemFromCart(item)}
                      className="bg-red-700 py-1 px-2 mt-2 rounded  text-white flex items-center justify-center font-semibold "
                    >
                      Remove From Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => addItemToCart({ data: item })}
                      className="bg-blue-700 py-1 px-2 mt-2 rounded  text-white flex items-center justify-center font-semibold"
                    >
                      <span>
                        <TiShoppingCart className="w-25p h-25p mr-2" />
                      </span>
                      Add to Cart
                    </button>
                  )} */}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
