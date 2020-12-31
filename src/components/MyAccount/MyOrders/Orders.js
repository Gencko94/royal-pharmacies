import { motion } from 'framer-motion';
import React from 'react';
import Order from './Order';

export default function Orders({ data }) {
  return (
    <motion.div layout initial={false} className="h-full">
      <motion.div layout initial={false} className="grid grid-cols-1 gap-2">
        {data.map(order => {
          return <Order key={order.id} order={order} />;
        })}
      </motion.div>
    </motion.div>
  );
}
