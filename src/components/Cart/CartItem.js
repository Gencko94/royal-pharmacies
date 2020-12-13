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
export default function CartItem({
  item,
  handleRemoveItemFromCart,
  removefromCartButtonLoading,
  handleAddItemToWishlist,
  handleRemoveItemFromWishlist,
  wishlistItems,
}) {
  const { editCartMutation } = React.useContext(CartAndWishlistProvider);
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
    setQuantity(parseInt(quantity) + 1);
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
      await editCartMutation({ cartId, itemId, userId, quantity });
      setEditLoading(false);
    } catch (error) {
      setEditLoading(false);
      console.log(error.response);
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
      <Link to={`/${locale}/c/${item.id}`}>
        <LazyImage
          src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.image}`}
          alt={item[`name_${locale}`]}
          pb="calc(100% * 286/210)"
        />
      </Link>
      <div className="">
        <Link to={`/${locale}/c/${item.id}`}>
          <h1 className="font-semibold ">{`${item[`name_${locale}`]}${
            item.options.addons.length !== 0
              ? ` - ${Object.keys(item.options.addons)
                  .map(variation => item.options.addons[variation])
                  .join(' - ')}`
              : ''
          }`}</h1>
        </Link>
        <h1 className=" font-semibold text-sm mb-1 text-green-700">
          {formatMessage({ id: 'in-stock' })}
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
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
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
              handleRemoveItemFromCart(item.id, item.cart_id);
            }}
            className={`${
              removefromCartButtonLoading === item.id
                ? 'bg-gray-300'
                : 'bg-main-color'
            }  text-main-text text-sm flex items-center justify-center  p-2 rounded  font-semibold uppercase `}
            style={{ width: '200px' }}
            disabled={removefromCartButtonLoading}
          >
            {removefromCartButtonLoading === item.id ? (
              <Loader
                type="ThreeDots"
                color="#b72b2b"
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
          <button
            onClick={() => {
              if (wishlistItems.includes(item.id)) {
                handleRemoveItemFromWishlist(item.id);
              } else {
                handleAddItemToWishlist(item);
              }
            }}
            className={`
              border mx-2
            text-sm p-2 rounded-full uppercase bg-gray-100  flex items-center justify-center font-semibold`}
          >
            {wishlistItems.includes(item.id) ? (
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
      <div className="text-center font-bold">
        {item.total} {deliveryCountry?.currency.translation[locale].symbol}
      </div>
    </motion.div>
  );
}
