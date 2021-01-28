import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../contexts/DataContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import LazyImage from '../../helpers/LazyImage';
export default function SideCartMenuItem({ item, setSideMenuOpen }) {
  const {
    removeFromCartMutation,
    removeFromGuestCartMutation,
    coupon,
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
        await removeFromCartMutation({
          id,
          cart_id,
          userId,
          deliveryCountry,
          coupon,
        });
        setRemoveFromCartButtonLoading(false);
      } else {
        const sku = item.options.sku;
        await removeFromGuestCartMutation({ sku, deliveryCountry, coupon });
        setRemoveFromCartButtonLoading(false);
      }
    } catch (error) {
      setRemoveFromCartButtonLoading(false);
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
      className=" side-cart-menu__item mb-2 "
    >
      <div className="">
        <Link
          title={`${item[`name_${locale}`]}`}
          to={`/${locale}/products/${item.slug}/${item.id}`}
          onClick={() => setSideMenuOpen(false)}
        >
          <LazyImage
            src={item.image}
            origin="original"
            alt={item[`name_${locale}`]}
            pb="calc(100% * 210/210)"
          />
        </Link>
      </div>
      <div className="">
        <Link
          title={`${item[`name_${locale}`]}`}
          className="hover:underline"
          to={`/${locale}/products/${item.slug}/${item.id}`}
          onClick={() => setSideMenuOpen(false)}
        >
          <h1 className="font-semibold text-clamp-2 text-sm uppercase ">{`${
            item[`name_${locale}`]
          }${
            item.options.addons
              ? ` - ${Object.keys(item.options.addons)
                  .map(variation => item.options.addons[variation])
                  .join(' - ')}`
              : ''
          }`}</h1>
        </Link>
        <div className="flex items-center text-gray-700">
          <div className="flex items-center">
            <h1 className="text-xs font-semibold">
              {formatMessage({ id: 'price' })}
            </h1>
            <h1 className="text-xs font-bold mx-1">
              {item.total}{' '}
              {deliveryCountry?.currency.translation[locale].symbol}
            </h1>
          </div>
          <div className="flex items-center text-xs mx-2">
            <h1 className="font-semibold">{formatMessage({ id: 'qty' })} :</h1>
            <h1 className="mx-1 font-bold">{item.qty}</h1>
          </div>
        </div>
        <div>
          <button
            className={`
                bg-main-color text-main-text
            text-xs rounded p-1 my-1 flex uppercase items-center font-semibold justify-center `}
            style={{ width: '140px' }}
            onClick={handleRemoveFromCart}
          >
            {removeFromCartButtonLoading ? (
              <Loader
                type="ThreeDots"
                color="#fff"
                height={18}
                width={18}
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
