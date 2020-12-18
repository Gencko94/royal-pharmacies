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
export default function GuestCartItemMobile({ item }) {
  const {
    removeFromGuestCartMutation,
    editGuestCartMutation,
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
      await removeFromGuestCartMutation({ sku, deliveryCountry });
      setRemoveFromCartButtonLoading(false);
    } catch (error) {
      setRemoveFromCartButtonLoading(false);
      console.log(error.response);
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
      console.log(error.response);
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
        <Link to={`/${locale}/item/${item.id}}`}>
          <img
            className=""
            src={`${process.env.REACT_APP_IMAGES_URL}/small/${item.image}`}
            alt={item[`name_${locale}`]}
          />
        </Link>
        <div className="text-sm">
          <Link to={`/${locale}/item/${item.id}}`}>
            <h1 className="font-semibold ">{`${item[`name_${locale}`]}${
              item.options.addons.length !== 0
                ? ` - ${Object.keys(item.options.addons)
                    .map(variation => item.options.addons[variation])
                    .join(' - ')}`
                : ''
            }`}</h1>
          </Link>
          <h1 className=" font-semibold text-green-700">
            {formatMessage({ id: 'in-stock' })}
          </h1>
          <div className="text-main0color font-bold text-base">
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
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                className="mx-1 px-2 py-1 border rounded"
                style={{ maxWidth: '40px', textAlign: 'center' }}
              />
              <button onClick={handleAddQuantity} className="p-1">
                <AiOutlinePlusCircle className={`w-6 h-6 text-blue-700`} />
              </button>
            </div>
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
                height={20}
                width={20}
                visible={true}
              />
            ) : (
              formatMessage({ id: 'update-btn' })
            )}
          </button>
        </div>
      </div>
      <div className="flex justify-center text-sm  items-center my-2 ">
        <button
          onClick={() => {
            handleRemoveItemFromCart(item.options.sku, item.price);
          }}
          className={`${
            removefromCartButtonLoading === item.id
              ? 'bg-gray-300'
              : 'bg-main-color'
          }  text-main-text text-sm flex items-center relative justify-center flex-1 p-2 rounded uppercase  font-semibold`}
        >
          {removefromCartButtonLoading === item.id ? (
            <Loader
              type="ThreeDots"
              color="#b72b2b"
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
