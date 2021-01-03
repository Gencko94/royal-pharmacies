import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import moment from 'moment';
import knet from '../../../assets/paymentLogos/knet.png';
import mastercard from '../../../assets/paymentLogos/mastercard.png';

import cod from '../../../assets/paymentLogos/cod.png';
import amex from '../../../assets/paymentLogos/amex.png';
import { DataProvider } from '../../../contexts/DataContext';
export default function Order({ order }) {
  const { formatMessage } = useIntl();
  const [isOpen, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!isOpen);
  };
  const status = order.status;
  const resolvePayment = () => {
    if (order.payment_method === 'knet') {
      return (
        <div
          className={`  flex  items-center justify-start  p-2 font-semibold`}
        >
          <img src={knet} alt={order.payment_method} />
          <div className="flex-1 mx-3 text-left">K-net</div>
        </div>
      );
    }
    if (order.payment_method === 'credit') {
      return (
        <div
          className={`  flex  items-center justify-start  p-2 font-semibold`}
        >
          <img src={mastercard} alt={order.payment_method} />
          <div className="flex-1 mx-3 text-left">Credit Card</div>
        </div>
      );
    }

    if (order.payment_method === 'amex') {
      return (
        <div className={` flex  items-center justify-start  p-2 font-semibold`}>
          <img src={amex} alt={order.payment_method} />
          <div className="flex-1 mx-3 text-left">American Express</div>
        </div>
      );
    }
    if (order.payment_method === 'cod') {
      return (
        <div
          className={`  flex  items-center justify-start  p-2 font-semibold`}
        >
          <img src={cod} alt={order.payment_method} />
          <div className="flex-1 mx-3 text-left">
            {formatMessage({ id: 'cash-on-delivery' })}
          </div>
        </div>
      );
    }
  };
  const resolveStatus = () => {
    switch (status) {
      case 'completed':
        return (
          <motion.div
            layout
            className={` text-body-text-dark flex items-center  px-3 py-2 font-semibold bg-green-700  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-completed' })}</h1>
          </motion.div>
        );

      case 'canceled':
        return (
          <motion.div
            layout
            className={` text-body-text-dark flex items-center px-3 py-2 font-semibold bg-main-color  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-cancelled' })}</h1>
          </motion.div>
        );
      case 'pending':
        return (
          <motion.div
            layout
            className={` text-body-text-dark  flex items-center px-3 py-2 font-semibold bg-yellow-600  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-pending' })}</h1>
          </motion.div>
        );
      case 'delivery':
        return (
          <motion.div
            layout
            className={` text-body-text-dark  flex items-center px-3 py-2 font-semibold bg-blue-600  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-delivery' })}</h1>
          </motion.div>
        );
      case 'waiting_for_payment':
        return (
          <motion.div
            layout
            className={` text-body-text-dark flex items-center px-3 py-2 font-semibold bg-yellow-600  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">
              {formatMessage({ id: 'order-waiting-for-payment' })}
            </h1>
          </motion.div>
        );
      case 'confirmed':
        return (
          <motion.div
            layout
            className={` text-body-text-dark flex items-center px-3 py-2 font-semibold bg-blue-600  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-confirmed' })}</h1>
          </motion.div>
        );
      case 'new':
        return (
          <motion.div
            layout
            className={` text-body-text-dark flex items-center px-3 py-2 font-semibold bg-blue-600  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-new' })}</h1>
          </motion.div>
        );

      default:
        break;
    }
  };

  return (
    <motion.div layout className="rounded border">
      {resolveStatus()}

      <motion.div
        layout
        className="my-orders-grid__desktop text-sm p-3 bg-gray-900 text-main-text"
      >
        <motion.div layout>
          <div className="flex items-center">
            <h1 className="text-gray-600">
              {formatMessage({ id: 'order-date' })} :
            </h1>
            <h1 className="mx-1">
              {' '}
              {moment(order.created_at).format('DD/MM/YYYY - HH:MM')}
            </h1>
          </div>

          <div className="flex items-center">
            <h1 className="text-gray-600">
              {formatMessage({ id: 'payment-method' })}:
            </h1>
            {resolvePayment()}
          </div>
        </motion.div>
        <motion.div layout>
          <h1 className="font-semibold">
            {formatMessage({ id: 'delivery-address' })}
          </h1>
          <div className="flex">
            <h1 className="text-gray-600">
              {formatMessage({
                id: 'location',
              })}
            </h1>
            <h1 className="mx-2">{`${order.address.marked_address}`}</h1>
          </div>
          <div className="flex items-center">
            <h1 className="text-gray-600">
              {formatMessage({
                id: 'maps-detailed-address-apartment',
              })}
            </h1>
            <h1 className=" mx-2">{order.address.apartment_house_number}</h1>
          </div>
          <div className="flex items-center">
            <h1 className="text-gray-600">
              {formatMessage({
                id: 'maps-detailed-address-building',
              })}
            </h1>
            <h1 className=" mx-2">{order.address.building_tower_number}</h1>
          </div>
          {order.address.addition_direction && (
            <div className="flex items-center">
              <h1 className="text-gray-600">
                {formatMessage({
                  id: 'maps-details-extra-details',
                })}
              </h1>
              <h1 className=" mx-2">{order.address.addition_direction}</h1>
            </div>
          )}
        </motion.div>
        <motion.div layout>
          {order.address.type === 'map' && order.address.lat && (
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${order.address.lat},${order.address.lng}&zoom=15&size=200x200&
              markers=color:blue%7C${order.address.lat}-${order.address.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
              alt="map"
            />
          )}
        </motion.div>
      </motion.div>
      <motion.div
        layout
        className="p-2 font-semibold flex items-center bg-gray-200 "
      >
        <h1>{formatMessage({ id: 'show-order-receipt' })}</h1>
        <button
          onClick={toggleOpen}
          className="p-1 mx-2 border rounded-full shadow-md"
        >
          {isOpen ? (
            <BiChevronUp className="h-6 w-6" />
          ) : (
            <BiChevronDown className="h-6 w-6" />
          )}
        </button>
      </motion.div>
      {isOpen && <hr />}
      <AnimatePresence>
        {isOpen && (
          <Content
            orderItems={order.items}
            orderSubtotal={order.subtotal}
            orderTotal={order.total}
            shippingCost={order.shipping_cost}
            coupon={order.coupon}
            couponCost={order.coupon_cost}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const Content = ({
  orderItems,
  orderTotal,
  orderSubtotal,
  shippingCost,
  coupon,
  couponCost,
}) => {
  const { locale, formatMessage } = useIntl();
  const { deliveryCountry } = React.useContext(DataProvider);
  const containerVariants = {
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
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="my-orders-items__grid-desktop p-2"
    >
      <div className="my-orders-items__table-desktop font-semibold text-center mb-1">
        <h1>#</h1>
        <h1>{formatMessage({ id: 'the-item' })}</h1>
        <h1>{formatMessage({ id: 'quantity' })}</h1>
        <h1>{formatMessage({ id: 'price' })}</h1>
        <h1>{formatMessage({ id: 'total' })}</h1>
      </div>

      {orderItems.map((orderItem, i) => {
        return (
          <div
            key={orderItem.id}
            className="my-orders-item-desktop text-sm text-center"
          >
            <div className="">
              <h1 className="">{i + 1}</h1>
            </div>
            <Link
              to={`/${locale}/products/${orderItem.product.slug}/${orderItem.id}`}
              className="hover:underline"
            >
              <h1 className="truncate  font-semibold">
                {orderItem.product.translation[locale].title}
              </h1>
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
                {(orderItem.price * orderItem.qty).toFixed(3)}{' '}
                {deliveryCountry?.currency.translation[locale].symbol}
              </h1>
            </div>
          </div>
        );
      })}
      <hr className="my-1" />
      <div className="my-orders-receipt-summary font-bold text-sm">
        <h1>{formatMessage({ id: 'cart-total' })}</h1>
        <h1 className="text-center">
          {orderSubtotal}{' '}
          <span className="mx-1">
            {deliveryCountry?.currency.translation[locale].symbol}
          </span>
        </h1>
        <h1>{formatMessage({ id: 'cart-delivery-cost' })}</h1>
        <h1 className="mb-2 text-center">
          {shippingCost === '0'
            ? formatMessage({ id: 'cart-free' })
            : shippingCost}{' '}
          <span className="mx-1">
            {deliveryCountry?.currency.translation[locale].symbol}
          </span>
        </h1>
        {coupon && (
          <h1 className="mb-2 text-center">
            {couponCost}
            <span className="mx-1">
              {deliveryCountry?.currency.translation[locale].symbol}
            </span>
          </h1>
        )}
        <h1 className="text-green-700 text-base" style={{ fontWeight: 900 }}>
          {formatMessage({ id: 'subtotal' })}
        </h1>
        <h1
          className="text-green-700 text-base text-center"
          style={{ fontWeight: 900 }}
        >
          {orderTotal} {deliveryCountry?.currency.translation[locale].symbol}
        </h1>
      </div>
    </motion.div>
  );
};
