import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { GrFormClose } from 'react-icons/gr';
export default function CheckoutPopupMobile({ setCheckOutPopupOpen }) {
  const { formatMessage, locale } = useIntl();
  const history = useHistory();
  const containerVariants = {
    hidden: {
      y: '100%',
    },
    visible: {
      y: 0,
      transition: {
        type: 'tween',
      },
    },
    exited: {
      y: '100%',
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="cart-checkout-popup-mobile p-2 pb-6 bg-nav-cat-light shadow-lg border-t"
    >
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-semibold">
          {formatMessage({ id: 'not-signed-in' })} ,
          {formatMessage({ id: 'you-can' })} :
        </h1>
        <button onClick={() => setCheckOutPopupOpen(false)}>
          <GrFormClose className="w-5 h-5" />
        </button>
      </div>
      <div
        className="text-white"
        style={{
          display: 'grid',
          gridTemplateColumns: '0.5fr 0.5fr',
          gap: '0.25rem',
        }}
      >
        <div className="flex-1">
          <button
            onClick={() => history.push(`/${locale}/checkout/guest-checkout`)}
            className="p-2 text-sm  bg-green-600 rounded w-full text-center uppercase"
          >
            {formatMessage({ id: 'guest-checkout' })}
          </button>
        </div>
        <div className="flex-1">
          <button
            onClick={() => history.push(`/${locale}/app/login`)}
            className="p-2 text-sm  text-center bg-blue-700 rounded w-full uppercase"
          >
            {formatMessage({ id: 'short-login' })}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
