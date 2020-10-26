import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';

export default function OrderDetailsMobile({
  orderDetailsOpen,
  selectedOrder,
  handleOrderDetailsClose,
}) {
  React.useEffect(() => {
    if (orderDetailsOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [orderDetailsOpen]);
  return (
    <CSSTransition
      in={orderDetailsOpen}
      timeout={200}
      classNames="order-items__mobile"
      unmountOnExit
    >
      <div className="absolute top-0 left-0 right-0 bottom-0  bg-body-light z-30 max-w-full overflow-y-auto">
        <div className=" sticky top-0 p-2 flex items-center bg-main-color text-main-text">
          <button className="text-white mr-4" onClick={handleOrderDetailsClose}>
            <AiOutlineArrowLeft className="w-6 h-6 " />
          </button>
          <h1 className="font-semibold text-lg">Order Details</h1>
        </div>
        {selectedOrder && (
          <div className="p-3 ">
            <div className="mb-3 p-3 rounded-lg flex bg-gray-900 text-main-text">
              <div className="flex-1">
                <h1 className="font-bold mb-1">John Doe</h1>
                <h1 className="font-semibold text-xs">
                  Order No {selectedOrder.orderNo}
                </h1>
                <h1 className="font-semibold text-xs text-gray-600">
                  Order Date {selectedOrder.orderDate}
                </h1>
                <h1 className="text-gray-600 text-xs">
                  {selectedOrder.delivered
                    ? `Delivered on : ${selectedOrder.deliveryDate}`
                    : `Expected Delivery :  ${selectedOrder.expectedDelivery}`}
                </h1>
                <h1 className="text-gray-600 text-xs">
                  {selectedOrder.delivered ? 'Delivered To' : 'Deliver To'} :{' '}
                  {selectedOrder.deliveryDestination}
                </h1>
                <h1 className="text-gray-600 text-xs">
                  Payment Method : K-net
                </h1>
              </div>
              <div className=" text-xs flex flex-col justify-center font-semibold">
                <div
                  className={` my-auto uppercase px-2 py-1 rounded ${
                    selectedOrder.delivered ? 'bg-green-700' : 'bg-orange-600'
                  }`}
                >
                  {selectedOrder.delivered ? 'Delivered' : 'Pending'}
                </div>
                <div className="mt-auto text-center">
                  <h1>Total Amount</h1>
                  <h1>{selectedOrder.orderAmount}</h1>
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-bold">Order Items</h1>
            </div>
          </div>
        )}
      </div>
    </CSSTransition>
  );
}
