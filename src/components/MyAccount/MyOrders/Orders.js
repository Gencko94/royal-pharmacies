import { motion } from 'framer-motion';
import React from 'react';
import Order from './Order';

export default function Orders({ data, handleShowAddReviews }) {
  return (
    <motion.div layout initial={false} className="grid grid-cols-1 gap-2">
      {data.map((order, i) => {
        return (
          <Order
            key={order.id}
            index={i}
            order={order}
            handleShowAddReviews={handleShowAddReviews}
          />
        );
      })}
    </motion.div>
  );
}
