import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../contexts/DataContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default function SideCartMenuItem({ item }) {
  const {
    removeFromCartMutation,
    removeFromGuestCartMutation,
  } = React.useContext(CartAndWishlistProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const { formatMessage, locale } = useIntl();
  const [
    removeFromCartButtonLoading,
    setRemoveFromCartButtonLoading,
  ] = React.useState(false);
  const { userId } = React.useContext(AuthProvider);
  const handleRemoveFromCart = async () => {
    setRemoveFromCartButtonLoading(true);
    try {
      if (userId) {
        const id = item.id;
        const cart_id = item.cart_id;
        await removeFromCartMutation({ id, cart_id, userId, deliveryCountry });
        setRemoveFromCartButtonLoading(false);
      } else {
        const sku = item.options.sku;
        await removeFromGuestCartMutation({ sku, deliveryCountry });
        setRemoveFromCartButtonLoading(false);
      }
    } catch (error) {
      setRemoveFromCartButtonLoading(false);
      console.log(error.response);
    }
  };

  const cartItemVariant = {
    hidden: {
      x: `${locale === 'ar' ? '-100%' : '100%'}`,
    },
    visible: {
      x: '0',
      delay: 3,
    },
    exited: {
      opacity: 0,
    },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exited"
      variants={cartItemVariant}
      className=" side-cart-menu__item mb-2"
    >
      <div className="">
        <Link
          title={`${item[`name_${locale}`]}`}
          className="hover:underline"
          to={`/${locale}/c/${item.id}`}
        >
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/small/${item.image}`}
            alt={`${item[`name_${locale}`]}`}
            className="max-w-full h-auto"
          />
        </Link>
      </div>
      <div className="">
        <Link
          title={`${item[`name_${locale}`]}`}
          className="hover:underline"
          to={`/${locale}/c/${item.id}`}
        >
          <h1 className="text-clamp-2 text-sm font-semibold">
            {`${item[`name_${locale}`]}`}
          </h1>
        </Link>
        <div className="flex items-center">
          <h1 className="text-xs rounded p-1 font-bold  bg-gray-200 inline">
            {item.total} {deliveryCountry?.currency.translation[locale].symbol}
          </h1>
          <h1 className="mx-1 text-sm">
            {formatMessage({ id: 'quantity' })} : {item.qty}
          </h1>
        </div>
        <div>
          <button
            className={`${
              removeFromCartButtonLoading === item.id
                ? 'bg-gray-300'
                : 'bg-main-color text-main-text'
            } text-xs rounded p-1 my-1 uppercase`}
            onClick={() => {
              handleRemoveFromCart();
            }}
          >
            {removeFromCartButtonLoading === item.id ? (
              <Loader
                type="ThreeDots"
                color="#b72b2b"
                height={21}
                width={21}
                visible={true}
              />
            ) : (
              formatMessage({ id: 'remove-from-cart' })
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
