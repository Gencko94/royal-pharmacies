import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import cartBag from '../../assets/illustrations/cartBag.svg';
import { AuthProvider } from '../../contexts/AuthContext';
export default function NoCartItems() {
  const { formatMessage, locale } = useIntl();
  const { userId } = React.useContext(AuthProvider);
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
      className=" flex"
    >
      <img src={cartBag} alt="Empty Cart Bag" className=" h-32" />
      <div className="mx-5">
        <h1 className="text-2xl font-bold ">
          {formatMessage({ id: 'cart-empty' })}
        </h1>
        <Link
          to={`/${locale}`}
          className="text-sm text-blue-600 hover:underline"
        >
          {formatMessage({ id: 'check-today-deals' })}
        </Link>
        {!userId && (
          <div className="flex items-center flex-wrap">
            <Link
              to={`/${locale}/app/login`}
              className={` rounded p-2 mt-2 bg-green-700 text-second-nav-text-light  `}
            >
              {formatMessage({ id: 'login-button' })}
            </Link>
            <Link
              to={`/${locale}/app/register`}
              className={` rounded p-2 mt-2 bg-blue-700 text-second-nav-text-light mx-2  `}
            >
              {formatMessage({ id: 'register-button' })}
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
