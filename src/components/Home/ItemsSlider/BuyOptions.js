import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default function BuyOptions({
  item,
  handleAddToCart,
  handleRemoveFromCart,
  loadingButton,
  cartItems,
  selectedVariation,
  selectedOption,
  setSelectedOption,
  setSelectedVariant,
}) {
  const { formatMessage, locale } = useIntl();

  const buyOptionsVariants = {
    hidden: {
      clipPath: ' circle(5% at 86% 92%)',
    },
    visible: {
      clipPath: ' circle(72.5% at 50% 50%)',
      transition: {
        type: 'tween',
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exited: {
      clipPath: ' circle(5% at 86% 92%)',
      transition: {
        type: 'tween',
      },
    },
  };
  const childVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exited: {
      opacity: 0,
    },
  };
  const resolveOptions = () => {
    if (item.new_variation_addons[selectedVariation].options) {
      return item.new_variation_addons[selectedVariation].options.map(
        (option, i) => {
          return (
            <button
              key={i}
              onClick={() =>
                setSelectedOption(prev => {
                  return {
                    ...prev,
                    [selectedVariation]: i,
                  };
                })
              }
              className={`w-6 h-6 uppercase  font-semibold rounded p-1 flex items-center justify-center transition duration-150 m-1  shadow-itemsSlider-shallow ${
                i === selectedOption[selectedVariation]
                  ? 'bg-buy-options-main shadow-itemsSlider-shallow text-main-text'
                  : 'bg-body-light  text-body-text-light'
              } `}
            >
              {option.addon_item_value.substr(0, 1)}
            </button>
          );
        }
      );
    } else {
      return Object.keys(item.new_variation_addons).map((variation, i) => {
        return (
          <button
            key={i}
            onClick={() => setSelectedVariant(variation)}
            className={`w-6 h-6 uppercase  font-semibold rounded p-1 flex items-center justify-center transition duration-150 m-1  shadow-itemsSlider-shallow ${
              variation === selectedVariation
                ? 'bg-buy-options-main shadow-itemsSlider-shallow text-main-text'
                : 'bg-body-light  text-body-text-light'
            } `}
          >
            {item.new_variation_addons[variation].addon_item_value.substr(0, 1)}
          </button>
        );
      });
    }
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
        <h1 className="text-xs font-semibold text-center text-body-light truncate">
          {item.translation[locale].title}
        </h1>
      </div>
      <hr />
      <motion.div variants={childVariants}>
        <div className="px-2 py-1 text-sm  text-body-light font-bold text-center ">
          <h1 className="">
            {item.new_variation_addons[selectedVariation].options
              ? item.new_variation_addons[selectedVariation].options[
                  selectedOption[selectedVariation]
                ][`name_${locale}`]
              : item.new_variation_addons[selectedVariation][`name_${locale}`]}
          </h1>
        </div>
        <div className="px-2  flex items-center justify-center flex-wrap text-xs">
          {resolveOptions()}
        </div>
      </motion.div>

      <motion.div variants={{ childVariants }} className="px-2 mt-2 ">
        <button
          onClick={() => {
            if (cartItems.includes(item.id)) {
              handleRemoveFromCart(item.id);
            } else {
              handleAddToCart({ id: item.id, quantity: 1 });
            }
          }}
          className={`${
            loadingButton === item.id
              ? 'bg-gray-300'
              : cartItems.includes(item.id)
              ? 'bg-main-color'
              : 'bg-green-700'
          } flex-1 text-main-text shadow-itemsSlider-shallow uppercase  p-2 rounded-lg text-xs sm:text-sm w-full transition duration-150   flex items-center justify-center font-semibold`}
        >
          {loadingButton === item.id ? (
            <Loader
              type="ThreeDots"
              color="#b72b2b"
              height={21}
              width={21}
              visible={true}
            />
          ) : cartItems.includes(item.id) ? (
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
      </motion.div>
    </motion.div>
  );
}
