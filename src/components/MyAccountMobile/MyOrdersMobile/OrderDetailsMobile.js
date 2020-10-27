import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import MultiClamp from 'react-multi-clamp';
import { CSSTransition } from 'react-transition-group';

export default function OrderDetailsMobile({
  orderDetailsOpen,
  selectedOrder,
  handleOrderDetailsClose,
  isLightTheme,
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
      <div
        className="fixed top-0 left-0 right-0 bottom-0 overflow-y-scroll bg-body-light z-30 max-h-full "
        style={{ overflowY: 'scroll !important' }}
      >
        <div className=" sticky top-0 p-3 flex items-center bg-main-color text-main-text z-1">
          <button
            className="text-white text-center mr-4"
            onClick={handleOrderDetailsClose}
          >
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
                  className={`  uppercase px-2 py-1 rounded ${
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
            <hr className="my-1" />
            <div className="order-details-mobile__grid my-4">
              {selectedOrder.orderItems.map((item, i) => {
                return (
                  <div key={i} className="">
                    <div
                      className={` overflow-hidden flex flex-col relative ${
                        isLightTheme
                          ? 'shadow-itemsSlider-shallow'
                          : 'shadow-itemsSlider'
                      } rounded`}
                    >
                      <a
                        href={`/products/${item.category.replace(
                          /\s|%|,/g,
                          '-'
                        )}/${item.name.replace(/\s|%|,/g, '-')}/${item.id}`}
                      >
                        <img
                          title={item.name}
                          src={item.photos.small}
                          alt={item.name}
                          // className=" w-full "
                        />
                      </a>
                      <hr />

                      <div
                        className={`relative flex flex-col  px-2 py-1 ${
                          isLightTheme
                            ? 'bg-body-light text-body-text-light'
                            : 'bg-body-dark text-body-text-dark'
                        }`}
                        style={{ minHeight: '72px' }}
                      >
                        <a
                          title={item.name}
                          className="hover:underline"
                          href={`/products/${item.category.replace(
                            /\s|%|,/g,
                            '-'
                          )}/${item.name.replace(/\s|%|,/g, '-')}/${item.id}`}
                        >
                          <MultiClamp
                            className="text-sm  font-semibold"
                            clamp={2}
                            ellipsis="..."
                          >
                            {item.name}
                          </MultiClamp>
                        </a>

                        <div className="flex items-center">
                          <p className=" mr-3  text-xs font-semibold text-red-700 whitespace-no-wrap">
                            {item.price} <span className="text-xs ">KD</span>
                          </p>
                          {item.sale && (
                            <p className="text-xs  line-through text-gray-500  font-bold whitespace-no-wrap">
                              {' '}
                              {item.priceBefore}{' '}
                              <span className="font-normal">KD</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </CSSTransition>
  );
}
