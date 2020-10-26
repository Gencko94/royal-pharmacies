import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import NoOrdersMobile from './MyOrdersMobile/NoOrdersMobile';
import OrderMobile from './MyOrdersMobile/OrderMobile';
import OrderDetailsMobile from './MyOrdersMobile/OrderDetailsMobile';
export default function MyOrdersMobile() {
  const { orderedItems } = React.useContext(DataProvider);
  const [orderDetailsOpen, setOrderDetailsOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const handleOrderDetailsClose = () => {
    setSelectedOrder(null);
  };
  React.useEffect(() => {
    if (selectedOrder) {
      setOrderDetailsOpen(true);
    } else {
      setOrderDetailsOpen(false);
    }
  }, [selectedOrder]);
  return (
    <div className="  ">
      <div className="p-2">
        <h1 className="text-xl font-semibold text-center">Orders</h1>
      </div>
      {orderedItems.length === 0 ? (
        <NoOrdersMobile />
      ) : (
        <div className="p-2">
          {orderedItems.map((order, i) => {
            return (
              <div key={i}>
                <OrderMobile
                  order={order}
                  setSelectedOrder={setSelectedOrder}
                />
              </div>
            );
          })}
        </div>
      )}
      <OrderDetailsMobile
        selectedOrder={selectedOrder}
        handleOrderDetailsClose={handleOrderDetailsClose}
        orderDetailsOpen={orderDetailsOpen}
      />
    </div>
  );
}
