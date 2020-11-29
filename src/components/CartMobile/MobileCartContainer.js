import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import CartEmptyMobile from './CartEmptyMobile';
import CartItemMobile from './CartItemMobile';
import MainContentLoader from './ContentLoaders/MainContentLoader';

export default function MobileCartContainer({
  cartItems,
  handleRemoveItemFromCart,
  removefromCartButtonLoading,
  cartItemsLoading,
  wishlistItems,
}) {
  const { formatMessage } = useIntl();
  if (cartItemsLoading) {
    return <MainContentLoader />;
  }
  return (
    <div>
      {cartItems.length === 0 && (
        <AnimatePresence>
          {cartItems.length === 0 && <CartEmptyMobile />}
        </AnimatePresence>
      )}
      {cartItems.length !== 0 && (
        <AnimateSharedLayout>
          <motion.div initial={false} layout className="mb-2">
            <AnimatePresence>
              {cartItems.map(item => (
                <CartItemMobile
                  key={item.id}
                  item={item}
                  handleRemoveItemFromCart={handleRemoveItemFromCart}
                  removefromCartButtonLoading={removefromCartButtonLoading}
                  wishlistItems={wishlistItems}
                />
              ))}
            </AnimatePresence>
          </motion.div>
          <motion.h1 layout className="text-xs my-2 px-2">
            {formatMessage({ id: 'cart-tos' })}
          </motion.h1>
          <motion.hr layout />
        </AnimateSharedLayout>
      )}
    </div>
  );
}
