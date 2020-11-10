import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';

export default function Order({ order }) {
  const { formatMessage } = useIntl();
  const [isOpen, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!isOpen);
  };
  return (
    <motion.div
      layout
      className="rounded border cursor-pointer"
      onClick={toggleOpen}
    >
      <motion.div
        layout
        className={` text-body-text-dark  px-2 py-1 font-semibold  ${
          order.delivered ? 'bg-green-700 ' : 'bg-orange-500 '
        }`}
      >
        <h1>
          {formatMessage({ id: 'status' })} :{' '}
          {order.delivered
            ? formatMessage({ id: 'delivered' })
            : formatMessage({ id: 'pending' })}
        </h1>
      </motion.div>
      <motion.div layout className="orders-grid__desktop text-sm p-2">
        <motion.div layout>
          <h1 className="font-semibold ">
            {formatMessage({ id: 'order-number' })} : {order.orderNo}
          </h1>
          <div className="flex items-center">
            <h1 className="">{formatMessage({ id: 'order-date' })} :</h1>
            <h1 className="text-gray-600 mx-1">{order.orderDate}</h1>
          </div>
          <div className="flex items-center">
            <h1 className="">
              {order.delivered
                ? formatMessage({ id: 'delivered-at' })
                : formatMessage({ id: 'expected-delivery' })}{' '}
              :
            </h1>
            <h1 className="mx-1 text-gray-600">
              {order.delivered ? order.deliveryDate : order.expectedDelivery}
            </h1>
          </div>
          <div className="flex items-center">
            <h1 className="">
              {order.delivered
                ? formatMessage({ id: 'delivered-to' })
                : formatMessage({ id: 'deliver-to' })}
              :
            </h1>
            <h1 className="mx-1 text-gray-600"> {order.deliveryDestination}</h1>
          </div>
          <div className="flex items-center">
            <h1>{formatMessage({ id: 'payment-method' })}:</h1>
            <h1 className="text-gray-600 mx-1">K-net</h1>
          </div>
        </motion.div>
        <motion.div layout>
          <img
            src={order.orderItems[0].photos.small}
            alt={order.orderNo}
            // style={{ width: '50px', height: '64px' }}
          />
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isOpen && <Content orderItems={order.orderItems} />}
      </AnimatePresence>
    </motion.div>
  );
}

const Content = ({ orderItems }) => {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exited: {
      opacity: 0,
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
    >
      {orderItems.map(orderItem => {
        return <div key={orderItem.id}>{orderItem.name}</div>;
      })}
    </motion.div>
  );
};
