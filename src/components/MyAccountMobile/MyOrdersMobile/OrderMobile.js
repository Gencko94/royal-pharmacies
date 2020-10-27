import React from 'react';

export default function OrderMobile({ order, setSelectedOrder, isLightTheme }) {
  return (
    <div className=" bg-body-light border overflow-hidden flex  relative  rounded-sm p-2 ">
      <div
        className="flex flex-col items-start justify-start text-sm mr-2"
        style={{ flexBasis: '66.66%' }}
      >
        <div className="mb-1">
          <h1>Order Number : {order.orderNo}</h1>
          <h1 className="text-gray-600 text-xs ">
            Ordered at : {order.orderDate}
          </h1>
          <h1 className="text-gray-600 text-xs">
            {order.delivered
              ? `Delivered at : ${order.deliveryDate}`
              : `Expected Delivery :  ${order.expectedDelivery}`}
          </h1>
        </div>

        <div
          className={` text-body-text-dark text-xs px-2 py-0 font-semibold rounded ${
            order.delivered ? 'bg-green-700 ' : 'bg-orange-500 '
          }`}
        >
          <h1>Status : {order.delivered ? 'Delivered' : 'Pending'}</h1>
        </div>
        <button
          onClick={() => setSelectedOrder(order)}
          className="px-3 py-1 mt-auto text-body-text-dark bg-blue-700  rounded-lg font-semibold"
        >
          Order Details
        </button>
      </div>

      <div
        className="flex flex-col justify-center items-center"
        style={{ flexBasis: '33.33%' }}
      >
        <img
          src={order.orderItems[0].photos.small}
          alt={order.orderNo}
          // style={{ width: '50px', height: '64px' }}
        />
      </div>
    </div>
  );
}
