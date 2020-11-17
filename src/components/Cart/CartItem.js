import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { MoonLoader } from 'react-spinners';
import { DataProvider } from '../../contexts/DataContext';

export default function CartItem({
  item,
  handleRemoveItem,
  removeButtonLoading,
}) {
  const { EditItemFromCart } = React.useContext(DataProvider);
  const { formatMessage } = useIntl();
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
      <img className="" src={item.photo} alt={item.name} />
      <div className="">
        <h1 className="font-semibold ">{item.name}</h1>
        <h1 className=" font-semibold text-sm mb-1 text-green-700">
          {formatMessage({ id: 'in-stock' })}
        </h1>
        <div className="flex items-center mb-2">
          <h1 className=" font-semibold">
            {formatMessage({ id: 'quantity' })}
          </h1>
          <select
            value={item.quantity}
            onChange={e => EditItemFromCart(e.target.value, item)}
            className="pr-8 py-0 mx-2 form-select border-gray-400 border rounded"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div className="flex text-sm  items-center mb-2 ">
          <button
            onClick={() => {
              handleRemoveItem(item.id);
            }}
            className={`${
              removeButtonLoading === item.id ? 'bg-gray-300' : 'bg-main-color'
            }  text-main-text text-sm flex items-center justify-center  p-2 rounded  font-semibold uppercase `}
            style={{ width: '160px' }}
          >
            {removeButtonLoading === item.id ? (
              <MoonLoader size={18} color="#b72b2b" />
            ) : (
              <>
                <h1 className="mx-2 whitespace-no-wrap">
                  {formatMessage({ id: 'remove-from-cart' })}
                </h1>
              </>
            )}
          </button>
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="p-2 border uppercase border-main-color  text-main-color font-semibold rounded mx-2"
            style={{ width: '160px' }}
          >
            {formatMessage({ id: 'add-to-wishlist' })}
          </button>
        </div>
      </div>
      <div className="text-center font-bold">
        {item.price * item.quantity} KD
      </div>
    </motion.div>
  );
}
