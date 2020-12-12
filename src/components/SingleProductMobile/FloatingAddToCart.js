import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import { useIntl } from 'react-intl';
import { MoonLoader } from 'react-spinners';
import { DataProvider } from '../../contexts/DataContext';

export default function FloatingAddToCart({
  quantity,
  setQuantity,
  itemInCart,
  handleAddToCart,

  data,
  addToCartButtonLoading,
  selectedOption,
  selectedVariation,
}) {
  const { deliveryCountry } = React.useContext(DataProvider);

  const handleSubstractQuantity = () => {
    if (parseInt(quantity) === 1) {
      return;
    }
    setQuantity(parseInt(quantity) - 1);
  };
  const handleAddQuantity = () => {
    setQuantity(parseInt(quantity) + 1);
  };

  const { formatMessage, locale } = useIntl();
  const variants = {
    hidden: {
      y: '100%',
    },
    visible: {
      y: 0,
      transition: {
        type: 'tween',
        // duration: 200,
      },
    },
    exited: {
      y: '100%',
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className={`floating-button border-t bg-second-nav-text-light`}
    >
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
          onChange={e => setQuantity(e.target.value)}
          className="mx-1 px-2 py-1 border rounded"
          style={{ maxWidth: '40px', textAlign: 'center' }}
        />
        <button onClick={handleAddQuantity} className="p-1">
          <AiOutlinePlusCircle className={`w-6 h-6 text-blue-700`} />
        </button>
      </div>
      <div className="p-1 text-center mx-1">
        {data.new_variation_addons[selectedVariation].options
          ? data.new_variation_addons[selectedVariation].options[
              selectedOption[selectedVariation]
            ].promotion_price
            ? quantity *
              data.new_variation_addons[selectedVariation].options[
                selectedOption[selectedVariation]
              ].promotion_price
            : quantity *
              data.new_variation_addons[selectedVariation].options[
                selectedOption[selectedVariation]
              ].price
          : data.new_variation_addons[selectedVariation].promotion_price
          ? quantity *
            data.new_variation_addons[selectedVariation].promotion_price
          : quantity * data.new_variation_addons[selectedVariation].price}
        <span className="mx-1">
          {deliveryCountry?.currency.translation[locale].symbol}
        </span>
      </div>
      <button
        onClick={() => {
          if (itemInCart) {
            return;
          } else {
            handleAddToCart({ id: data.id, quantity });
          }
        }}
        className={`${
          addToCartButtonLoading ? 'bg-gray-300' : 'bg-green-700'
        } flex-1 text-body-light uppercase text-sm py-2 px-2 rounded   flex items-center justify-center font-semibold`}
      >
        {addToCartButtonLoading ? (
          <MoonLoader size={19} color="#b72b2b" />
        ) : itemInCart ? (
          <>
            <span>
              <TiShoppingCart className="w-25p h-25p " />
            </span>
            <h1 className="mx-2 whitespace-no-wrap">
              {formatMessage({ id: 'added-to-cart' })}
            </h1>
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
    </motion.div>
  );
}
