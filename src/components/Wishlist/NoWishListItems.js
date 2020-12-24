import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import cartEmptyimg from '../../assets/illustrations/cartEmpty.png';
export default function NoWishListItems() {
  const { formatMessage } = useIntl();
  const variants = {
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
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className=" flex items-center justify-center h-full"
    >
      <div className="p-2 flex flex-col items-center justify-center ">
        <div style={{ width: '275px' }}>
          <img src={cartEmptyimg} alt="Empty Cart Bag" className="" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold p-2 ">
            {formatMessage({ id: 'wishlist-empty' })}
          </h1>
          <Link to="/" className="text-blue-600 hover:underline">
            {formatMessage({ id: 'check-today-deals' })}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
