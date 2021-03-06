import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import CartItemMobile from './CartItemMobile';
import MainContentLoader from './ContentLoaders/MainContentLoader';
import { GrFormClose } from 'react-icons/gr';
export default function MobileCartContainer({
  cartItems,
  cartItemsLoading,
  cartMessage,
}) {
  const [showMessage, setShowMessage] = React.useState(true);
  const { formatMessage, locale } = useIntl();
  if (cartItemsLoading) {
    return <MainContentLoader />;
  }
  return (
    <AnimateSharedLayout>
      {cartMessage && showMessage && (
        <>
          <div className="rounded text-sm bg-blue-400 p-3 relative">
            {formatMessage({ id: cartMessage })}
            <button
              onClick={() => setShowMessage(false)}
              className="absolute rounded hover:bg-gray-100 transition duration-75"
              style={{
                top: '4px',
                right: locale === 'en' ? '3px' : '',
                left: locale === 'ar' ? '3px' : '',
              }}
            >
              <GrFormClose className="w-5 h-5" />
            </button>
          </div>
          <hr className="my-1" />
        </>
      )}
      <motion.div initial={false} layout className="mb-2">
        <motion.div layout className="px-2 py-3 border-b">
          <h1 className="text-lg font-semibold">
            {formatMessage({ id: 'cart' })}
          </h1>
        </motion.div>
        <AnimatePresence>
          {cartItems.map(item => (
            <CartItemMobile key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>
      <motion.h1 layout className="text-xs my-2 px-2">
        {formatMessage({ id: 'cart-tos' })}
      </motion.h1>
      <motion.hr layout />
    </AnimateSharedLayout>
  );
}
