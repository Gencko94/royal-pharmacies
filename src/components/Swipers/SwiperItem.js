import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { AuthProvider } from '../../contexts/AuthContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../contexts/DataContext';
import LazyImage from '../../helpers/LazyImage';

export default function SwiperItem({ item, setCartMenuOpen }) {
  const { formatMessage, locale } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);
  const [showAddButton, setShowAddButton] = React.useState(false);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const { userId } = React.useContext(AuthProvider);
  const [itemInCart, setItemInCart] = React.useState(false);
  const { addToGuestCartMutation, addToCartMutation } = React.useContext(
    CartAndWishlistProvider
  );
  const handleAddToCart = async () => {
    setAddToCartButtonLoading(true);
    if (userId) {
      try {
        const newItem = { id: item.id, quantity: 1 };
        await addToCartMutation({ newItem, userId, deliveryCountry });
        setAddToCartButtonLoading(false);
        setCartMenuOpen(true);
        setItemInCart(true);
      } catch (error) {
        // console.clear();

        console.log(error);
        if (error.response.data.message === 'Item founded on the Cart') {
          setItemInCart(true);
        }
        setAddToCartButtonLoading(false);
      }
    } else {
      try {
        const price = item.simple_addons.promotion_price
          ? item.simple_addons.promotion_price
          : item.simple_addons.price;
        const sku = item.simple_addons.sku;
        const newItem = { id: item.id, quantity: 1, price, sku };
        await addToGuestCartMutation({ newItem, deliveryCountry });
        setAddToCartButtonLoading(false);
        setCartMenuOpen(true);
        setItemInCart(true);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  return (
    <div
      onMouseEnter={() => {
        if (!itemInCart) {
          setShowAddButton(true);
        }
      }}
      onMouseLeave={() => {
        setShowAddButton(false);
      }}
    >
      <div className="relative">
        <a href={`/${locale}/products/${item.slug}/${item.id}`}>
          <LazyImage
            src={item.image?.link}
            alt={item.translation[locale].title}
            pb="calc(100% * 286/210)"
            origin="original"
          />
        </a>
        <AnimatePresence>
          {showAddButton && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleAddToCart}
              className="flex items-center justify-center absolute w-full bottom-10"
            >
              <button className=" text-center rounded uppercase p-2 bg-main-color text-main-text text-sm">
                {addToCartButtonLoading ? (
                  <Loader
                    type="ThreeDots"
                    color="#fff"
                    height={20}
                    width={20}
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
          {itemInCart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 w-full h-full flex items-center justify-center text-main-text bg-gray-800 text-2xl"
            >
              <h1 className="text-center">
                {formatMessage({ id: 'added-to-cart' })} !
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`bg-body-light text-body-text-light`}>
        <div className="p-2" style={{ height: '55px' }}>
          <a
            title={item.translation[locale].title}
            className="hover:underline inline-block"
            href={`/${locale}/products/${item.slug}/${item.id}`}
          >
            <h1 className="text-clamp-2 text-sm font-semibold">
              {item.translation[locale].title}
            </h1>
          </a>
        </div>

        <div className="p-2 flex items-center justify-between">
          {item.simple_addons?.promotion_price ? (
            <div className="flex items-center">
              <h1 className="font-semibold text-lg text-main-color">
                {item.simple_addons.promotion_price}
              </h1>
              <span className="mx-1 text-sm">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
              <h1 className=" text-sm mx-1 italic  line-through text-gray-700">
                {item.simple_addons?.price}
                <span className="">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
            </div>
          ) : (
            <h1 className="font-semibold text-lg text-main-color">
              {item.simple_addons?.price}
              <span className="mx-1 text-sm">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
