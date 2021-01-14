import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { DataProvider } from '../../../contexts/DataContext';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import Ink from 'react-ink';
import LazyImage from '../../../helpers/LazyImage';
export default function GuestCartItemMobile({ item }) {
  const {
    removeFromGuestCartMutation,
    editGuestCartMutation,
    coupon,
  } = React.useContext(CartAndWishlistProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const [quantity, setQuantity] = React.useState(item.qty);
  const [editLoading, setEditLoading] = React.useState(false);
  const [
    removefromCartButtonLoading,
    setRemoveFromCartButtonLoading,
  ] = React.useState(false);
  const { formatMessage, locale } = useIntl();
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
          <span className="text-yellow-700">
            {formatMessage({ id: 'one-item-left' })}
          </span>
        );

      case 2:
        return (
          <span className=" text-yellow-700">
            {formatMessage({ id: 'two-items-left' })}
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
  const handleChangeQuantity = e => {
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
  const handleSubstractQuantity = () => {
    if (parseInt(quantity) === 1) {
      return;
    }
    setQuantity(parseInt(quantity) - 1);
  };
  const handleAddQuantity = () => {
    setQuantity(parseInt(quantity) + 1);
  };

  const handleRemoveItemFromCart = async sku => {
    setRemoveFromCartButtonLoading(true);
    try {
      await removeFromGuestCartMutation({ sku, deliveryCountry, coupon });
      setRemoveFromCartButtonLoading(false);
    } catch (error) {
      setRemoveFromCartButtonLoading(false);
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
      await editGuestCartMutation({
        sku,
        quantity,
        price,
        deliveryCountry,
        coupon,
      });
      setEditLoading(false);
    } catch (error) {
      setEditLoading(false);
    }
  };
  return (
    <motion.div
      layout
      variants={variant}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="border-b "
    >
      <div className="py-2 cart__item-mobile">
        <Link to={`/${locale}/products/${item.slug}/${item.id}}`}>
          <LazyImage
            src={item.image}
            origin="small"
            alt={item[`name_${locale}`]}
            pb="calc(100% * 286/210)"
          />
        </Link>
        <div className="text-sm">
          <Link to={`/${locale}/products/${item.slug}/${item.id}}`}>
            <h1 className="font-semibold ">{`${item[`name_${locale}`]}${
              item.options.addons.length !== 0
                ? ` - ${Object.keys(item.options.addons)
                    .map(variation => item.options.addons[variation])
                    .join(' - ')}`
                : ''
            }`}</h1>
          </Link>
          <h1 className=" font-semibold">
            {item.options.max_quantity < 5 ? (
              formatItemsPlural(item.options.max_quantity)
            ) : (
              <span className="text-green-700">
                {formatMessage({ id: 'in-stock' })}
              </span>
            )}
          </h1>
          <div
            className="text-main-color text-base"
            style={{ fontWeight: '900' }}
          >
            {item.total} {deliveryCountry?.currency.translation[locale].symbol}
          </div>
          <div className=" flex items-center flex-wrap ">
            <h1 className=" font-semibold">
              {formatMessage({ id: 'quantity' })} :{' '}
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
                style={{ maxWidth: '40px', textAlign: 'center' }}
              />
              <button onClick={handleAddQuantity} className="p-1">
                <AiOutlinePlusCircle className={`w-6 h-6 text-blue-700`} />
              </button>
            </div>

            <button
              onClick={() =>
                handleEditItemFromCart(item.options.sku, item.price)
              }
              style={{ width: '50px' }}
              disabled={
                quantity > item.options.max_quantity ||
                quantity === 0 ||
                item.qty === quantity
              }
              className={`p-1 flex items-center justify-center text-xs rounded mt-1 ${
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
                  height={18}
                  width={18}
                  visible={true}
                />
              ) : (
                formatMessage({ id: 'update-btn' })
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-sm  items-center my-2 ">
        <button
          onClick={() => {
            handleRemoveItemFromCart(item.options.sku);
          }}
          className={`
              bg-main-color
            text-main-text text-sm flex items-center relative justify-center flex-1 p-2 rounded uppercase  font-semibold`}
        >
          {removefromCartButtonLoading === item.id ? (
            <Loader
              type="ThreeDots"
              color="#fff"
              height={22}
              width={22}
              visible={true}
            />
          ) : (
            <>
              <Ink background={true} />
              <h1 className="mx-2 whitespace-no-wrap">
                {formatMessage({ id: 'remove-from-cart' })}
              </h1>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
