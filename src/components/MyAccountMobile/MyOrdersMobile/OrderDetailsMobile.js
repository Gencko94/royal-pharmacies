import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import moment from 'moment';
import knet from '../../../assets/paymentLogos/knet.png';
import mastercard from '../../../assets/paymentLogos/mastercard.png';

import cod from '../../../assets/paymentLogos/cod.png';
import amex from '../../../assets/paymentLogos/amex.png';
import { DataProvider } from '../../../contexts/DataContext';
export default function OrderDetailsMobile({
  orderDetailsOpen,
  selectedOrder,
  handleOrderDetailsClose,
}) {
  const { formatMessage, locale } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);
  React.useEffect(() => {
    if (orderDetailsOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [orderDetailsOpen]);
  const containerVariants = {
    hidden: {
      y: '50%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween',
      },
    },
    exited: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'tween',
      },
    },
  };
  const resolvePayment = () => {
    if (selectedOrder.payment_method === 'knet') {
      return (
        <div
          className={`  flex  items-center justify-start  p-2 font-semibold`}
        >
          <img src={knet} alt={selectedOrder.payment_method} />
          <div className="flex-1 mx-3 text-left">K-net</div>
        </div>
      );
    }
    if (selectedOrder.payment_method === 'credit') {
      return (
        <div
          className={`  flex  items-center justify-start  p-2 font-semibold`}
        >
          <img src={mastercard} alt={selectedOrder.payment_method} />
          <div className="flex-1 mx-3 text-left">Credit Card</div>
        </div>
      );
    }

    if (selectedOrder.payment_method === 'amex') {
      return (
        <div className={` flex  items-center justify-start  p-2 font-semibold`}>
          <img src={amex} alt={selectedOrder.payment_method} />
          <div className="flex-1 mx-3 text-left">American Express</div>
        </div>
      );
    }
    if (selectedOrder.payment_method === 'cod') {
      return (
        <div
          className={`  flex  items-center justify-start  p-2 font-semibold`}
        >
          <img src={cod} alt={selectedOrder.payment_method} />
          <div className="flex-1 mx-3 text-left">
            {formatMessage({ id: 'cash-on-delivery' })}
          </div>
        </div>
      );
    }
  };
  const resolveStatus = () => {
    switch (selectedOrder.status) {
      case 'completed':
        return (
          <div
            className={` uppercase text-body-text-dark flex justify-center items-center rounded    px-2 py-1 font-semibold bg-green-700  `}
          >
            <h1 className="mx-1">{formatMessage({ id: 'order-completed' })}</h1>
          </div>
        );

      case 'canceled':
        return (
          <div
            className={`uppercase text-body-text-dark flex justify-center items-center rounded    px-2 py-1 font-semibold bg-main-color  `}
          >
            <h1 className="mx-1">{formatMessage({ id: 'order-cancelled' })}</h1>
          </div>
        );
      case 'pending':
        return (
          <div
            className={` uppercase text-body-text-dark flex justify-center items-center rounded    px-2 py-1 font-semibold bg-yellow-600  `}
          >
            <h1 className="mx-1">{formatMessage({ id: 'order-pending' })}</h1>
          </div>
        );
      case 'delivery':
        return (
          <div
            className={` uppercase text-body-text-dark flex justify-center items-center rounded    px-2 py-1 font-semibold bg-blue-600  `}
          >
            <h1 className="mx-1">{formatMessage({ id: 'order-delivery' })}</h1>
          </div>
        );
      case 'waiting_for_payment':
        return (
          <div
            className={` uppercase text-body-text-dark flex justify-center items-center rounded    px-2 py-1 font-semibold bg-yellow-600  `}
          >
            <h1 className="mx-1">
              {formatMessage({ id: 'order-waiting-for-payment' })}
            </h1>
          </div>
        );
      case 'confirmed':
        return (
          <div
            className={` uppercase text-body-text-dark flex justify-center items-center rounded    px-2 py-1 font-semibold bg-blue-600  `}
          >
            <h1 className="mx-1">{formatMessage({ id: 'order-confirmed' })}</h1>
          </div>
        );
      case 'new':
        return (
          <div
            className={`uppercase text-body-text-dark flex justify-center items-center rounded    px-2 py-1 font-semibold  bg-blue-600  `}
          >
            <h1 className="mx-1">{formatMessage({ id: 'order-new' })}</h1>
          </div>
        );

      default:
        break;
    }
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="fixed top-0 left-0 right-0 bottom-0 overflow-y-scroll bg-body-light z-30 h-screen"
    >
      <div className=" sticky top-0 p-3 flex items-center bg-main-color text-main-text z-1">
        <button
          className="text-white text-center"
          onClick={handleOrderDetailsClose}
        >
          {locale === 'en' ? (
            <AiOutlineArrowLeft className="w-6 h-6 " />
          ) : (
            <AiOutlineArrowRight className="w-6 h-6 " />
          )}
        </button>
        <h1 className="font-semibold text-lg mx-4">
          {formatMessage({ id: 'order-details' })}
        </h1>
      </div>
      {selectedOrder && (
        <div className="px-1 py-2 ">
          <div className="mb-3 p-3 mx-1 rounded-lg flex bg-gray-900 text-main-text">
            <div className="flex-1">
              <div className="flex items-center font-bold">
                <h1>{formatMessage({ id: 'order-number' })}</h1>
                <h1 className="mx-1">{selectedOrder.id}</h1>
              </div>
              <div className="flex items-center text-sm">
                <h1 className="font-semibold  text-gray-600">
                  {formatMessage({ id: 'order-date' })} :
                </h1>
                <h1 className="mx-1">
                  {' '}
                  {moment(selectedOrder.created_at).format(
                    'DD/MM/YYYY - HH:MM'
                  )}
                </h1>
              </div>
              <div className="flex items-center text-sm">
                <h1 className="text-gray-600">
                  {selectedOrder.status === 'completed'
                    ? formatMessage({ id: 'delivered-at' })
                    : formatMessage({ id: 'expected-delivery' })}{' '}
                  :
                </h1>
                <h1 className="mx-1">
                  {selectedOrder.status === 'completed'
                    ? selectedOrder.deliveryDate
                    : 'Soon'}
                </h1>
              </div>
              <div className=" text-sm">
                <h1 className="text-gray-600 ">
                  {selectedOrder.status === 'completed'
                    ? formatMessage({ id: 'delivered-to' })
                    : formatMessage({ id: 'deliver-to' })}
                  :{' '}
                </h1>
                <h1 className="mx-1">
                  {selectedOrder.address.type === 'map'
                    ? selectedOrder.address.marked_address
                    : selectedOrder.address.userTyped_address}
                </h1>
              </div>
              <div className="text-sm">
                <h1 className="text-gray-600">
                  {formatMessage({ id: 'payment-method' })} :
                </h1>
                {resolvePayment()}
              </div>
            </div>
            <div className=" text-sm flex flex-col justify-center font-semibold">
              {resolveStatus()}

              <div className="mt-auto text-center font-bold">
                <h1>{formatMessage({ id: 'subtotal' })}</h1>
                <h1 className="text-green-700">
                  {selectedOrder.subtotal}{' '}
                  {deliveryCountry?.currency.translation[locale].symbol}
                </h1>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-bold">
              {formatMessage({ id: 'order-receipt' })}
            </h1>
          </div>
          <hr className="my-1" />
          <div className="my-orders-items__grid-mobile">
            <div className="my-orders-items__table-mobile font-semibold ">
              <h1>#</h1>
              <h1>{formatMessage({ id: 'the-item' })}</h1>
              <h1>{formatMessage({ id: 'qty' })}</h1>
              <h1>{formatMessage({ id: 'price' })}</h1>
              <h1>{formatMessage({ id: 'total' })}</h1>
            </div>
            {selectedOrder.items.map((orderItem, i) => {
              return (
                <div
                  key={orderItem.id}
                  className="my-orders-item-mobile text-sm"
                >
                  <div className="text-center ">
                    <h1 className="">{i + 1}</h1>
                  </div>
                  <Link
                    to={`/${locale}/products/${orderItem.product.slug}/${orderItem.id}`}
                    className="hover:underline truncate uppercase text-center font-semibold block text-xs"
                  >
                    {orderItem.product.translation[locale].title}
                  </Link>
                  <div className="text-center">
                    <h1 className="">{orderItem.qty}</h1>
                  </div>
                  <div style={{ fontWeight: 900 }}>
                    <h1 className="text-center">{orderItem.price} </h1>
                  </div>
                  <div style={{ fontWeight: 900 }} className="text-green-700">
                    <h1 className="text-center">
                      {(orderItem.price * orderItem.qty).toFixed(3)}{' '}
                      {deliveryCountry?.currency.translation[locale].symbol}
                    </h1>
                  </div>
                </div>
              );
            })}
            <hr className="my-1" />
            <div className="my-orders-receipt-summary-mobile font-bold rounded-lg border bg-gray-100 p-2 text-sm">
              <h1>{formatMessage({ id: 'cart-total' })}</h1>
              <h1>{selectedOrder.total}</h1>
              <h1>{formatMessage({ id: 'cart-delivery-cost' })}</h1>
              <h1 className="mb-2">
                {' '}
                {selectedOrder.shipping_cost === '0'
                  ? formatMessage({ id: 'cart-free' })
                  : selectedOrder.shipping_cost}
              </h1>
              {selectedOrder.coupon && (
                <h1 className="mb-2 text-center">
                  {formatMessage({ id: 'coupon-sale' })}
                </h1>
              )}
              {selectedOrder.coupon && (
                <h1 className="mb-2 text-center">
                  {selectedOrder.coupon_cost}
                  <span className="mx-1">
                    {deliveryCountry?.currency.translation[locale].symbol}
                  </span>
                </h1>
              )}
              <h1 className="text-green-700 text-base">
                {formatMessage({ id: 'subtotal' })}
              </h1>
              <h1 className="text-green-700 text-base">
                {selectedOrder.subtotal}{' '}
                {deliveryCountry?.currency.translation[locale].symbol}
              </h1>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
