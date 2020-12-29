import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useIntl } from 'react-intl';
// import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Link } from 'react-router-dom';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../../contexts/DataContext';
import LazyImage from '../../../helpers/LazyImage';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default function GuestCartItem({ item }) {
  const { deliveryCountry } = React.useContext(DataProvider);
  const {
    removeFromGuestCartMutation,
    editGuestCartMutation,
  } = React.useContext(CartAndWishlistProvider);
  console.log(item);
  const [quantity, setQuantity] = React.useState(item.qty);
  const [editLoading, setEditLoading] = React.useState(false);
  const [
    removefromCartButtonLoading,
    setRemoveFromCartButtonLoading,
  ] = React.useState(false);
  const { formatMessage, locale } = useIntl();
  const formatItemsPlural = n => {
    switch (n) {
      case 0:
        return (
          <span className="text-main-color">
            {formatMessage({ id: 'no-items-left' })}
          </span>
        );
      case 1:
        return (
          <span className=" text-yellow-700">
            {formatMessage({ id: 'one-item-left' })}
          </span>
        );

      case 2:
        return (
          <span className="text-yellow-700">
            {formatMessage({ id: 'two-items-left' })}
          </span>
        );

      case n > 10:
        return (
          <span className="  text-yellow-700">
            {' '}
            {n} {formatMessage({ id: 'more-than-10-items-left' })}
          </span>
        );

      default:
        return (
          <span className="  text-yellow-700">
            {n} {formatMessage({ id: 'items-left' })}
          </span>
        );
    }
  };
  const handleSubstractQuantity = () => {
    if (parseInt(quantity) === 1) {
      return;
    }
    setQuantity(parseInt(quantity) - 1);
  };
  const handleAddQuantity = () => {
    setQuantity(parseInt(quantity) + 1);
  };
  const handleChangeQuantity = e => {
    console.log(e.target.value);
    if (e.target.value < 1) {
      return;
    } else {
      if (e.target.value > item.options.max_quantity) {
        return;
      } else {
        setQuantity(e.target.value);
      }
    }
  };
  const handleEditItemFromCart = async (sku, price) => {
    if (
      quantity > item.options.max_quantity ||
      quantity === 0 ||
      item.qty === quantity
    )
      return;
    setEditLoading(true);
    try {
      await editGuestCartMutation({ sku, quantity, price, deliveryCountry });
      setEditLoading(false);
    } catch (error) {
      setEditLoading(false);
      console.log(error);
    }
  };
  const handleRemoveItemFromCart = async sku => {
    setRemoveFromCartButtonLoading(true);
    try {
      await removeFromGuestCartMutation({ sku, deliveryCountry });
    } catch (error) {
      console.log(error);
    }
  };
  const variant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exited: {
      x: 300,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };
  return (
    <motion.div
      layout
      variants={variant}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="cart-item py-2 border-b"
    >
      <Link to={`/${locale}/products/c/${item.id}`}>
        <LazyImage
          src={item.image}
          origin="original"
          alt={item[`name_${locale}`]}
          pb="calc(100% * 286/210)"
        />
      </Link>
      <div className="">
        <Link to={`/${locale}/products/c/${item.id}`}>
          <h1 className="font-semibold ">{`${item[`name_${locale}`]}${
            item.options.addons.length !== 0
              ? ` - ${Object.keys(item.options.addons)
                  .map(variation => item.options.addons[variation])
                  .join(' - ')}`
              : ''
          }`}</h1>
        </Link>
        <h1 className=" font-semibold text-sm mb-1">
          {item.options.max_quantity < 20 ? (
            formatItemsPlural(item.options.max_quantity)
          ) : (
            <span className="text-green-700">
              {formatMessage({ id: 'in-stock' })}
            </span>
          )}
        </h1>
        <div className="flex items-center mb-2 ">
          <h1 className=" font-semibold">
            {formatMessage({ id: 'quantity' })}
          </h1>
          <div className=" flex items-center justify-center mx-3">
            <button onClick={handleSubstractQuantity} className="p-1">
              <AiOutlineMinusCircle
                className={`w-6 h-6 ${
                  quantity === 1 ? 'text-gray-700' : 'text-blue-700'
                }`}
              />
            </button>
            <input
              type="number"
              value={quantity}
              onChange={handleChangeQuantity}
              className="mx-1 px-2 py-1 border rounded"
              style={{ maxWidth: '50px', textAlign: 'center' }}
            />
            <button onClick={handleAddQuantity} className="p-1">
              <AiOutlinePlusCircle className={`w-6 h-6 text-blue-700`} />
            </button>
          </div>
          <button
            onClick={() => handleEditItemFromCart(item.options.sku, item.price)}
            style={{ width: '50px' }}
            disabled={
              quantity > item.options.max_quantity ||
              quantity === 0 ||
              item.qty === quantity
            }
            className={`p-1 flex items-center justify-center text-xs rounded ${
              quantity > item.options.max_quantity ||
              quantity === 0 ||
              item.qty === quantity
                ? 'bg-gray-600 text-gray-400'
                : 'bg-main-color text-main-text'
            }`}
          >
            {editLoading ? (
              <Loader
                type="ThreeDots"
                color="#fff"
                height={20}
                width={20}
                visible={true}
              />
            ) : (
              formatMessage({ id: 'update-btn' })
            )}
          </button>
        </div>
        <div className="flex text-sm  items-center ">
          <button
            onClick={() => {
              handleRemoveItemFromCart(item.options.sku, item.price);
            }}
            className={`bg-main-color
             text-main-text text-sm flex items-center justify-center  p-2 rounded  font-semibold uppercase `}
            style={{ width: '200px' }}
            disabled={removefromCartButtonLoading}
          >
            {removefromCartButtonLoading ? (
              <Loader
                type="ThreeDots"
                color="#fff"
                height={21}
                width={21}
                visible={true}
              />
            ) : (
              <>
                <h1 className="mx-2 whitespace-no-wrap">
                  {formatMessage({ id: 'remove-from-cart' })}
                </h1>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="text-center font-bold">
        {item.total} {deliveryCountry?.currency.translation[locale].symbol}
      </div>
    </motion.div>
  );
}
