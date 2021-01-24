import React from 'react';
import knet from '../../assets/paymentLogos/knet.png';
import mastercard from '../../assets/paymentLogos/mastercard.png';

import cod from '../../assets/paymentLogos/cod.png';
import amex from '../../assets/paymentLogos/amex.png';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';
import GuestOrderDetailsMobile from './GuestOrderDetailsMobile';
export default function GuestOrdersMobile({ orders }) {
  const { formatMessage } = useIntl();

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const handleOrderDetailsClose = () => {
    setSelectedOrder(null);
    setIsOpen(false);
  };
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
          height: 'calc(100vh - 56px)',
        }}
      >
        {formatMessage({ id: 'no-orders-placed' })}
      </div>
    );
  }
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className=""
        style={{ minHeight: 'calc(-56px + 100vh)' }}
      >
        <div className="p-3 my-orders-items__grid-mobile">
          {orders.map(order => {
            return (
              <motion.div
                key={order.id}
                layout
                onClick={() => {
                  setSelectedOrder(order.id);
                  setIsOpen(true);
                }}
                variants={childVariants}
                className={`mb-3 cursor-pointer w-full rounded-lg ${
                  selectedOrder === order.id ? 'bg-gray-800' : 'bg-gray-900'
                }  hover:bg-gray-800 transition duration-200 text-main-text`}
              >
                {resolveStatus(order.status)}
                <div className="p-3">
                  <div className="flex items-center font-bold">
                    <h1>{formatMessage({ id: 'order-number' })}</h1>
                    <h1 className="mx-1">{order.id}</h1>
                  </div>
                  <div className="flex items-center font-bold">
                    <h1>{formatMessage({ id: 'order-date' })}</h1>
                    <h1 className="mx-1">
                      {moment(order.created_at).format('DD/MM/YYYY - HH:MM')}
                    </h1>
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

                  <button
                    onClick={() => {
                      setSelectedOrder(order.id);
                      setIsOpen(true);
                    }}
                    className="px-3 py-1 text-body-text-dark bg-blue-700 uppercase  rounded font-semibold"
                  >
                    {formatMessage({ id: 'order-details' })}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <GuestOrderDetailsMobile
            id={selectedOrder}
            handleOrderDetailsClose={handleOrderDetailsClose}
            isOpen={isOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
}
