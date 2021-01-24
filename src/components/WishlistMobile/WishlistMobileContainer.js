import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import MainContentLoader from '../CartMobile/ContentLoaders/MainContentLoader';
import NoWishlistItemsMobile from './NoWishlistItemsMobile';
import WishlistMobileItem from './WishlistMobileItem';

export default function WishlistMobileContainer({
  wishlistItemsLoading,
  wishlistItems,
  handleRemoveItemFromWishList,
  removeFromWishListButtonLoading,
}) {
  const { formatMessage } = useIntl();
  if (wishlistItemsLoading) {
    return <MainContentLoader />;
  }
  return (
    <div>
      {wishlistItems.length === 0 && (
        <AnimatePresence>
          {wishlistItems.length === 0 && <NoWishlistItemsMobile />}
        </AnimatePresence>
      )}
      {wishlistItems.length !== 0 && (
        <AnimateSharedLayout>
          <motion.div initial={false} layout className="mb-2">
            <motion.div layout className="px-2 py-3 border-b ">
              <h1 className="text-lg font-semibold">
                {formatMessage({ id: 'wishlist' })}
              </h1>
            </motion.div>
            <AnimatePresence>
              {wishlistItems.map(item => (
                <WishlistMobileItem
                  key={item.id}
                  item={item}
                  handleRemoveItemFromWishList={handleRemoveItemFromWishList}
                  removeFromWishListButtonLoading={
                    removeFromWishListButtonLoading
                  }
                  wishlistItemsLoading={wishlistItemsLoading}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimateSharedLayout>
      )}
    </div>
  );
}
