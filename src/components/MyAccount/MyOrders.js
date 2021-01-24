import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useQuery } from 'react-query';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { getUserOrders } from '../../Queries/Queries';
import NoOrders from './MyOrders/NoOrders';
import Orders from './MyOrders/Orders';
import AddReview from '../Reviews/AddReview';

export default function MyOrders() {
  /**
   * Main Fetch
   */
  const { data, isLoading } = useQuery(
    'userOrders',
    async () => {
      const res = await getUserOrders();

      return res;
    },
    { retry: true }
  );
  const [showAddReview, setShowAddReview] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const handleAddReviewClose = () => {
    setShowAddReview(false);
  };
  const handleShowAddReviews = index => {
    setShowAddReview(true);
    setSelectedOrder(index);
  };
  if (isLoading)
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
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative overflow-y-auto"
      style={{ height: 'calc(100vh - 62px)' }}
    >
      {data.length === 0 && <NoOrders />}
      {!showAddReview && data.length !== 0 && (
        <Orders handleShowAddReviews={handleShowAddReviews} data={data} />
      )}
      <AnimatePresence>
        {showAddReview && (
          <AddReview
            handleAddReviewClose={handleAddReviewClose}
            data={data}
            selectedOrder={selectedOrder}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
