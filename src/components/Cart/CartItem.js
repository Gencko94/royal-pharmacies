import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import LazyImage from '../../helpers/LazyImage';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { AuthProvider } from '../../contexts/AuthContext';
export default function CartItem({ item }) {
  const [
    removefromCartButtonLoading,
    setRemoveFromCartButtonLoading,
  ] = React.useState(false);
  const [itemInWishlist, setItemInWishlist] = React.useState(false);
  const {
    editCartMutation,
    addToWishListMutation,
    removeFromWishListMutation,
    removeFromCartMutation,
    coupon,
  } = React.useContext(CartAndWishlistProvider);
  const { userId } = React.useContext(AuthProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const [quantity, setQuantity] = React.useState(item.qty);
  const [editLoading, setEditLoading] = React.useState(false);
  const { formatMessage, locale } = useIntl();
  const handleSubstractQuantity = () => {
    if (parseInt(quantity) === 1) {
      return;
    }
    setQuantity(parseInt(quantity) - 1);
  };
  const handleAddQuantity = () => {
    if (quantity === item.options.max_quantity) {
      return;
    }
    setQuantity(parseInt(quantity) + 1);
  };
  const handleRemoveItemFromCart = async (id, cart_id) => {
    setRemoveFromCartButtonLoading(id);
    try {
      await removeFromCartMutation({
        id,
        userId,
        cart_id,
        deliveryCountry,
        coupon,
      });
      setRemoveFromCartButtonLoading(null);
    } catch (error) {
      setRemoveFromCartButtonLoading(null);
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
  const handleEditItemFromCart = async (cartId, itemId, quantity) => {
    if (
      quantity > item.options.max_quantity ||
      quantity === 0 ||
      item.qty === quantity
    )
      return;
    setEditLoading(true);
    try {
      await editCartMutation({ cartId, itemId, userId, quantity, coupon });
      setEditLoading(false);
    } catch (error) {
      setEditLoading(false);
    }
  };
  const handleRemoveItemFromWishlist = async id => {
    try {
      await removeFromWishListMutation({ id, userId });

      setItemInWishlist(false);
    } catch (error) {}
  };
  const handleAddItemToWishlist = async item => {
    try {
      await addToWishListMutation({ id: item.id, userId });
      setItemInWishlist(true);
    } catch (error) {}
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
          <span className="text-yellow-700">
            {formatMessage({ id: 'two-items-left' })}
          </span>
        );

      default:
        return (
          <span className=" text-yellow-700">
            {n} {formatMessage({ id: 'items-left' })}
          </span>
        );
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
      <Link to={`/${locale}/products/${item.slug}/${item.id}`}>
        <LazyImage
          src={item.image}
          origin="original"
          alt={item[`name_${locale}`]}
          height="125px"
        />
      </Link>
      <div className="">
        <Link to={`/${locale}/products/${item.slug}/${item.id}`}>
          <h1 className="font-semibold ">{`${item[`name_${locale}`]}${
            item.options.addons
              ? ` - ${Object.keys(item.options.addons)
                  .map(variation => item.options.addons[variation])
                  .join(' - ')}`
              : ''
          }`}</h1>
        </Link>
        <h1 className=" font-semibold text-sm mb-1">
          {item.options.max_quantity < 5 ? (
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
            onClick={() =>
              handleEditItemFromCart(item.cart_id, item.id, quantity)
            }
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
                height={18}
                width={18}
                visible
              />
            ) : (
              formatMessage({ id: 'update-btn' })
            )}
          </button>
        </div>
        <div className="flex text-sm  items-center ">
          <button
            onClick={() => {
              handleRemoveItemFromCart(item.id, item.cart_id);
            }}
            className={`
              bg-main-color
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
                visible
              />
            ) : (
              <>
                <h1 className="mx-2 whitespace-no-wrap">
                  {formatMessage({ id: 'remove-from-cart' })}
                </h1>
              </>
            )}
          </button>
          <button
            onClick={() => {
              if (itemInWishlist) {
                handleRemoveItemFromWishlist(item.id);
              } else {
                handleAddItemToWishlist(item);
              }
            }}
            className={`
              border mx-2
            text-sm p-2 rounded-full uppercase bg-gray-100  flex items-center justify-center font-semibold`}
          >
            {itemInWishlist ? (
              <AiFillHeart
                className={`w-25p h-25p hover:scale-125 text-main-color  transition-all duration-150 `}
              />
            ) : (
              <AiOutlineHeart
                className={`w-25p h-25p hover:scale-125 text-main-color  transition-all duration-150 `}
              />
            )}
          </button>
        </div>
      </div>
      <div className="text-center" style={{ fontWeight: '900' }}>
        {item.price} {deliveryCountry?.currency.translation[locale].symbol}
        {item.message && (
          <h1 className="text-main-color text-xs">
            ({formatMessage({ id: item.message })})
          </h1>
        )}
      </div>
      <div className="text-center text-green-700" style={{ fontWeight: '900' }}>
        {item.total} {deliveryCountry?.currency.translation[locale].symbol}
      </div>
    </motion.div>
  );
}
