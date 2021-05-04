import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { AuthProvider } from '../../contexts/AuthContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../contexts/DataContext';
import LazyImage from '../../helpers/LazyImage';
import { Link } from 'react-router-dom';
import { calculateDiscountPrice } from '../../helpers/calculateDiscountPrice';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDebouncedCallback } from 'use-debounce/lib';
import { useMediaQuery } from 'react-responsive';
import { useQueryClient } from 'react-query';
export default function CategoryProductItem({ item, setCartMenuOpen }) {
  const queryClient = useQueryClient();
  const { formatMessage, locale } = useIntl();
  const { deliveryCountry, setMobileCartPopupOpen } = React.useContext(
    DataProvider
  );
  const [addBtnLoading, setAddBtnLoading] = React.useState(false);
  const [showAddButton, setShowAddButton] = React.useState(false);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [modified, setModified] = React.useState(false);
  const { userId } = React.useContext(AuthProvider);

  const [message, setMessage] = React.useState('');
  const [quantity, setQuantity] = React.useState(0);

  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });

  const {
    addToGuestCartMutation,
    addToCartMutation,
    coupon,
    guestCartItems,
    cartItems,
    removeFromGuestCartMutation,
    removeFromCartMutation,
    editGuestCartMutation,
    editCartMutation,
  } = React.useContext(CartAndWishlistProvider);
  const debouncedAddToGuestCart = useDebouncedCallback(
    async ({ newItem, deliveryCountry, coupon }) => {
      await addToGuestCartMutation({ newItem, deliveryCountry, coupon });
      setMessage(formatMessage({ id: 'added-to-cart' }));
    },
    750
  );
  const debouncedAddToCart = useDebouncedCallback(async ({ newItem }) => {
    await addToCartMutation({
      newItem,
      userId,
      deliveryCountry,
      coupon,
    });
    setMessage(formatMessage({ id: 'added-to-cart' }));
    setAddBtnLoading(false);
  }, 0);
  const debouncedEditFromCart = useDebouncedCallback(async ({ quantity }) => {
    const cartId = cartItems?.find(
      i => i.options.sku === item.simple_addons.sku
    );
    await editCartMutation({
      cartId: cartId.cart_id,
      itemId: item.id,
      userId,
      quantity,
      coupon,
    });
    setAddBtnLoading(false);
  }, 0);
  const debouncedEditFromGuestCart = useDebouncedCallback(
    async ({ quantity }) => {
      const price = item.simple_addons.promotion_price
        ? item.simple_addons.promotion_price
        : item.simple_addons.price;
      await editGuestCartMutation({
        sku: item.simple_addons.sku,
        quantity,
        price,
        deliveryCountry,
        coupon,
      });
    },
    750
  );
  const handleSubstractQuantity = async () => {
    console.log();
    if (isTabletOrAbove) {
      if (quantity === 1 || quantity === 0) {
        return;
      }
      setQuantity(parseInt(quantity) - 1);
    } else {
      if (quantity === 0) return;
      if (quantity === 1) {
        if (userId) {
          const cartId = cartItems?.find(
            i => i.options.sku === item.simple_addons.sku
          );
          await removeFromCartMutation({
            id: item.id,
            userId,
            cart_id: cartId.cart_id,
            deliveryCountry,
            coupon,
          });
          setMessage('');
          setQuantity(0);
        } else {
          await removeFromGuestCartMutation({
            sku: item.simple_addons.sku,
            deliveryCountry,
            coupon,
          });
          setMessage('');
          setQuantity(0);
        }
      } else {
        const price = item.simple_addons.promotion_price
          ? item.simple_addons.promotion_price
          : item.simple_addons.price;
        if (userId) {
          setAddBtnLoading(true);
          await debouncedEditFromCart({ quantity: quantity - 1 });
          setQuantity(quantity - 1);
        } else {
          queryClient.setQueryData(
            ['guestCartItems', deliveryCountry, coupon],
            prev => {
              const targetedItem = prev.cartItems.find(
                i => i.options.sku === item.simple_addons.sku
              );
              const targetedIndex = prev.cartItems.find(
                i => i.options.sku === item.simple_addons.sku
              );
              prev.cartItems[targetedIndex] = {
                ...targetedItem,
                qty: quantity - 1,
              };
              return {
                ...prev,

                cartSubtotal: (
                  parseFloat(prev.cartSubtotal) - parseFloat(price)
                ).toFixed(3),
              };
            }
          );
          setQuantity(quantity - 1);
          await debouncedEditFromGuestCart({ quantity: quantity - 1 });
        }
      }
    }
  };

  const handleAddQuantity = async () => {
    if (item.simple_addons.quantity !== quantity) {
      if (!isTabletOrAbove) {
        setMobileCartPopupOpen(true);

        if (userId) {
          try {
            const newItem = { id: item.id, quantity: quantity + 1 };

            if (quantity === 0) {
              setAddBtnLoading(true);
              await debouncedAddToCart({
                newItem,
              });
              setQuantity(parseInt(quantity) + 1);
            } else {
              setAddBtnLoading(true);
              await debouncedEditFromCart({ quantity: quantity + 1 });
              setQuantity(parseInt(quantity) + 1);
            }
            if (isTabletOrAbove) {
              setCartMenuOpen(true);
              setMessage(formatMessage({ id: 'added-to-cart' }));
            }
          } catch (error) {
            if (error.response?.data?.message === 'Item founded on the Cart') {
              setMessage(formatMessage({ id: 'added-to-cart' }));
            } else {
              // setErrorOpen(true);
              // setErrorMessage(
              //   formatMessage({ id: 'something-went-wrong-snackbar' })
              // );
            }
          }
        } else {
          setQuantity(parseInt(quantity) + 1);
          try {
            const price = item.simple_addons.promotion_price
              ? item.simple_addons.promotion_price
              : item.simple_addons.price;
            const sku = item.simple_addons.sku;
            const newItem = { id: item.id, quantity: quantity + 1, price, sku };
            queryClient.setQueryData(
              ['guestCartItems', deliveryCountry, coupon],
              prev => {
                return {
                  ...prev,
                  cartItems: [
                    ...prev.cartItems,
                    {
                      id: item.id,
                      image: item.image.link,
                      message: null,
                      name_ar: item.translation.ar.title,
                      name_en: item.translation.en.title,
                      options: {
                        max_quantity: item.max_quantity,
                        addons: null,
                        sku: item.sku,
                      },
                      price: item.simple_addons.promotion_price
                        ? item.simple_addons.promotion_price
                        : item.simple_addons.price,
                      qty: quantity + 1,
                      slug: item.slug,
                      status: true,
                    },
                  ],
                  cartSubtotal: (
                    parseFloat(prev.cartSubtotal) + parseFloat(price)
                  ).toFixed(3),
                };
              }
            );
            if (quantity === 0) {
              await debouncedAddToGuestCart({
                newItem,
                deliveryCountry,
                coupon,
              });
            } else {
              await debouncedEditFromGuestCart({ quantity: quantity + 1 });
            }
          } catch (error) {
            // setErrorOpen(true);
            // setErrorMessage(
            //   formatMessage({ id: 'something-went-wrong-snackbar' })
            // );
          }
        }
      }
    }
  };
  const handleAddToCart = async () => {
    if (quantity === 0) return;
    if (item.simple_addons?.quantity < 1) {
      setMessage(formatMessage({ id: 'out-of-stock' }));
      return;
    }
    setAddToCartButtonLoading(true);
    if (userId) {
      try {
        const newItem = { id: item.id, quantity };
        await addToCartMutation({ newItem, userId, deliveryCountry, coupon });
        setAddToCartButtonLoading(false);
        if (isTabletOrAbove) {
          setCartMenuOpen(true);
          setMessage(formatMessage({ id: 'added-to-cart' }));
        }
      } catch (error) {
        if (error.response?.data?.message === 'Item founded on the Cart') {
          setMessage(formatMessage({ id: 'added-to-cart' }));
          setAddToCartButtonLoading(false);
        } else {
          setAddToCartButtonLoading(false);
          // setErrorOpen(true);
          // setErrorMessage(
          //   formatMessage({ id: 'something-went-wrong-snackbar' })
          // );
        }
      }
    } else {
      try {
        const price = item.simple_addons.promotion_price
          ? item.simple_addons.promotion_price
          : item.simple_addons.price;
        const sku = item.simple_addons.sku;
        const newItem = { id: item.id, quantity, price, sku };
        await addToGuestCartMutation({ newItem, deliveryCountry, coupon });
        setAddToCartButtonLoading(false);
        if (isTabletOrAbove) {
          setCartMenuOpen(true);
          setMessage(formatMessage({ id: 'added-to-cart' }));
        }
      } catch (error) {
        // setErrorOpen(true);
        // setErrorMessage(formatMessage({ id: 'something-went-wrong-snackbar' }));
        setAddToCartButtonLoading(false);
      }
    }
  };
  React.useEffect(() => {
    if (!modified) {
      if (!isTabletOrAbove) {
        if (userId) {
          if (cartItems) {
            const exists = cartItems?.find(
              i => i.options.sku === item.simple_addons.sku
            );
            if (exists) {
              setQuantity(exists.qty);
            }
            setModified(true);
          }
        } else if (!userId) {
          if (guestCartItems) {
            const exists = guestCartItems?.find(
              i => i.options.sku === item.simple_addons.sku
            );
            if (exists && exists.qty !== quantity) {
              setQuantity(exists.qty);
            }
            setModified(true);
          }
        }
      }
    }
  }, [userId, guestCartItems, cartItems]);
  React.useEffect(() => {
    return () => {
      setMobileCartPopupOpen(false);
    };
  }, []);
  return (
    <div
      onMouseEnter={() => {
        if (!message && isTabletOrAbove) {
          setShowAddButton(true);
        }
      }}
      onMouseLeave={() => {
        if (isTabletOrAbove) {
          setShowAddButton(false);
        }
      }}
    >
      <div className="relative">
        <Link
          className="block relative border rounded"
          to={`/${locale}/products/${item.slug}/${item.id}`}
        >
          <LazyImage
            src={item.image?.link}
            alt={item.translation[locale].title}
            height="175px"
            origin="small"
          />
          {item.simple_addons?.promotion_price &&
            item.simple_addons.quantity > 0 && (
              <div
                className={`absolute bg-green-800 px-1 text-main-text font-bold top-0   uppercase text-xs ${
                  locale === 'ar' ? 'pl-4 right-0' : 'pr-4 left-0'
                }`}
                style={{
                  clipPath:
                    locale === 'ar'
                      ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 14% 50%)'
                      : 'polygon(0% 0%, 100% 0, 86% 50%, 100% 100%, 0% 100%)',
                }}
              >
                {calculateDiscountPrice(
                  item.simple_addons?.price,
                  item.simple_addons?.promotion_price
                )}{' '}
                {formatMessage({ id: 'off' })}
              </div>
            )}
          {item.simple_addons?.quantity < 1 && (
            <div
              className={`absolute bg-main-color  text-main-text font-bold top-0   uppercase text-xs right-0 left-0 text-center`}
            >
              {formatMessage({ id: 'out-of-stock' })}
            </div>
          )}
        </Link>
        <AnimatePresence>
          {showAddButton && item.simple_addons?.quantity > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleAddToCart}
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
          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 w-full h-full flex items-center justify-center text-main-text bg-gray-800 text-2xl"
            >
              <h1 className="text-center">{message}</h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`bg-body-light text-body-text-light`}>
        <div className="p-2" style={{ height: '18px' }}>
          <Link
            title={item.translation[locale].title}
            className="hover:underline inline-block text-main-color underline"
            to={`/${locale}/brands/${item.brand?.slug}`}
          >
            <h1 className="text-clamp-1 text-xs uppercase font-bold">
              {item.brand?.translation[locale].name}
            </h1>
          </Link>
        </div>
        <div className="p-2" style={{ height: '55px' }}>
          <Link
            title={item.translation[locale].title}
            className="hover:underline inline-block"
            to={`/${locale}/products/${item.slug}/${item.id}`}
          >
            <h1 className="text-clamp-2  text-sm uppercase font-semibold">
              {item.translation[locale].title}
            </h1>
          </Link>
        </div>

        <div className="p-2 flex items-center font-bold justify-between">
          {item.simple_addons?.promotion_price ? (
            <div className="flex items-center">
              <h1 className=" text-lg text-main-color">
                {(
                  item.simple_addons.promotion_price *
                  deliveryCountry?.currency.value
                ).toFixed(3)}
              </h1>
              <span className="mx-1 text-sm  text-main-color">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
              <h1 className=" text-xs mx-1 italic line-through text-gray-700">
                {(
                  item.simple_addons?.price * deliveryCountry?.currency.value
                ).toFixed(3)}
                <span className="">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
            </div>
          ) : (
            <h1 className="text-lg text-main-color">
              {(
                item.simple_addons?.price * deliveryCountry?.currency.value
              ).toFixed(3)}
              <span className="mx-1 text-sm">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
            </h1>
          )}
        </div>
        <div className="flex w-full">
          <button
            onClick={handleSubstractQuantity}
            className=" flex-1 p-2 border flex items-center justify-center"
            disabled={addBtnLoading}
          >
            <AiOutlineMinus />
          </button>
          <p className="p-2 flex-1 border-t border-b flex items-center justify-center">
            {quantity}
          </p>
          <button
            onClick={() => {
              handleAddQuantity();
            }}
            disabled={addBtnLoading}
            className="p-2 flex-1 border flex items-center justify-center"
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
}
