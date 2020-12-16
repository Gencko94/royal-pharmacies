import React from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { useIntl } from 'react-intl';
// import { AuthProvider } from '../../contexts/AuthContext';
// import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../contexts/DataContext';
import LazyImage from '../../helpers/LazyImage';
export default function SwiperItem({ item, setCartMenuOpen }) {
  // const { addToCartMutation, removeFromCartMutation } = React.useContext(
  //   CartAndWishlistProvider
  // );
  const { formatMessage, locale } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);
  const [activeBuyOptions, setActiveBuyOptions] = React.useState(null);
  // const { userId } = React.useContext(AuthProvider);
  // const [itemInCart, setItemInCart] = React.useState(false);
  // const [loadingButton, setLoadingButton] = React.useState(null);
  const handleBuyOptionsToggle = id => {
    if (activeBuyOptions === id) {
      setActiveBuyOptions(null);
      return;
    }
    setActiveBuyOptions(id);
  };
  // const handleAddToCart = async newItem => {
  //   setLoadingButton(newItem.id);
  //   // const newItem = { id:newItem.id, quantity: quantity, size };
  //   try {
  //     await addToCartMutation({ newItem, userId, deliveryCountry });
  //     setCartMenuOpen(true);
  //     setItemInCart(true);
  //     setLoadingButton(null);
  //   } catch (error) {
  //     setLoadingButton(null);
  //     console.error(error.response);
  //   }
  // };
  // const handleRemoveFromCart = async id => {
  //   setLoadingButton(id);
  //   try {
  //     await removeFromCartMutation({ id, userId });
  //     setItemInCart(false);
  //   } catch (error) {
  //     setLoadingButton(null);
  //     console.error(error.response);
  //   }
  // };
  return (
    <div>
      <span className="sale-mini__banner text-xs font-semibold bg-main-color text-main-text px-1 ">
        32% {formatMessage({ id: 'off' })}
      </span>
      <a href={`/${locale}/c/${item.id}`}>
        <LazyImage
          src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.image.link}`}
          alt={item.translation[locale].title}
          pb="calc(100% * 286/210)"
        />
      </a>

      <div className={`bg-body-light text-body-text-light`}>
        <div className="p-2" style={{ height: '55px' }}>
          <a
            title={item.translation[locale].title}
            className="hover:underline inline-block"
            href={`/${locale}/c/${item.id}`}
          >
            <h1 className="text-clamp-2 text-sm font-semibold">
              {item.translation[locale].title}
            </h1>
          </a>
        </div>

        <div className=" p-2 flex items-center justify-between">
          <p className="   text-lg  font-semibold text-main-color whitespace-no-wrap">
            50{' '}
            <span className="text-xs ">
              {deliveryCountry?.currency.translation[locale].symbol}
            </span>
          </p>
          <button
            onClick={() => handleBuyOptionsToggle(item.id)}
            className=" rounded-full relative text-main-text z-3 "
          >
            <TiShoppingCart
              style={{
                height: '20px',
                width: '20px',
              }}
            />
          </button>
        </div>
        <div style={{ minHeight: '40px', padding: '0.5rem' }}></div>
      </div>
    </div>
  );
}
