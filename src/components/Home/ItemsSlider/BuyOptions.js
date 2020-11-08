import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { MoonLoader } from 'react-spinners';

export default function BuyOptions({
  data,
  setQuantity,
  options: { size, quantity },
  setSize,
  handleAddItemToCart,
  handleRemoveItemFromCart,
  isItemInCart,
  loadingButton,
}) {
  const { formatMessage } = useIntl();
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  const buyOptionsVariants = {
    hidden: {
      // opacity: 0,
      clipPath: ' circle(5% at 87% 93%)',
    },
    visible: {
      clipPath: ' circle(72.5% at 50% 50%)',
      // opacity: 1,
    },
    exited: {
      clipPath: ' circle(5% at 87% 93%)',
    },
  };
  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleSubstractQuantity = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };
  return (
    <motion.div
      variants={buyOptionsVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="buy-options__itemslider"
    >
      <div className="p-1">
        <h1 className="text-sm font-semibold text-center text-body-light">
          {formatMessage({ id: 'slider.buy-options' })}
        </h1>
      </div>
      <hr />
      <div className="px-2 py-1 text-sm  text-body-light font-bold text-center ">
        <h1 className="">{formatMessage({ id: 'size' })}</h1>
      </div>
      <div className="px-2  flex items-center justify-center flex-wrap text-xs">
        {sizes.map(unit => {
          return (
            <button
              key={unit}
              onClick={() => setSize(unit)}
              className={`w-6 h-6 uppercase  font-semibold rounded p-1 flex items-center justify-center transition duration-150 m-1  shadow-itemsSlider-shallow ${
                size === unit
                  ? 'bg-buy-options-main shadow-itemsSlider-shallow text-main-text'
                  : 'bg-body-light  text-body-text-light'
              } `}
            >
              {unit}
            </button>
          );
        })}
      </div>
      <div className="p-1">
        <h1 className="text-sm font-semibold text-center text-body-light">
          {formatMessage({ id: 'quantity' })}
        </h1>
      </div>

      <div className="px-2 flex items-center justify-center">
        <button
          onClick={handleSubstractQuantity}
          className="rounded-full bg-body-light text-body-text-light p-1"
        >
          <AiOutlineMinus className="w-5 h-5" />
        </button>
        <div className="mx-2 rounded px-4 py-1 bg-body-light">{quantity}</div>
        <button
          onClick={handleAddQuantity}
          className="rounded-full bg-body-light text-body-text-light p-1"
        >
          <AiOutlinePlus className="w-5 h-5" />
        </button>
      </div>
      <div className="px-2 mt-auto">
        <button
          onClick={() => {
            if (isItemInCart(data.id)) {
              console.log('deleteeeeeee');
              handleRemoveItemFromCart(data.id);
            } else {
              handleAddItemToCart(data);
            }
          }}
          className={`${
            loadingButton === data.id
              ? 'bg-gray-300'
              : isItemInCart(data.id)
              ? 'bg-main-color'
              : 'bg-blue-700'
          } flex-1 text-main-text  p-2 my-1 rounded-lg text-sm w-full   flex items-center justify-center font-semibold`}
        >
          {loadingButton === data.id ? (
            <MoonLoader size={15} color="#b72b2b" />
          ) : isItemInCart(data.id) ? (
            <>
              <h1 className="whitespace-no-wrap">
                {formatMessage({ id: 'remove-from-cart' })}
              </h1>
            </>
          ) : (
            <>
              <h1 className="mx-2">{formatMessage({ id: 'add-to-cart' })}</h1>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
