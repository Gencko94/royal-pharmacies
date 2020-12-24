import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import cartEmptyimg from '../../assets/illustrations/cartEmpty.png';
import { AuthProvider } from '../../contexts/AuthContext';
export default function CartEmpty() {
  const { userId } = React.useContext(AuthProvider);
  const { formatMessage, locale } = useIntl();
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
      className=" flex flex-col items-center justify-center h-full"
    >
      <div className="flex items-center justify-center flex-col">
        <div style={{ width: '275px' }}>
          <img src={cartEmptyimg} alt="Empty Cart Bag" className="" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold p-2">
            {formatMessage({ id: 'cart-empty' })}
          </h1>
          <Link to="/" className="text-blue-600 hover:underline">
            {formatMessage({ id: 'check-today-deals' })}
          </Link>
        </div>
      </div>
      {!userId && (
        <div className="flex flex-col justify-center p-2 font-semibold">
          <Link
            to={`/${locale}/app/login`}
            className={`  text-center rounded py-2 px-3 bg-green-700 text-main-text uppercase `}
          >
            {formatMessage({ id: 'login' })}
          </Link>
          <Link
            to={`/${locale}/app/register`}
            className={` text-center  rounded py-2 px-3 bg-blue-700 text-main-text mt-2 uppercase `}
          >
            {formatMessage({ id: 'register' })}
          </Link>
        </div>
      )}
    </motion.div>
  );
}
