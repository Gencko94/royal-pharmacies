import React from 'react';
import { BiRadioCircle, BiRadioCircleMarked } from 'react-icons/bi';
import { useIntl } from 'react-intl';
import knet from '../../../assets/paymentLogos/knet.png';
import mastercard from '../../../assets/paymentLogos/mastercard.png';

import cod from '../../../assets/paymentLogos/cod.png';
import amex from '../../../assets/paymentLogos/amex.png';
import { DataProvider } from '../../../contexts/DataContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
import { Link } from 'react-router-dom';
export default function GuestPersonalInformationMobile({
  handleStepBack,
  guestAddress,
  name,
  phoneNumber,
  setPaymentMethod,
  paymentMethod,
  handleGuestCheckout,
  checkoutLoading,
}) {
  const {
    guestCartItems,
    guestCartSubtotal,
    guestCartTotal,
    guestShippingCost,
    couponCost,
    coupon,
  } = React.useContext(CartAndWishlistProvider);

  const { formatMessage, locale } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);
  const handlePaymentChange = method => {
    setPaymentMethod(method);
  };
  const resolveFlags = () => {
    let arr = [];
    if (!deliveryCountry) return;
    deliveryCountry.payment.forEach(payment => {
      if (payment.status === 0) return null;
      if (payment.key === 'knet') {
        arr.push(
          <button
            key={payment.key}
            onClick={() => handlePaymentChange(payment.key)}
            className={` ${
              paymentMethod === payment.key &&
              'bg-main-color text-main-text border-main-color'
            } mb-3 flex border items-center justify-start rounded p-2 font-semibold`}
          >
            <img src={knet} alt={payment.key} />
            <div className="flex-1 mx-3 text-left">K-net</div>
            <div>
              {paymentMethod === payment.key ? (
                <BiRadioCircleMarked className="w-6 h-6 text-btn-secondary-light" />
              ) : (
                <BiRadioCircle className="w-6 h-6 text-btn-primary-light" />
              )}
            </div>
          </button>
        );
      }
      if (payment.key === 'credit') {
        arr.push(
          <button
            key={payment.key}
            onClick={() => handlePaymentChange(payment.key)}
            className={` ${
              paymentMethod === payment.key &&
              'bg-main-color text-main-text border-main-color'
            } mb-3 flex border items-center justify-start rounded p-2 font-semibold`}
          >
            <img src={mastercard} alt={payment.key} />
            <div className="flex-1 mx-3 text-left">Credit Card</div>
            <div>
              {paymentMethod === payment.key ? (
                <BiRadioCircleMarked className="w-6 h-6 text-btn-secondary-light" />
              ) : (
                <BiRadioCircle className="w-6 h-6 text-btn-primary-light" />
              )}
            </div>
          </button>
        );
      }

      if (payment.key === 'amex') {
        arr.push(
          <button
            key={payment.key}
            onClick={() => handlePaymentChange(payment.key)}
            className={` ${
              paymentMethod === payment.key &&
              'bg-main-color text-main-text border-main-color'
            } mb-3 flex border items-center justify-start rounded p-2 font-semibold`}
          >
            <img src={amex} alt={payment.key} />
            <div className="flex-1 mx-3 text-left">American Express</div>
            <div>
              {paymentMethod === payment.key ? (
                <BiRadioCircleMarked className="w-6 h-6 text-btn-secondary-light" />
              ) : (
                <BiRadioCircle className="w-6 h-6 text-btn-primary-light" />
              )}
            </div>
          </button>
        );
      }
      if (payment.key === 'cod') {
        arr.push(
          <button
            key={payment.key}
            onClick={() => handlePaymentChange(payment.key)}
            className={` ${
              paymentMethod === payment.key &&
              'bg-main-color text-main-text border-main-color'
            } mb-3 flex border items-center justify-start rounded p-2 font-semibold`}
          >
            <img src={cod} alt={payment.key} />
            <div className="flex-1 mx-3 text-left">
              {formatMessage({ id: 'cash-on-delivery' })}
            </div>
            <div>
              {paymentMethod === payment.key ? (
                <BiRadioCircleMarked className="w-6 h-6 text-btn-secondary-light" />
              ) : (
                <BiRadioCircle className="w-6 h-6 text-btn-primary-light" />
              )}
            </div>
          </button>
        );
      }
    });
    return arr;
  };
  return (
    <>
      <div className="quick-checkout-personal-info-mobile__container">
        <div className="flex flex-col justify-center font-semibold text-sm px-2 ">
          {/* Order Items */}
          <div className="">
            <div className="p-2 border-b">
              <h1
                className=" text-center text-base"
                style={{ fontWeight: 900 }}
              >
                {formatMessage({ id: 'order-receipt' })}
              </h1>
            </div>
            <div className="my-orders-items__table-mobile font-semibold text-center mb-1 py-2">
              <h1>#</h1>
              <h1>{formatMessage({ id: 'the-item' })}</h1>
              <h1>{formatMessage({ id: 'quantity' })}</h1>
              <h1>{formatMessage({ id: 'price' })}</h1>
              <h1>{formatMessage({ id: 'total' })}</h1>
            </div>
            {guestCartItems?.map((orderItem, i) => {
              return (
                <div
                  key={orderItem.id}
                  className="my-orders-item-mobile text-sm text-center mb-1"
                >
                  <div className="">
                    <h1 className="">{i + 1}</h1>
                  </div>
                  <Link
                    to={`/${locale}/products/${orderItem.slug}/${orderItem.id}`}
                    className="hover:underline block truncate font-semibold"
                  >
                    {orderItem[`name_${locale}`]}
                  </Link>
                  <div className="">
                    <h1 className="">{orderItem.qty}</h1>
                  </div>
                  <div style={{ fontWeight: 900 }}>
                    <h1 className="">
                      {orderItem.price}{' '}
                      {deliveryCountry?.currency.translation[locale].symbol}
                    </h1>
                  </div>
                  <div style={{ fontWeight: 900 }} className="text-green-700">
                    <h1 className="">
                      {orderItem.total}{' '}
                      {deliveryCountry?.currency.translation[locale].symbol}
                    </h1>
                  </div>
                </div>
              );
            })}
            <hr className="my-3" />
            <div className="my-orders-receipt-summary font-bold">
              <h1>{formatMessage({ id: 'cart-total' })}</h1>
              <h1 className="text-center">
                {guestCartSubtotal}
                <span className="mx-1">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
              <h1>{formatMessage({ id: 'cart-delivery-cost' })}</h1>
              <h1 className=" text-center">
                {guestShippingCost === '0'
                  ? formatMessage({ id: 'cart-free' })
                  : guestShippingCost}
                <span className="mx-1">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
              {coupon && (
                <>
                  <h1 className="">{formatMessage({ id: 'coupon-sale' })}</h1>
                  <h1 className="text-center text-green-700">
                    {couponCost}
                    <span className="mx-1">
                      {deliveryCountry?.currency.translation[locale].symbol}
                    </span>
                  </h1>
                </>
              )}
              <h1 className="text-green-700 mt-3" style={{ fontWeight: 900 }}>
                {formatMessage({ id: 'subtotal' })}
              </h1>
              <h1
                className="text-green-700 text-center mt-3"
                style={{ fontWeight: 900 }}
              >
                {guestCartTotal}{' '}
                {deliveryCountry?.currency.translation[locale].symbol}
              </h1>
            </div>
          </div>
          <div className="">
            <div className="p-2 border-b">
              <h1 style={{ fontWeight: 900 }} className="text-center">
                {formatMessage({
                  id: 'delivery-address',
                })}
              </h1>
            </div>
            <div
              className="p-2"
              style={{ display: 'grid', gridTemplateColumns: '1fr 0.7fr' }}
            >
              <div className="">
                <div className="mb-2">
                  <h1 className=" text-gray-700">
                    {formatMessage({
                      id: 'full-name',
                    })}{' '}
                  </h1>
                  <h1>{name}</h1>
                </div>
                <div className="mb-2">
                  <h1 className=" text-gray-700">
                    {formatMessage({
                      id: 'phone-number',
                    })}{' '}
                  </h1>
                  <h1>{phoneNumber}</h1>
                </div>
                <div className="mb-2">
                  <h1 className=" text-gray-700">
                    {formatMessage({
                      id: 'delivery-location',
                    })}{' '}
                  </h1>
                  <h1>
                    {' '}
                    {guestAddress?.addressDetails.markerAddress ||
                      guestAddress.addressDetails.userTyped_location}
                  </h1>
                </div>
                <div className=" mb-2">
                  <div>
                    <h1 className=" text-gray-700">
                      {formatMessage({
                        id: 'maps-detailed-address-apartment',
                      })}{' '}
                    </h1>

                    <h1>
                      {' '}
                      {guestAddress?.addressDetails.apartmentOrHouseNumber}
                    </h1>
                  </div>
                  <div>
                    <h1 className="font-semibold text-gray-700">
                      {formatMessage({
                        id: 'maps-detailed-address-building',
                      })}{' '}
                    </h1>
                    <h1>
                      {guestAddress?.addressDetails.buildingOrTowerNumber}
                    </h1>
                  </div>
                </div>
                <div className="">
                  <div>
                    <h1 className="font-semibold text-gray-700">
                      {formatMessage({
                        id: 'maps-details-extra-details',
                      })}{' '}
                      :{' '}
                    </h1>
                    <h1 className="">
                      {guestAddress?.addressDetails.additionalDetails ||
                        formatMessage({ id: 'none' })}
                    </h1>
                  </div>
                </div>
              </div>
              {guestAddress?.lat && (
                <img
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${guestAddress.lat},${guestAddress.lng}&zoom=15&size=200x200&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                  alt="map"
                  className="self-start"
                />
              )}
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <div className=" mb-2 relative font-semibold  ">
          <div className="mb-1">
            <h1 className="text-center" style={{ fontWeight: 900 }}>
              {formatMessage({ id: 'select-payment-method' })}
            </h1>
          </div>
          <div className="p-2">
            <div className="flex flex-col ">{resolveFlags()}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center">
        <button
          className="px-3 py-1 text-sm uppercase bg-main-color text-main-text rounded font-semibold"
          onClick={handleStepBack}
        >
          {formatMessage({ id: 'btn-back-to-addresses' })}
        </button>
        <button
          disabled={!paymentMethod}
          className={`
              ${
                paymentMethod
                  ? 'bg-main-color text-main-text'
                  : 'bg-gray-600 text-gray-100'
              } flex items-center text-sm justify-center uppercase px-3 py-1 mx-2  rounded font-semibold`}
          onClick={handleGuestCheckout}
          style={{ width: '90px' }}
        >
          {checkoutLoading ? (
            <Loader
              type="ThreeDots"
              color="#fff"
              height={20}
              width={20}
              visible={true}
            />
          ) : (
            formatMessage({ id: 'btn-proceed' })
          )}
        </button>
      </div>
    </>
  );
}
