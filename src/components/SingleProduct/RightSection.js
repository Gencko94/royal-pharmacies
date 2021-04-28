import React from 'react';
import {
  AiOutlineHeart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { AiOutlineLock } from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import { MdLocationOn } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { DataProvider } from '../../contexts/DataContext';
import { useIntl } from 'react-intl';
import { AnimatePresence, motion } from 'framer-motion';
export default function RightSection({
  handleAddToCart,
  addToCartButtonLoading,
  addToWishListButtonLoading,
  handleAddToWishList,
  itemInWishList,
  itemInCart,
  userId,
  qty,
}) {
  const handleSubstractQuantity = () => {
    if (parseInt(quantity) === 1) {
      return;
    }
    setQuantity(parseInt(quantity) - 1);
  };
  const handleAddQuantity = () => {
    if (qty === quantity) {
      setQuantity(parseInt(quantity) + 1);
    }
  };
  const handleChangeQuantity = e => {
    if (e.target.value < 1) {
      return;
    } else if (!e.target.value > qty) {
      setQuantity(e.target.value);
    }
  };
  const [quantity, setQuantity] = React.useState(1);
  const { formatMessage, locale } = useIntl();
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const { deliveryCountry } = React.useContext(DataProvider);
  const formatDaysPlural = () => {
    switch (parseInt(deliveryCountry?.delivery_time)) {
      case 1:
        return formatMessage({ id: 'one-day' });

      case 2:
        return formatMessage({ id: 'two-days' });

      case parseInt(deliveryCountry?.delivery_time > 10):
        return formatMessage({ id: 'more-than-10-days' });

      default:
        return formatMessage({ id: 'days' });
    }
  };
  const addToWishList = () => {
    if (!userId) {
      setSnackBarOpen(true);
      setTimeout(() => {
        setSnackBarOpen(false);
      }, 5000);
      return;
    }
    if (itemInWishList) {
      return;
    } else {
      handleAddToWishList();
    }
  };
  return (
    <div
      className="border  p-2 rounded shadow-sm self-start sticky  "
      style={{ top: '108px' }}
    >
      <div className={`rounded`}>
        <div className="flex items-center font-semibold">
          <div className="flex items-center">
            <h1>{formatMessage({ id: 'deliver-to' })}</h1>
            <h1 className="uppercase mx-1">
              {deliveryCountry?.translation[locale].name}
            </h1>
            <MdLocationOn className="w-5 h-5 text-main-color " />
          </div>
        </div>

        <div className="mb-2">
          <div className="flex items-center">
            <h1 className="text-gray-700">
              {formatMessage({ id: 'estimated-delivery' })} :
            </h1>
            <h1 className="mx-1">
              {deliveryCountry?.delivery_time > 2 &&
                deliveryCountry.delivery_time}
              <span className="mx-1">{formatDaysPlural()}</span>
            </h1>
          </div>
        </div>
      </div>

      <hr className="mb-2" />
      <div className=" mr-2 flex justify-center items-center mb-2">
        <h1 className=" mr-2 flex-1 font-semibold">
          {formatMessage({ id: 'quantity' })} :{' '}
        </h1>
        <div className=" flex items-center justify-center">
          <button onClick={handleSubstractQuantity} className="p-1">
            <AiOutlineMinusCircle
              className={`w-6 h-6 ${
                quantity === 1 ? 'text-gray-700' : 'text-blue-700'
              }`}
            />
          </button>
          <input
            value={quantity}
            onChange={handleChangeQuantity}
            className="mx-1 px-2 py-1 border rounded"
            style={{ maxWidth: '40px', textAlign: 'center' }}
          />
          <button onClick={handleAddQuantity} className="p-1">
            <AiOutlinePlusCircle className={`w-6 h-6 text-blue-700`} />
          </button>
        </div>
      </div>
      <hr />
      <div className="text-gray-700 flex items-center justify-center py-2">
        <h1 className="hover:underline cursor-pointer">
          {formatMessage({ id: 'secure-transaction' })}
        </h1>
        <AiOutlineLock className="h-5 w-5 mx-1 " />
      </div>
      <div className="flex flex-col relative">
        <button
          onClick={() => {
            if (itemInCart) {
              return;
            } else {
              handleAddToCart(quantity);
            }
          }}
          disabled={qty === 0}
          className={`
            ${
              qty > 0
                ? 'bg-green-700 text-main-text'
                : 'bg-gray-500 text-gray-200 cursor-not-allowed'
            }
           flex-1   py-2 px-2 rounded mb-2   flex items-center justify-center font-semibold uppercase`}
        >
          {addToCartButtonLoading ? (
            <Loader
              type="ThreeDots"
              color="#fff"
              height={25}
              width={25}
              visible={addToCartButtonLoading}
            />
          ) : itemInCart ? (
            <>
              <span>
                <TiShoppingCart className="w-25p h-25p " />
              </span>
              <h1 className="mx-2 whitespace-no-wrap">
                {formatMessage({ id: 'added-to-cart' })}
              </h1>
            </>
          ) : qty === 0 ? (
            <>
              <span>
                <TiShoppingCart className="w-25p h-25p" />
              </span>
              <h1 className="mx-2">{formatMessage({ id: 'out-of-stock' })}</h1>
            </>
          ) : (
            <>
              <span>
                <TiShoppingCart className="w-25p h-25p" />
              </span>
              <h1 className="mx-2">{formatMessage({ id: 'add-to-cart' })}</h1>
            </>
          )}
        </button>

        <button
          onClick={addToWishList}
          className={`
              border-main-color text-main-color border
           flex-1   py-2 px-2 rounded mb-2   flex items-center justify-center font-semibold uppercase`}
        >
          {addToWishListButtonLoading ? (
            <Loader
              type="ThreeDots"
              color="#b72b2b"
              height={25}
              width={25}
              visible={addToWishListButtonLoading}
            />
          ) : itemInWishList ? (
            <>
              <span>
                <TiShoppingCart className="w-25p h-25p " />
              </span>
              <h1 className="mx-2 whitespace-no-wrap">
                {formatMessage({ id: 'added-to-wishlist' })}
              </h1>
            </>
          ) : (
            <>
              <span>
                <AiOutlineHeart className="w-25p h-25p" />
              </span>
              <h1 className="mx-2">
                {formatMessage({ id: 'add-to-wishlist' })}
              </h1>
            </>
          )}
        </button>
        <AnimatePresence>
          {snackBarOpen && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className="box-arrow text-xs shadow text-center rounded p-2 "
            >
              Please log in to Add
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
