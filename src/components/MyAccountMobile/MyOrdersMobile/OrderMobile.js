import React from 'react';
import { useIntl } from 'react-intl';
import moment from 'moment';

export default function OrderMobile({ order, setSelectedOrder }) {
  const { formatMessage } = useIntl();
  const resolveStatus = () => {
    switch (order.status) {
      case 'completed':
        return (
          <div
            className={` text-body-text-dark flex items-center   px-2 py-1 font-semibold bg-green-700  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-completed' })}</h1>
          </div>
        );

      case 'canceled':
        return (
          <div
            className={` text-body-text-dark flex items-center px-2 py-1 font-semibold bg-main-color  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-cancelled' })}</h1>
          </div>
        );
      case 'pending':
        return (
          <div
            className={` text-body-text-dark  flex items-center   px-2 py-1 font-semibold bg-yellow-600  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-pending' })}</h1>
          </div>
        );
      case 'delivery':
        return (
          <div
            className={` text-body-text-dark  flex items-center   px-2 py-1 font-semibold bg-blue-600  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-delivery' })}</h1>
          </div>
        );
      case 'waiting_for_payment':
        return (
          <div
            className={` text-body-text-dark flex items-center  px-2 py-1 font-semibold bg-yellow-600  `}
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
            className={` text-body-text-dark flex items-center  px-2 py-1 font-semibold bg-blue-600  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-confirmed' })}</h1>
          </div>
        );
      case 'new':
        return (
          <div
            className={`text-body-text-dark  px-2 py-1 font-semibold flex items-center  bg-blue-600  `}
          >
            <h1>{formatMessage({ id: 'order-status' })}</h1>:
            <h1 className="mx-1">{formatMessage({ id: 'order-new' })}</h1>
          </div>
        );

      default:
        break;
    }
  };
  return (
    <div className=" bg-body-light border overflow-hidden rounded-lg ">
      {resolveStatus()}

      <div className=" text-sm mr-2 p-2 my-orders-grid__mobile">
        <div>
          <div className="font-semibold flex items-center">
            <h1 className="text-gray-700">
              {formatMessage({ id: 'order-number' })} :
            </h1>
            <h1 className="mx-1">{order.id}</h1>
          </div>
          <div className="font-semibold flex items-center">
            <h1 className="text-gray-700">
              {formatMessage({ id: 'order-date' })} :
            </h1>
            <h1 className="mx-1">
              {' '}
              {moment(order.created_at).format('DD/MM/YYYY - HH:MM')}
            </h1>
          </div>

          <div className=" mt-8">
            <button
              onClick={() => setSelectedOrder(order)}
              className="px-3 py-1 text-body-text-dark bg-blue-700 uppercase  rounded font-semibold"
            >
              {formatMessage({ id: 'order-details' })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
