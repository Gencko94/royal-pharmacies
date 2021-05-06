import React from 'react';
import { BiRadioCircle, BiRadioCircleMarked } from 'react-icons/bi';
import { useIntl } from 'react-intl';
import knet from '../../assets/paymentLogos/knet.png';
import mastercard from '../../assets/paymentLogos/mastercard.png';

import cod from '../../assets/paymentLogos/cod.png';
import amex from '../../assets/paymentLogos/amex.png';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { DataProvider } from '../../contexts/DataContext';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { Link } from 'react-router-dom';
export default function PersonalInformation({
  handleStepBack,
  selectedAddress,
  paymentMethod,
  setPaymentMethod,
  handleCheckout,
  checkoutLoading,
}) {
  const { formatMessage, locale } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);
  const {
    cartItems,
    cartSubtotal,
    cartTotal,
    shippingCost,
    couponCost,
    coupon,
  } = React.useContext(CartAndWishlistProvider);

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
            <div className="flex-1 mx-3 text-left">
              {formatMessage({ id: payment.key })}
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
            <div className="flex-1 mx-3 text-left">
              {formatMessage({ id: payment.key })}
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
            <div className="flex-1 mx-3 text-left">
              {formatMessage({ id: payment.key })}
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
                <BiRadioCircleMarked className="w-6 h-6 text-main-text" />
              ) : (
                <BiRadioCircle className="w-6 h-6 text-main-color" />
              )}
            </div>
          </button>
        );
      }
    });
    return arr;
  };
  const handlePaymentChange = method => {
    setPaymentMethod(method);
  };
  return (
    <>
      <div className="user-checkout-personal-info__container h-full rounded border">
        <div
          className="font-semibold overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 190px)' }}
        >
          {/* Order Items */}
          <div className="border-b">
            <div className="p-2 border-b">
              <h1 className=" text-center" style={{ fontWeight: 900 }}>
                {formatMessage({ id: 'order-receipt' })}
              </h1>
            </div>
            <div className="my-orders-items__table-desktop font-semibold text-center mb-1 py-2">
              <h1>{formatMessage({ id: 'the-item' })}</h1>
              <h1>{formatMessage({ id: 'quantity' })}</h1>
              <h1>{formatMessage({ id: 'price' })}</h1>
              <h1>{formatMessage({ id: 'total' })}</h1>
            </div>
            {cartItems?.map((orderItem, i) => {
              return (
                <div
                  key={orderItem.id}
                  className="my-orders-item-desktop text-sm text-center mb-1"
                >
                  <Link
                    to={`/${locale}/products/${orderItem.slug}/${orderItem.id}`}
                    className="hover:underline font-semibold truncate"
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
            <hr className="my-1" />
            <div className="my-orders-receipt-summary font-bold p-2">
              <h1>{formatMessage({ id: 'cart-total' })}</h1>
              <h1 className="text-center">
                {cartSubtotal}
                <span className="mx-1">
                  {deliveryCountry?.currency.translation[locale].symbol}
                </span>
              </h1>
              <h1>{formatMessage({ id: 'cart-delivery-cost' })}</h1>
              <h1 className=" text-center">
                {shippingCost === '0'
                  ? formatMessage({ id: 'cart-free' })
                  : shippingCost}
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
              <h1 className="text-green-700 text-xl font-bold mt-3">
                {formatMessage({ id: 'subtotal' })}
              </h1>
              <h1 className="text-green-700 text-center text-xl font-bold mt-3">
                {cartTotal}{' '}
                {deliveryCountry?.currency.translation[locale].symbol}
              </h1>
            </div>
          </div>
          {/* Order Address */}
          <div className="">
            <div className="p-2 border-b">
              <h1 style={{ fontWeight: 900 }} className="text-center">
                {formatMessage({
                  id: 'delivery-address',
                })}
              </h1>
            </div>
            <div
              className=" p-2"
              style={{ display: 'grid', gridTemplateColumns: '1fr 0.4fr' }}
            >
              <div>
                <div className="mb-2 text-center">
                  <h1 className=" text-gray-700">
                    {formatMessage({
                      id: 'delivery-location',
                    })}{' '}
                  </h1>
                  <h1>{selectedAddress?.marked_address}</h1>
                </div>
                <div className=" mb-2 text-center">
                  <div>
                    <h1 className=" text-gray-700">
                      {formatMessage({
                        id: 'maps-detailed-address-apartment',
                      })}{' '}
                    </h1>

                    <h1>{selectedAddress?.apartment_house_number}</h1>
                  </div>
                  <div>
                    <h1 className="font-semibold text-gray-700">
                      {formatMessage({
                        id: 'maps-detailed-address-building',
                      })}{' '}
                    </h1>
                    <h1>{selectedAddress?.building_tower_number}</h1>
                  </div>
                </div>
                <div className="text-center">
                  <div>
                    <h1 className="font-semibold text-gray-700">
                      {formatMessage({
                        id: 'maps-details-extra-details',
                      })}{' '}
                      :{' '}
                    </h1>
                    <h1 className="">
                      {selectedAddress?.addition_direction ||
                        formatMessage({ id: 'none' })}
                    </h1>
                  </div>
                </div>
              </div>
              {selectedAddress?.lat && (
                <img
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${selectedAddress.lat},${selectedAddress.lng}&zoom=15&size=200x200&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                  alt="map"
                  className="self-start"
                />
              )}
            </div>
          </div>
        </div>
        <div className="font-semibold border-l">
          <div className=" mb-4 relative  ">
            <div className="p-2 border-b">
              <h1 className="text-center">
                {formatMessage({ id: 'select-payment-method' })}
              </h1>
            </div>
            <div className="p-2">
              <div className="flex flex-col ">{resolveFlags()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center p-3">
        <button
          className="px-3 py-1 uppercase bg-main-color text-main-text rounded font-semibold"
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
              }
             flex items-center justify-center uppercase px-3 py-1 mx-3  rounded font-semibold`}
          onClick={handleCheckout}
        >
          {checkoutLoading ? (
            <Loader
              type="ThreeDots"
              color="#fff"
              height={24}
              width={24}
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
