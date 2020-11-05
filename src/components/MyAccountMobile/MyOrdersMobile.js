import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import NoOrdersMobile from './MyOrdersMobile/NoOrdersMobile';
import OrderMobile from './MyOrdersMobile/OrderMobile';
import OrderDetailsMobile from './MyOrdersMobile/OrderDetailsMobile';
export default function MyOrdersMobile() {
  const { orderedItems, isLightTheme } = React.useContext(DataProvider);
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
      {orderedItems.length === 0 ? (
        <NoOrdersMobile />
      ) : (
        <div className="p-2">
          {orderedItems.map((order, i) => {
            return (
              <div key={i}>
                <OrderMobile
                  isLightTheme={isLightTheme}
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
        isLightTheme={isLightTheme}
      />
    </div>
  );
}
