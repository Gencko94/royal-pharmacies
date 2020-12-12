import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import moment from 'moment';
export default function OrderDetailsMobile({
  orderDetailsOpen,
  selectedOrder,
  handleOrderDetailsClose,
}) {
  const { formatMessage, locale } = useIntl();
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
                  {moment(selectedOrder.created_at).format('DD/MM/YYYY-HH:MM')}
                </h1>
              </div>
              <div className="flex items-center text-sm">
                <h1 className="text-gray-600">
                  {selectedOrder.status === 'delivered'
                    ? formatMessage({ id: 'delivered-at' })
                    : formatMessage({ id: 'expected-delivery' })}{' '}
                  :
                </h1>
                <h1 className="mx-1">
                  {selectedOrder.status === 'delivered'
                    ? selectedOrder.deliveryDate
                    : 'Soon'}
                </h1>
              </div>
              <div className="flex items-center text-sm">
                <h1 className="text-gray-600 ">
                  {selectedOrder.status === 'delivered'
                    ? formatMessage({ id: 'delivered-to' })
                    : formatMessage({ id: 'deliver-to' })}
                  :{' '}
                </h1>
                <h1 className="mx-1">{selectedOrder.address.marked_address}</h1>
              </div>
              <div className="flex items-center text-sm">
                <h1 className="text-gray-600">
                  {formatMessage({ id: 'payment-method' })} :
                </h1>
                <h1 className="mx-1">K-net</h1>
              </div>
            </div>
            <div className=" text-sm flex flex-col justify-center font-semibold">
              <div
                className={` text-center uppercase px-2 py-1 rounded ${
                  selectedOrder.status === 'delivered'
                    ? 'bg-green-700'
                    : 'bg-orange-600'
                }`}
              >
                {selectedOrder.status === 'delivered'
                  ? formatMessage({ id: 'delivered' })
                  : formatMessage({ id: 'pending' })}
              </div>
              <div className="mt-auto text-center">
                <h1>{formatMessage({ id: 'subtotal' })}</h1>
                <h1 className="text-green-700">{selectedOrder.subtotal}</h1>
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
              <h1>{formatMessage({ id: 'quantity' })}</h1>
              <h1>{formatMessage({ id: 'price' })}</h1>
            </div>
            {selectedOrder.items.map((orderItem, i) => {
              return (
                <div
                  key={orderItem.id}
                  className="my-orders-item-mobile px-2 text-sm"
                >
                  <div className="">
                    <h1 className="">{i + 1}</h1>
                  </div>
                  <Link
                    to={`/${locale}/c/${orderItem.id}`}
                    className="hover:underline"
                  >
                    <h1 className="text-clamp-1  semibold">
                      {orderItem.product.translation[locale].title}
                    </h1>
                  </Link>
                  <div className="">
                    <h1 className="">{orderItem.qty}</h1>
                  </div>
                  <div className="">
                    <h1 className="">{orderItem.price}</h1>
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
              <h1 className="text-green-700 text-base">
                {formatMessage({ id: 'subtotal' })}
              </h1>
              <h1 className="text-green-700 text-base">
                {selectedOrder.subtotal}
              </h1>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
