import React from 'react';
import NoOrdersMobile from './MyOrdersMobile/NoOrdersMobile';
import OrderMobile from './MyOrdersMobile/OrderMobile';
import OrderDetailsMobile from './MyOrdersMobile/OrderDetailsMobile';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { getUserOrders } from '../../Queries/Queries';
import AddReviewMobile from '../Reviews/AddReviewMobile';
export default function MyOrdersMobile() {
  const [orderDetailsOpen, setOrderDetailsOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [selectedOrderIndex, setSelectedOrderIndex] = React.useState(null);

  /**
   * Main Fetch
   */
  const { data, isLoading } = useQuery('userOrders', async () => {
    const res = await getUserOrders();

    return res;
  });
  const handleShowOrderDetails = order => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };
  const handleOrderDetailsClose = React.useCallback(() => {
    setSelectedOrder(null);
    setOrderDetailsOpen(false);
  }, []);
  const [showAddReview, setShowAddReview] = React.useState(false);

  const handleAddReviewClose = () => {
    setShowAddReview(false);
  };
  const handleShowAddReviews = index => {
    setShowAddReview(true);
    setSelectedOrderIndex(index);
  };
  const containerVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: '-100%',
      opacity: 0,
    },
  };

  if (isLoading)
    return (
      <div
        className="flex  justify-center items-center"
        style={{ minHeight: 'calc(-176px + 100vh)' }}
      >
        <Loader
          type="ThreeDots"
          color="#b72b2b"
          height={40}
          width={40}
          visible={isLoading}
        />
      </div>
    );
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className=""
        style={{ minHeight: 'calc(-176px + 100vh)' }}
      >
        {data.length === 0 ? (
          <NoOrdersMobile />
        ) : (
          <div className="p-3 my-orders-items__grid-mobile">
            {data.map((order, i) => {
              return (
                <div key={order.id}>
                  <OrderMobile
                    order={order}
                    handleShowOrderDetails={handleShowOrderDetails}
                    handleShowAddReviews={handleShowAddReviews}
                    index={i}
                  />
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {orderDetailsOpen && (
          <OrderDetailsMobile
            key="order-details"
            selectedOrder={selectedOrder}
            handleOrderDetailsClose={handleOrderDetailsClose}
            orderDetailsOpen={orderDetailsOpen}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAddReview && (
          <AddReviewMobile
            key="order-review"
            handleAddReviewClose={handleAddReviewClose}
            data={data}
            selectedOrder={selectedOrderIndex}
            showAddReview={showAddReview}
          />
        )}
      </AnimatePresence>
    </>
  );
}
