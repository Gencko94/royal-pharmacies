import React from 'react';
import { useIntl } from 'react-intl';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { DataProvider } from '../../contexts/DataContext';
import AcceptedPayments from '../Cart/AcceptedPayments';
import MobileCheckoutSectionLoader from './ContentLoaders/MobileCheckoutSectionLoader';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default function MobileCheckoutSection({ handleCheckout }) {
  const {
    cartItems,
    cartItemsLoading,
    cartTotal,
    couponCost,

    cartSubtotal,
    checkCouponMutation,
    isCheckingCoupon,
  } = React.useContext(CartAndWishlistProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const [couponCode, setCouponCode] = React.useState('');
  const [validCoupon, setValidCoupon] = React.useState(false);
  const [couponError, setCouponError] = React.useState('');
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
  const handleCheckCoupon = async e => {
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
    }
  };
  const { formatMessage, locale } = useIntl();
  if (cartItemsLoading) {
    return (
      <div className="-mx-2 -mt-1">
        <MobileCheckoutSectionLoader locale={locale} />
      </div>
    );
  }
  return (
    <div className="-mx-2 -mt-1 border font-semibold bg-gray-100 p-2 flex justify-center flex-col ">
      <div className="mb-2 ">
        <form
          onSubmit={handleCheckCoupon}
          className="rounded border w-full flex mb-1  overflow-hidden"
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
          <h1 className="text-main-color text-xs">Invalid Coupon</h1>
        )}
      </div>
      <div className="  flex mb-2  ">
        <h1 className="text-gray-900">{formatMessage({ id: 'cart-total' })}</h1>
        <h1 className="mx-1 whitespace-no-wrap flex-1">
          (
          {locale === 'ar'
            ? cartItems.length > 2 && cartItems.length
            : `${cartItems.length} `}
          {resolvePlural()})
        </h1>
        <h1>{cartSubtotal}</h1>{' '}
        {deliveryCountry?.currency.translation[locale].symbol}
      </div>
      <div className="flex items-center mb-2">
        <h1 className=" flex-1">{formatMessage({ id: 'delivery-cost' })}</h1>
        <h1 className="mx-1">
          {deliveryCountry?.delivery_cost === 0 ? (
            <span className="text-green-700 uppercase font-semibold">
              {formatMessage({ id: 'cart-free' })}
            </span>
          ) : (
            deliveryCountry?.delivery_cost
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
      <div className="  flex mb-2 ">
        <h1 className="flex-1 text-gray-900">
          {formatMessage({ id: 'subtotal' })}
        </h1>
        <h1>{cartTotal}</h1>{' '}
        <span className="mx-1">
          {deliveryCountry?.currency.translation[locale].symbol}
        </span>
      </div>
      <button
        onClick={handleCheckout}
        className="p-2 rounded mb-2 font-semibold block text-center uppercase text-sm  w-full text-gray-100 bg-green-600"
      >
        {formatMessage({ id: 'checkout' })}
      </button>
      <AcceptedPayments />
    </div>
  );
}
