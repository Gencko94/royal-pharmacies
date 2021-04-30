import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { AuthProvider } from '../../contexts/AuthContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../contexts/DataContext';
import LazyImage from '../../helpers/LazyImage';
import { calculateDiscountPrice } from '../../helpers/calculateDiscountPrice';
import { Link } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
export default function SwiperItem({
  item,
  setCartMenuOpen,
  setErrorOpen,
  setErrorMessage,
}) {
  const { formatMessage, locale } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);
  const [showAddButton, setShowAddButton] = React.useState(false);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );

  const { userId } = React.useContext(AuthProvider);

  const [message, setMessage] = React.useState('');
  const [quantity, setQuantity] = React.useState(0);
  const {
    addToGuestCartMutation,
    addToCartMutation,
    coupon,
  } = React.useContext(CartAndWishlistProvider);
  const handleSubstractQuantity = () => {
    if (quantity === 1 || quantity === 0) {
      return;
    }
    setQuantity(parseInt(quantity) - 1);
  };
  const handleAddQuantity = () => {
    console.log(item.simple_addons.quantity, 'q');
    console.log(quantity, 'qq');
    if (item.simple_addons.quantity !== quantity) {
      setQuantity(parseInt(quantity) + 1);
    }
  };
  const handleAddToCart = async () => {
    if (quantity === 0) return;
    if (item.simple_addons?.quantity < 1) {
      setMessage(formatMessage({ id: 'out-of-stock' }));
      return;
    }
    setAddToCartButtonLoading(true);
    if (userId) {
      try {
        const newItem = { id: item.id, quantity };
        await addToCartMutation({ newItem, userId, deliveryCountry, coupon });
        setAddToCartButtonLoading(false);
        setCartMenuOpen(true);
        setMessage(formatMessage({ id: 'added-to-cart' }));
      } catch (error) {
        if (error.response?.data?.message === 'Item founded on the Cart') {
          setMessage(formatMessage({ id: 'added-to-cart' }));
          setAddToCartButtonLoading(false);
        } else {
          setAddToCartButtonLoading(false);
          setErrorOpen(true);
          setErrorMessage(
            formatMessage({ id: 'something-went-wrong-snackbar' })
          );
        }
      }
    } else {
      try {
        const price = item.simple_addons.promotion_price
          ? item.simple_addons.promotion_price
          : item.simple_addons.price;
        const sku = item.simple_addons.sku;
        const newItem = { id: item.id, quantity, price, sku };
        await addToGuestCartMutation({ newItem, deliveryCountry, coupon });
        setAddToCartButtonLoading(false);
        setCartMenuOpen(true);
        setMessage(formatMessage({ id: 'added-to-cart' }));
      } catch (error) {
        setErrorOpen(true);
        setErrorMessage(formatMessage({ id: 'something-went-wrong-snckbar' }));
        setAddToCartButtonLoading(false);
      }
    }
  };

  return (
    <div
      onMouseEnter={() => {
        if (!message) {
          setShowAddButton(true);
        }
      }}
      onMouseLeave={() => {
        setShowAddButton(false);
      }}
    >
      <div className="relative">
        <Link
          className="block relative border rounded"
          to={`/${locale}/products/${item.slug}/${item.id}`}
        >
          <LazyImage
            src={item.image?.link}
            alt={item.translation[locale].title}
            height="175px"
            origin="small"
          />
          {item.simple_addons?.promotion_price &&
            item.simple_addons.quantity > 0 && (
              <div
                className={`absolute bg-green-800 px-1 text-main-text font-bold top-0   uppercase text-xs ${
                  locale === 'ar' ? 'pl-4 right-0' : 'pr-4 left-0'
                }`}
                style={{
                  clipPath:
                    locale === 'ar'
                      ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 14% 50%)'
                      : 'polygon(0% 0%, 100% 0, 86% 50%, 100% 100%, 0% 100%)',
                }}
              >
                {calculateDiscountPrice(
                  item.simple_addons?.price,
                  item.simple_addons?.promotion_price
                )}{' '}
                {formatMessage({ id: 'off' })}
              </div>
            )}
          {item.simple_addons?.quantity < 1 && (
            <div
              className={`absolute bg-main-color  text-main-text font-bold top-0   uppercase text-xs right-0 left-0 text-center`}
            >
              {formatMessage({ id: 'out-of-stock' })}
            </div>
          )}
        </Link>
        <AnimatePresence>
          {showAddButton && item.simple_addons?.quantity > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleAddToCart}
              className="flex items-center justify-center absolute w-full bottom-10"
            >
              <button
                className=" flex items-center justify-center rounded uppercase p-2 bg-main-color text-main-text text-sm"
                style={{ width: '110px' }}
              >
                {addToCartButtonLoading ? (
                  <Loader
                    type="ThreeDots"
                    color="#fff"
                    height={21}
                    width={21}
                    visible={true}
                  />
                ) : (
                  formatMessage({ id: 'add-to-cart' })
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 w-full h-full flex items-center justify-center text-main-text bg-gray-800 text-2xl"
            >
              <h1 className="text-center">{message}</h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`bg-body-light text-body-text-light`}>
        <div className="p-2" style={{ height: '18px' }}>
          <Link
            title={item.translation[locale].title}
            className="hover:underline inline-block text-main-color underline"
            to={`/${locale}/brands/${item.brand?.slug}`}
          >
            <h1 className="text-clamp-1 text-xs uppercase font-bold">
              {item.brand?.translation[locale].name}
            </h1>
          </Link>
        </div>
        <div className="p-2" style={{ height: '55px' }}>
          <Link
            title={item.translation[locale].title}
            className="hover:underline inline-block"
            to={`/${locale}/products/${item.slug}/${item.id}`}
          >
            <h1 className="text-clamp-2  text-sm uppercase font-semibold">
              {item.translation[locale].title}
            </h1>
          </Link>
        </div>

        <div className="p-2 flex items-center font-bold justify-between">
          {item.simple_addons?.promotion_price ? (
            <div className="flex items-center">
              <h1 className=" text-lg text-main-color">
                {(
                  item.simple_addons.promotion_price *
                  deliveryCountry?.currency.value
                ).toFixed(3)}
              </h1>
              <span className="mx-1 text-sm  text-main-color">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
              <h1 className=" text-xs mx-1 italic line-through text-gray-700">
                {(
                  item.simple_addons?.price * deliveryCountry?.currency.value
                ).toFixed(3)}
                <span className="">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
            </div>
          ) : (
            <h1 className="text-lg text-main-color">
              {(
                item.simple_addons?.price * deliveryCountry?.currency.value
              ).toFixed(3)}
              <span className="mx-1 text-sm">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
            </h1>
          )}
        </div>
        <div className="flex w-full">
          <button
            onClick={handleSubstractQuantity}
            className=" flex-1 p-2 border flex items-center justify-center"
          >
            <AiOutlineMinus />
          </button>
          <p className="p-2 flex-1 border-t border-b flex items-center justify-center">
            {quantity}
          </p>
          <button
            onClick={handleAddQuantity}
            className="p-2 flex-1 border flex items-center justify-center"
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
}
