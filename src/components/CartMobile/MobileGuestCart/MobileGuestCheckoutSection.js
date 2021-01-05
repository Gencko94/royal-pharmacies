import React from 'react';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { DataProvider } from '../../../contexts/DataContext';
import MobileCheckoutSectionLoader from '../ContentLoaders/MobileCheckoutSectionLoader';
import AcceptedPayments from '../../Cart/AcceptedPayments';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { motion } from 'framer-motion';

export default function MobileGuestCheckoutSection({ setCheckOutPopupOpen }) {
  const {
    guestCartItems,
    guestCartItemsLoading,
    guestCartTotal,
    guestCouponCost,
    guestCartSubtotal,
    checkCouponMutation,
    isCheckingCoupon,
    setCoupon,
    guestShippingCost,
    guestCartItemsFetching,
  } = React.useContext(CartAndWishlistProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const [couponCode, setCouponCode] = React.useState('');
  const [validCoupon, setValidCoupon] = React.useState(false);
  const [couponError, setCouponError] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const { formatMessage, locale } = useIntl();
  const resolvePlural = () => {
    switch (guestCartItems.length) {
      case 1:
        return formatMessage({ id: 'one-item' });

      case 2:
        return formatMessage({ id: 'two-items' });

      case guestCartItems.length > 10:
        return formatMessage({ id: 'more-than-10-items' });
      default:
        return formatMessage({ id: 'multiple-items' });
    }
  };
  const handleCheckout = () => {
    setCheckOutPopupOpen(true);
  };
  const handleSubmitCoupon = async e => {
    e.preventDefault();
    if (validCoupon) {
      setValidCoupon(false);
      setCoupon(null);
      setCouponCode('');
    } else {
      setCouponError(false);

      if (!couponCode) {
        return;
      }
      try {
        await checkCouponMutation({
          code: couponCode,
          subtotal: guestCartSubtotal.toString(),
        });
        setValidCoupon(true);
        setCoupon(couponCode);
      } catch (error) {
        setValidCoupon(false);

        setCouponError(true);
        console.log(error.response);
        if (error.response.data.message === 'Coupon expired') {
          setErrorMessage(formatMessage({ id: 'coupon-expired' }));
        } else if (
          error.response.data.message?.code?.[0] ===
          'The selected code is invalid.'
        ) {
          setErrorMessage(formatMessage({ id: 'coupon-invalid' }));
        } else if (
          error.response.data.message === 'The amount is less then the minimum'
        ) {
          setErrorMessage(formatMessage({ id: 'coupon-conditions-not-met' }));
        }
      }
    }
  };

  if (guestCartItemsLoading) {
    return (
      <div className="-mx-2 -mt-1">
        <MobileCheckoutSectionLoader locale={locale} />
      </div>
    );
  }
  if (!guestCartItemsLoading && guestCartItems.length === 0) return null;
  return (
    <motion.div
      layout
      className="-mx-2 -mt-1 border font-semibold bg-gray-100 p-2 flex justify-center flex-col "
    >
      <div className="mb-2 ">
        <form
          onSubmit={handleSubmitCoupon}
          className={`rounded border w-full flex mb-1  overflow-hidden ${
            couponError && 'border-main-color'
          }`}
        >
          <input
            type="text"
            value={couponCode}
            onChange={e => setCouponCode(e.target.value)}
            placeholder={formatMessage({ id: 'cart-enter-code-or-coupon' })}
            readOnly={validCoupon}
            className={`${
              validCoupon && 'bg-gray-400 text-gray-200'
            } flex-1 placeholder-gray-700  p-2`}
          />
          <button
            type="submit"
            className="bg-main-color flex items-center text-sm justify-center p-2 text-main-text uppercase "
            style={{ width: '70px' }}
          >
            {isCheckingCoupon ? (
              <Loader
                type="ThreeDots"
                color="#fff"
                height={22}
                width={22}
                visible={true}
              />
            ) : validCoupon ? (
              formatMessage({ id: 'remove' })
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
        <h1 className="text-gray-900">{formatMessage({ id: 'cart-total' })}</h1>
        <h1 className="mx-1 whitespace-no-wrap flex-1">
          (
          {locale === 'ar'
            ? guestCartItems.length > 2 && guestCartItems.length
            : `${guestCartItems.length} `}
          {resolvePlural()})
        </h1>
        <h1>{guestCartSubtotal}</h1>
        <span className="mx-1">
          {deliveryCountry?.currency.translation[locale].symbol}
        </span>
      </div>
      <div className="flex items-center mb-2">
        <h1 className="flex-1">{formatMessage({ id: 'delivery-cost' })}</h1>
        <h1>
          {guestShippingCost === 0 ? (
            <span className="text-green-700 uppercase font-semibold">
              {formatMessage({ id: 'cart-free' })}
            </span>
          ) : (
            <span>
              {guestShippingCost}
              <span className="mx-1">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
            </span>
          )}
        </h1>
      </div>
      {validCoupon && (
        <div className="flex text-green-700 items-center mb-2">
          <h1 className=" flex-1">{formatMessage({ id: 'coupon-sale' })}</h1>
          {guestCartItemsFetching ? (
            <Loader
              type="ThreeDots"
              color="#b72b2b"
              height={22}
              width={22}
              visible={true}
            />
          ) : (
            <h1>
              {guestCouponCost}
              <span className="mx-1">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
            </h1>
          )}
        </div>
      )}

      <hr className="mb-3" />
      <div className="  flex mb-2 text-lg " style={{ fontWeight: 900 }}>
        <h1 className="flex-1 text-gray-900">
          {formatMessage({ id: 'subtotal' })}
        </h1>
        {guestCartItemsFetching ? (
          <Loader
            type="ThreeDots"
            color="#b72b2b"
            height={22}
            width={22}
            visible={true}
          />
        ) : (
          <h1 className="text-green-700">
            {guestCartTotal}{' '}
            <span className="mx-1 text-green-700">
              {deliveryCountry?.currency.translation[locale].symbol}
            </span>
          </h1>
        )}
      </div>
      <hr className="mb-3" />
      <button
        onClick={handleCheckout}
        className={`${
          guestCartItems.length === 0
            ? 'cursor-not-allowed  bg-gray-600'
            : 'bg-green-600'
        } p-2 rounded text-body-light uppercase mb-3  `}
        disabled={guestCartItems.length === 0}
      >
        {formatMessage({ id: 'checkout' })}
      </button>
      <AcceptedPayments deliveryCountry={deliveryCountry} />
    </motion.div>
  );
}
