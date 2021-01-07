import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';

import { DataProvider } from '../../contexts/DataContext';
import knet from '../../assets/paymentLogos/knet.png';
import mastercard from '../../assets/paymentLogos/mastercard.png';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import cod from '../../assets/paymentLogos/cod.png';
import amex from '../../assets/paymentLogos/amex.png';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getSingleGuestOrder } from '../../Queries/Queries';

export default function GuestOrders({ orders }) {
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const resolveStatus = status => {
    switch (status) {
      case 'completed':
        return (
          <div
            className={` text-body-text-dark flex items-center rounded  px-3 py-2  font-semibold bg-green-700  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-completed' })}</h1>
          </div>
        );

      case 'canceled':
        return (
          <div
            className={` text-body-text-dark flex items-center rounded px-3 py-2 font-semibold bg-main-color  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-cancelled' })}</h1>
          </div>
        );
      case 'pending':
        return (
          <div
            className={` text-body-text-dark  flex items-center rounded  px-3 py-2  font-semibold bg-yellow-600  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-pending' })}</h1>
          </div>
        );
      case 'delivery':
        return (
          <div
            className={` text-body-text-dark  flex items-center rounded  px-3 py-2 font-semibold bg-blue-600  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-delivery' })}</h1>
          </div>
        );
      case 'waiting_for_payment':
        return (
          <div
            className={` text-body-text-dark flex items-center  rounded px-3 py-2 font-semibold bg-yellow-600  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">
              {formatMessage({ id: 'order-waiting-for-payment' })}
            </h1>
          </div>
        );
      case 'confirmed':
        return (
          <div
            className={` text-body-text-dark flex items-center rounded px-3 py-2  font-semibold bg-blue-600  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-confirmed' })}</h1>
          </div>
        );
      case 'new':
        return (
          <div
            className={`text-body-text-dark px-3 py-2 rounded  font-semibold flex items-center  bg-blue-600  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-new' })}</h1>
          </div>
        );

      default:
        break;
    }
  };
  const resolvePayment = payment => {
    if (payment === 'knet') {
      return (
        <div
          className={`  flex  items-center justify-start  p-2 font-semibold`}
        >
          <img src={knet} alt={payment} />
          <div className="flex-1 mx-3 text-left">K-net</div>
        </div>
      );
    }
    if (payment === 'credit') {
      return (
        <div
          className={`  flex  items-center justify-start  p-2 font-semibold`}
        >
          <img src={mastercard} alt={payment} />
          <div className="flex-1 mx-3 text-left">Credit Card</div>
        </div>
      );
    }

    if (payment === 'amex') {
      return (
        <div className={` flex  items-center justify-start  p-2 font-semibold`}>
          <img src={amex} alt={payment} />
          <div className="flex-1 mx-3 text-left">American Express</div>
        </div>
      );
    }
    if (payment === 'cod') {
      return (
        <div
          className={`  flex  items-center justify-start  p-2 font-semibold`}
        >
          <img src={cod} alt={payment} />
          <div className="flex-1 mx-3 text-left">
            {formatMessage({ id: 'cash-on-delivery' })}
          </div>
        </div>
      );
    }
  };
  const containerVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  };
  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  if (orders.length === 0) {
    return (
      <div
        className="flex justify-center items-center"
        style={{
          height: 'calc(100vh - 140px)',
        }}
      >
        {formatMessage({ id: 'no-orders-placed' })}
      </div>
    );
  }
  return (
    <AnimateSharedLayout>
      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className=" guest-orders-grid__desktop mb-6"
      >
        <div className="max-h-full p-3 overflow-y-auto">
          {orders.map(order => {
            return (
              <motion.div
                layout
                onClick={() => {
                  setSelectedOrder(order.id);
                  setIsOpen(true);
                }}
                key={order.id}
                variants={childVariants}
                className={`mb-3  mx-1 cursor-pointer w-full rounded-lg ${
                  selectedOrder === order.id ? 'bg-gray-800' : 'bg-gray-900'
                }  hover:bg-gray-800 transition duration-200 text-main-text`}
              >
                {resolveStatus(order.status)}
                <div className="p-3">
                  <div className="flex items-center font-bold">
                    <h1>{formatMessage({ id: 'order-number' })}</h1>
                    <h1 className="mx-1">{order.id}</h1>
                  </div>

                  <div className="flex items-center text-sm">
                    <h1 className="text-gray-600">
                      {order.status === 'completed'
                        ? formatMessage({ id: 'delivery-status' })
                        : formatMessage({ id: 'expected-delivery' })}{' '}
                      :
                    </h1>
                    <h1 className="mx-1">
                      {order.status === 'completed'
                        ? formatMessage({ id: 'delivered' })
                        : 'Soon'}
                    </h1>
                  </div>

                  <div className="text-sm">
                    <h1 className="text-gray-600">
                      {formatMessage({ id: 'payment-method' })} :
                    </h1>
                    {resolvePayment(order.payment_method)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="shadow rounded-lg max-h-full overflow-y-auto">
          {!selectedOrder && (
            <div className="text-2xl p-3 h-full flex items-center justify-center font-semibold">
              {formatMessage({ id: 'select-order-to-display' })}
            </div>
          )}
          <AnimatePresence>
            {isOpen && <Content id={selectedOrder} />}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimateSharedLayout>
  );
}
const Content = ({ id }) => {
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
  const { data, isLoading } = useQuery(
    ['single-guest-order', id],
    getSingleGuestOrder,
    { retry: true, refetchOnWindowFocus: false }
  );
  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Loader
          type="ThreeDots"
          color="#b72b2b"
          height={40}
          width={40}
          visible={true}
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
    >
      <div className="p-2 border-b">
        <h1 className="font-bold text-xl">
          {formatMessage({ id: 'delivery' })}
        </h1>
      </div>
      <motion.div className="flex justify-between p-2" layout>
        <div>
          <div className=" font-semibold">
            <h1 className="text-gray-700 font-bold text-lg">
              {formatMessage({
                id: 'full-name',
              })}
            </h1>
            <h1>{data.address.customer.name}</h1>
          </div>
          {data.address.customer.email && (
            <div className=" font-semibold">
              <h1 className="text-gray-700 font-bold text-lg">
                {formatMessage({
                  id: 'full-name',
                })}
              </h1>
              <h1>{data.address.customer.email}</h1>
            </div>
          )}
          <div className=" font-semibold">
            <h1 className="text-gray-700 font-bold text-lg">
              {formatMessage({
                id: 'phone-number',
              })}
            </h1>
            <h1>{data.address.customer.mobile}</h1>
          </div>
          <div className=" font-semibold">
            <h1 className="text-gray-700 font-bold text-lg">
              {formatMessage({
                id: 'location',
              })}
            </h1>
            <h1>{`${
              data.address.type === 'map'
                ? data.address.marked_address
                : data.address.userTyped_address
            }`}</h1>
          </div>
          <div className="font-semibold">
            <h1 className="text-gray-700 text-lg font-bold">
              {formatMessage({
                id: 'maps-detailed-address-apartment',
              })}
            </h1>
            <h1>{data.address.apartment_house_number}</h1>
          </div>
          {data.address.building_tower_number && (
            <div className="font-semibold">
              <h1 className="text-gray-800  font-bold">
                {formatMessage({
                  id: 'maps-detailed-address-building',
                })}
              </h1>
              <h1>{data.address.building_tower_number}</h1>
            </div>
          )}
          {data.address.addition_direction && (
            <div className="font-semibold">
              <h1 className="text-gray-800 font-bold">
                {formatMessage({
                  id: 'maps-details-extra-details',
                })}
              </h1>
              <h1>{data.address.addition_direction}</h1>
            </div>
          )}
        </div>
        <motion.div layout>
          {data.address.type === 'map' && data.address.lat && (
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${data.address.lat},${data.address.lng}&zoom=15&size=150x150&
              markers=color:blue%7C${data.address.lat}-${data.address.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
              alt="map"
            />
          )}
        </motion.div>
      </motion.div>
      <hr className="my-4" />
      <div className="p-2 border-b">
        <h1 className="font-bold text-xl">
          {formatMessage({ id: 'order-receipt' })}
        </h1>
      </div>
      <div className="p-2 text-lg">
        <div className="my-orders-items__table-desktop font-semibold text-center mb-3">
          <h1>#</h1>
          <h1>{formatMessage({ id: 'the-item' })}</h1>
          <h1>{formatMessage({ id: 'quantity' })}</h1>
          <h1>{formatMessage({ id: 'price' })}</h1>
          <h1>{formatMessage({ id: 'total' })}</h1>
        </div>

        {data.items.map((orderItem, i) => {
          return (
            <div
              key={orderItem.id}
              className="my-orders-item-desktop text-base text-center"
            >
              <div className="">
                <h1 className="">{i + 1}</h1>
              </div>
              <Link
                to={`/${locale}/products/${orderItem.product.slug}/${orderItem.id}`}
                className="hover:underline truncate uppercase font-semibold block"
              >
                {orderItem.product.translation[locale].title}
              </Link>
              <div className="">
                <h1 className="">{orderItem.qty}</h1>
              </div>
              <div style={{ fontWeight: 900 }}>
                <h1 className="">{orderItem.price} </h1>
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
        <hr className="my-3" />
        <div className="my-orders-receipt-summary font-bold">
          <h1>{formatMessage({ id: 'cart-total' })}</h1>
          <h1 className="text-center">
            {data.subtotal}{' '}
            <span className="mx-1">
              {deliveryCountry?.currency.translation[locale].symbol}
            </span>
          </h1>
          <h1>{formatMessage({ id: 'cart-delivery-cost' })}</h1>
          <h1 className="text-center">
            {data.shipping_cost === '0'
              ? formatMessage({ id: 'cart-free' })
              : data.shipping_cost}{' '}
            <span className="mx-1">
              {deliveryCountry?.currency.translation[locale].symbol}
            </span>
          </h1>
          {data.coupon_cost !== '0.000' && (
            <h1 className="mb-2 text-green-700">
              {formatMessage({ id: 'coupon-sale' })}
            </h1>
          )}
          {data.coupon_cost !== '0.000' && (
            <h1 className="mb-2 text-center text-green-700">
              {data.coupon_cost}
              <span className="mx-1">
                {deliveryCountry?.currency.translation[locale].symbol}
              </span>
            </h1>
          )}
          <h1
            className="text-green-700 text-xl font-bold"
            style={{ fontWeight: 900 }}
          >
            {formatMessage({ id: 'subtotal' })}
          </h1>
          <h1
            className="text-green-700 text-lg font-bold text-center"
            style={{ fontWeight: 900 }}
          >
            {data.total} {deliveryCountry?.currency.translation[locale].symbol}
          </h1>
        </div>
      </div>
    </motion.div>
  );
};
