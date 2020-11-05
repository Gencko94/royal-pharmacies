import React from 'react';
import Slider from 'react-slick';
import { BsChevronRight } from 'react-icons/bs';
import { BsChevronLeft } from 'react-icons/bs';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../../contexts/DataContext';
import SliderItem from './SliderItem';

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
  miniLogo = false,
  title,
  isLightTheme,
  type,
}) {
  const { formatMessage, locale } = useIntl();
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
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
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
  const {
    removeItemFromCart,
    addItemToCart,
    getItemsByType,
    getCartItems,
  } = React.useContext(DataProvider);
  const [cartItems, setCartItems] = React.useState([]);

  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [loadingButton, setLoadingButton] = React.useState(null);

  const isItemInCart = id => {
    const itemInCart = cartItems.find(item => id === item.id);
    if (itemInCart !== undefined) {
      return true;
    } else {
      return false;
    }
  };
  const handleAddItemToCart = data => {
    setLoadingButton(data.id);
    addItemToCart({
      id: data.id,
      photo: data.photos.small,
      quantity: 1,
      price: data.price,
      name: data.name,
    }).then(res => {
      if (res.message === 'ok') {
        setCartItems(res.cartItems);
        setLoadingButton(null);
      }
    });
  };
  const handleRemoveItemFromCart = id => {
    setLoadingButton(id);
    removeItemFromCart(id).then(res => {
      if (res.message === 'ok') {
        setCartItems(res.cartItems);
        setLoadingButton(null);
      }
    });
  };

  React.useEffect(() => {
    getItemsByType(type)
      .then(items => {
        getCartItems().then(res => {
          setData(items);
          setCartItems(res.cartItems);
          setLoading(false);
        });
      })
      .catch(err => console.log(err.message));
  }, [getCartItems, getItemsByType, type]);
  return (
    <div className="my-6 overflow-hidden   ">
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-bold flex-1 ">{title}</h1>
        <button className="py-1 px-2  bg-second-nav-light text-second-nav-text-light rounded whitespace-no-wrap">
          {formatMessage({ id: 'seeAll' })}
        </button>
      </div>
      <Slider className="" {...settings}>
        {loading &&
          [0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} className="px-2 my-4">
              <ContentLoader
                speed={2}
                viewBox="0 0 400 560"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                key={i}
                rtl={locale === 'ar'}
              >
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="370" />
                <rect x="0" y="400" rx="5" ry="5" width="100%" height="30" />
                <rect x="0" y="450" rx="5" ry="5" width="50%" height="30" />
                <rect x="0" y="500" rx="5" ry="5" width="100%" height="50" />
              </ContentLoader>
            </div>
          ))}
        {!loading &&
          data.map((item, i) => {
            return (
              <SliderItem
                key={i}
                loadingButton={loadingButton}
                isItemInCart={isItemInCart}
                data={item}
                handleRemoveItemFromCart={handleRemoveItemFromCart}
                handleAddItemToCart={handleAddItemToCart}
                isLightTheme={isLightTheme}
              />
            );
          })}
      </Slider>
    </div>
  );
}
