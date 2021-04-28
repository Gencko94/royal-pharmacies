import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useIntl } from 'react-intl';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../contexts/DataContext';
import LazyImage from '../../helpers/LazyImage';
import { Link, useHistory } from 'react-router-dom';
import { calculateDiscountPrice } from '../../helpers/calculateDiscountPrice';
import { BiListPlus } from 'react-icons/bi';
export default function VariantCategoryProductItem({ item, setCartMenuOpen }) {
  const {
    addToCartMutation,
    addToGuestCartMutation,
    coupon,
  } = React.useContext(CartAndWishlistProvider);
  const { formatMessage, locale } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);
  const [showAddButton, setShowAddButton] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);
  const history = useHistory();
  const [selectedVariation, setSelectedVariant] = React.useState(() => {
    return Object.keys(item.new_variation_addons)[0];
  });
  const [selectedOption, setSelectedOption] = React.useState(() => {
    let keys = {};
    Object.keys(item.new_variation_addons).forEach(variation => {
      keys[variation] = 0;
    });
    return keys;
  });
  const { userId } = React.useContext(AuthProvider);

  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    null
  );
  const [message, setMessage] = React.useState('');
  const variantOnly = item.new_variation_addons[selectedVariation].options
    ? false
    : true;
  const option = variantOnly
    ? item.new_variation_addons[selectedVariation]
    : item.new_variation_addons[selectedVariation].options[
        selectedOption[selectedVariation]
      ];
  const isSale = item.new_variation_addons[selectedVariation].options
    ? item.new_variation_addons[selectedVariation].options[
        selectedOption[selectedVariation]
      ].promotion_price
      ? true
      : false
    : item.new_variation_addons[selectedVariation].promotion_price
    ? true
    : false;
  const handleAddToCart = async () => {
    if (option.quantity < 1) {
      setMessage(formatMessage({ id: 'out-of-stock' }));
      return;
    }
    setAddToCartButtonLoading(true);
    if (userId) {
      try {
        const newItem = {
          id: item.id,
          quantity: 1,
          variation: {
            id: item.new_variation_addons?.[selectedVariation].id,
            item_id:
              item.new_variation_addons?.[selectedVariation].addon_item_value,
          },
          option: {
            id:
              item.new_variation_addons?.[selectedVariation].options?.[
                selectedOption[selectedVariation]
              ].id,
            item_id:
              item.new_variation_addons?.[selectedVariation].options?.[
                selectedOption[selectedVariation]
              ].addon_item_value,
          },
        };
        await addToCartMutation({ newItem, userId, deliveryCountry, coupon });
        setAddToCartButtonLoading(false);
        setCartMenuOpen(true);
        setMessage(formatMessage({ id: 'added-to-cart' }));
      } catch (error) {
        if (error.response?.data?.message === 'Item founded on the Cart') {
          setMessage(formatMessage({ id: 'added-to-cart' }));
        }
        setAddToCartButtonLoading(false);
      }
    } else {
      try {
        const price = isSale ? option.promotion_price : option.price;
        const sku = option.sku;
        const newItem = {
          id: item.id,
          quantity: 1,
          variation: {
            id: item.new_variation_addons?.[selectedVariation].id,
            item_id:
              item.new_variation_addons?.[selectedVariation].addon_item_value,
          },
          option: {
            id:
              item.new_variation_addons?.[selectedVariation].options?.[
                selectedOption[selectedVariation]
              ].id,
            item_id:
              item.new_variation_addons?.[selectedVariation].options?.[
                selectedOption[selectedVariation]
              ].addon_item_value,
          },
          price,
          sku,
        };

        await addToGuestCartMutation({ newItem, deliveryCountry, coupon });
        setAddToCartButtonLoading(false);
        setCartMenuOpen(true);
        setMessage(formatMessage({ id: 'added-to-cart' }));
      } catch (error) {
        setAddToCartButtonLoading(false);
      }
    }
  };

  const resolveAddons = () => {
    if (!variantOnly) {
      return Object.keys(item.new_variation_addons)
        .slice(0, 3)
        .map((variation, i) => {
          return item.new_variation_addons[variation].options[
            selectedOption[variation]
          ].image ? (
            <img
              key={i}
              onClick={() => setSelectedVariant(variation)}
              className={`cursor-pointer ${
                selectedVariation === variation && 'border'
              }`}
              alt={item.new_variation_addons[variation].id}
              src={`${process.env.REACT_APP_IMAGES_URL}/small/${
                item.new_variation_addons[variation].options[
                  selectedOption[variation]
                ]?.image
              }`}
            />
          ) : (
            <button
              onClick={() => setSelectedVariant(variation)}
              className={`p-1 ${
                selectedVariation === variation
                  ? 'bg-main-color text-main-text'
                  : ''
              } rounded flex items-center justify-center`}
            >
              {item.new_variation_addons[variation].addon_item_value.substr(
                0,
                1
              )}
            </button>
          );
        });
    } else {
      return Object.keys(item.new_variation_addons)
        .slice(0, 3)
        .map((variation, i) => {
          return item.new_variation_addons[variation].image ? (
            <img
              onClick={() => {
                setSelectedVariant(variation);
              }}
              key={i}
              className={`cursor-pointer ${
                selectedVariation === variation && 'border'
              }`}
              alt={option.id}
              src={`${process.env.REACT_APP_IMAGES_URL}/small/${item.new_variation_addons[variation].image}`}
            />
          ) : (
            <button
              key={i}
              onClick={() => setSelectedVariant(variation)}
              className={`p-1 ${
                selectedVariation === variation
                  ? 'bg-main-color text-main-text'
                  : ''
              } rounded flex items-center justify-center`}
            >
              {item.new_variation_addons[variation].addon_item_value.substr(
                0,
                1
              )}
            </button>
          );
        });
    }
  };
  const resolveImage = () => {
    if (item.new_variation_addons[selectedVariation].options) {
      return (
        <LazyImage
          src={
            item.new_variation_addons[selectedVariation].options[
              selectedOption[selectedVariation]
            ]?.image || item.image.link
          }
          origin="small"
          alt={item.translation[locale].title}
          height="175px"
        />
      );
    } else {
      return (
        <LazyImage
          src={
            item.new_variation_addons[selectedVariation].image ||
            item.image.link
          }
          origin="small"
          alt={item.translation[locale].title}
          height="175px"
        />
      );
    }
  };

  const resolveName = () => {
    const variationName =
      item.new_variation_addons[selectedVariation].addon_item_value;
    return `${item.translation[locale].title} ${variationName}`;
  };
  return (
    <div
      onMouseEnter={() => setShowAddButton(true)}
      onMouseLeave={() => {
        setShowAddButton(false);
        if (showOptions) {
          setShowOptions(false);
        }
      }}
    >
      <div className="relative">
        <Link
          className="block relative"
          to={`/${locale}/products/${item.slug}/${item.id}`}
        >
          {resolveImage()}
          {isSale && option.quantity > 0 && (
            <div
              className={`absolute bg-main-color px-1 text-main-text font-bold top-0   uppercase text-xs ${
                locale === 'ar' ? 'pl-4 right-0' : 'pr-4 left-0'
              }`}
              style={{
                clipPath:
                  locale === 'ar'
                    ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 14% 50%)'
                    : 'polygon(0% 0%, 100% 0, 86% 50%, 100% 100%, 0% 100%)',
              }}
            >
              {calculateDiscountPrice(option.price, option.promotion_price)}{' '}
              {formatMessage({ id: 'off' })}
            </div>
          )}
          {option.quantity < 1 && (
            <div
              className={`absolute bg-main-color  text-main-text font-bold top-0   uppercase text-xs right-0 left-0 text-center`}
            >
              {formatMessage({ id: 'out-of-stock' })}
            </div>
          )}
        </Link>

        <AnimatePresence>
          {showAddButton && option.quantity > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!variantOnly) {
                  setShowOptions(true);
                  setShowAddButton(false);
                  return;
                } else {
                  handleAddToCart();
                }
              }}
              className="flex items-center justify-center absolute w-full bottom-10"
            >
              <button
                className=" flex items-center justify-center rounded uppercase p-2 bg-main-color text-main-text text-sm"
                style={{ width: '110px' }}
              >
                {addToCartButtonLoading ? (
                  <Loader
                    type="ThreeDots"
                    color="#fff"
                    height={21}
                    width={21}
                    visible={true}
                  />
                ) : (
                  formatMessage({ id: 'add-to-cart' })
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 z-2 bg-body-light w-full opacity-75 p-2 border"
            >
              <h1>
                {formatMessage({ id: 'select' })}{' '}
                {
                  item.new_variation_addons[selectedVariation].options?.[
                    selectedOption[selectedVariation]
                  ][`name_${locale}`]
                }
              </h1>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill,minmax(20px,35px))',
                  gap: '0.25rem',
                  marginTop: '0.5rem',
                  marginBottom: '0.5rem',
                  width: '100%',
                }}
              >
                {item.new_variation_addons[selectedVariation].options?.map(
                  (option, i) => {
                    const selected = selectedOption[selectedVariation] === i;
                    return (
                      <button
                        onClick={() =>
                          setSelectedOption(prev => {
                            return {
                              ...prev,
                              [selectedVariation]: i,
                            };
                          })
                        }
                        key={option.addon_item_value}
                        className={`hover:bg-main-color hover:text-main-text transition duration-150 p-2 flex items-center justify-center uppercase border text-sm text-center ${
                          selected
                            ? 'bg-main-color text-main-text'
                            : 'text-body-text-light'
                        } `}
                      >
                        {option.addon_item_value.substr(0, 4)}
                      </button>
                    );
                  }
                )}
              </div>
              <div className="w-full flex justify-center items-center ">
                <button
                  className={`p-2 bg-green-700 rounded text-sm text-main-text flex items-center justify-center `}
                  onClick={handleAddToCart}
                  style={{ width: '80px' }}
                >
                  {addToCartButtonLoading ? (
                    <Loader
                      type="ThreeDots"
                      color="#fff"
                      height={20}
                      width={20}
                      visible={true}
                    />
                  ) : (
                    formatMessage({ id: 'submit' })
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 w-full h-full flex items-center justify-center text-main-text bg-gray-800 text-2xl"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={`bg-body-light text-body-text-light`}>
        <div className="p-2" style={{ height: '55px' }}>
          <Link
            title={item.translation[locale].title}
            className="hover:underline inline-block"
            to={`/${locale}/products/${item.slug}/${item.id}`}
          >
            <h1 className="font-semibold text-xs text-clamp-2">
              {resolveName()}
            </h1>
          </Link>
        </div>

        <div className="p-2 flex items-center justify-between">
          {isSale ? (
            <div className=" flex items-center">
              <h1 className="font-semibold text-lg text-main-color">
                {(
                  option.promotion_price * deliveryCountry?.currency.value
                ).toFixed(3)}
                <span className="mx-1 text-sm">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
              <h1 className=" text-sm mx-1 italic  line-through text-gray-700">
                {(option.price * deliveryCountry?.currency.value).toFixed(3)}
                <span className="">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
            </div>
          ) : (
            <h1 className="font-semibold text-lg text-main-color">
              {(option.price * deliveryCountry?.currency.value).toFixed(3)}
              <span className="mx-1 text-sm">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
            </h1>
          )}
        </div>
        <div
          className="p-1"
          style={{
            display: 'grid',
            gap: '0.2rem',
            gridTemplateColumns: 'repeat(auto-fill,32px)',
          }}
        >
          {resolveAddons()}
          {Object.keys(item.new_variation_addons).length > 3 && (
            <button
              onClick={() =>
                history.push(`/${locale}/products/${item.slug}/${item.id}`)
              }
              title={formatMessage({ id: 'show-more' })}
              className={`p-1  border
               rounded flex items-center justify-center`}
            >
              <BiListPlus className="text-main-color w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
