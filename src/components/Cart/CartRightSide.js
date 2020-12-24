import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../contexts/DataContext';
import RecentlyViewedVertical from '../RecentlyViewedVertical';
import AcceptedPayments from './AcceptedPayments';
import FeaturedItemsVertical from './FeaturedItemsVertical';
import CartRightSideLoader from './loaders/CartRightSideLoader';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default function CartRightSide({ setCheckOutModalOpen }) {
  const {
    cartItems,
    cartItemsLoading,
    cartTotal,
    couponCost,
    shippingCost,
    cartSubtotal,
    checkCouponMutation,
    isCheckingCoupon,
  } = React.useContext(CartAndWishlistProvider);
  const { userId } = React.useContext(AuthProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const [couponCode, setCouponCode] = React.useState('');
  const [validCoupon, setValidCoupon] = React.useState(false);
  const [couponError, setCouponError] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const history = useHistory();
  const resolvePlural = () => {
    switch (cartItems.length) {
      case 1:
        return formatMessage({ id: 'one-item' });

      case 2:
        return formatMessage({ id: 'two-items' });

      case cartItems.length > 10:
        return formatMessage({ id: 'one-items' });
      default:
        return formatMessage({ id: 'multiple-items' });
    }
  };
  const { formatMessage, locale } = useIntl();
  const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));
  const handleCheckout = () => {
    if (userId) {
      history.push(`/${locale}/checkout`);
    } else {
      setCheckOutModalOpen(true);
    }
  };
  const handleCheckCoupon = async e => {
    setCouponError(false);
    e.preventDefault();
    if (!couponCode) {
      return;
    }
    try {
      await checkCouponMutation({
        code: couponCode,
        subtotal: cartSubtotal.toString(),
      });
      setValidCoupon(true);
    } catch (error) {
      setValidCoupon(false);
      setCouponError(true);
      console.log(error.response);
      if (error.response.data.message === 'Coupon expired') {
        setErrorMessage(formatMessage({ id: 'coupon-expired' }));
      } else if (
        error.response.data.message?.code[0] === 'The selected code is invalid.'
      ) {
        setErrorMessage(formatMessage({ id: 'coupon-invalid' }));
      }
    }
  };
  return (
    <div
      className="font-semibold overflow-hidden  sticky top-0 self-start"
      style={{ top: '110px' }}
    >
      {cartItemsLoading && <CartRightSideLoader locale={locale} />}
      {!cartItemsLoading && cartItems.length !== 0 && (
        <div className=" rounded border bg-gray-100 p-2 flex justify-center flex-col mb-2 ">
          <div className="mb-2 ">
            <form
              onSubmit={handleCheckCoupon}
              className={`rounded border w-full flex mb-1  overflow-hidden ${
                couponError && 'border-main-color'
              }`}
            >
              <input
                type="text"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                placeholder={formatMessage({ id: 'cart-enter-code-or-coupon' })}
                className="flex-1 placeholder-gray-700  p-2"
              />
              <button
                type="submit"
                className="bg-main-color flex items-center justify-center p-2 text-main-text uppercase "
                style={{ width: '60px' }}
              >
                {isCheckingCoupon ? (
                  <Loader
                    type="ThreeDots"
                    color="#fff"
                    height={22}
                    width={22}
                    visible={true}
                  />
                ) : (
                  formatMessage({ id: 'cart-code-button' })
                )}
              </button>
            </form>
            {couponError && (
              <h1 className="text-main-color text-xs">{errorMessage}</h1>
            )}
          </div>
          <div className=" flex mb-2  ">
            <h1 className="text-gray-900">
              {formatMessage({ id: 'cart-total' })}
            </h1>
            <h1 className="mx-1 whitespace-no-wrap flex-1">
              (
              {locale === 'ar'
                ? cartItems.length > 2 && cartItems.length
                : `${cartItems.length} `}
              {resolvePlural()})
            </h1>
            <h1>{cartSubtotal}</h1>
            <span className="mx-1">
              {deliveryCountry?.currency.translation[locale].symbol}
            </span>
          </div>
          <div className="flex items-center mb-2">
            <h1 className="flex-1">{formatMessage({ id: 'delivery-cost' })}</h1>
            <h1>
              {shippingCost === 0 ? (
                <span className="text-green-700 uppercase font-semibold">
                  {formatMessage({ id: 'cart-free' })}
                </span>
              ) : (
                <span>
                  {shippingCost}
                  <span className="mx-1">
                    {deliveryCountry?.currency.translation[locale].symbol}
                  </span>
                </span>
              )}
            </h1>
          </div>
          {validCoupon && (
            <div className="flex items-center mb-2">
              <h1 className="text-gray-900 flex-1">
                {formatMessage({ id: 'coupon-sale' })}
              </h1>
              <h1 className="mx-1">
                {couponCost === 0 ? (
                  <span className="text-green-700 uppercase font-semibold">
                    {formatMessage({ id: 'coupon-sale' })}
                  </span>
                ) : (
                  couponCost
                )}
              </h1>
            </div>
          )}

          <hr className="mb-3" />
          <div className="  flex mb-2 text-lg ">
            <h1 className="flex-1 text-gray-900">
              {formatMessage({ id: 'subtotal' })}
            </h1>
            <h1>{cartTotal}</h1>{' '}
            <span className="mx-1">
              {deliveryCountry?.currency.translation[locale].symbol}
            </span>
          </div>
          <hr className="mb-3" />
          <button
            onClick={handleCheckout}
            className={`${
              cartItems.length === 0
                ? 'cursor-not-allowed  bg-gray-600'
                : 'bg-green-600'
            } p-2 rounded text-body-light uppercase mb-3  `}
            disabled={cartItems.length === 0}
          >
            {formatMessage({ id: 'checkout' })}
          </button>
          <AcceptedPayments deliveryCountry={deliveryCountry} />
        </div>
      )}
      {visitedItems.length > 4 ? (
        <RecentlyViewedVertical visitedItems={visitedItems} />
      ) : (
        <FeaturedItemsVertical />
      )}
    </div>
  );
}
