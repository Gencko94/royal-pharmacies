import React from 'react';
import { queryCache, useMutation, useQuery } from 'react-query';
import LayoutMobile from '../components/LayoutMobile';
import { getWishlistItems, removeFromWishlist } from '../Queries/Queries';
import MainContentLoader from '../components/CartMobile/ContentLoaders/MainContentLoader';
import CartEmptyMobile from '../components/CartMobile/CartEmptyMobile';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import WishlistMobileItem from '../components/WishlistMobile/WishlistMobileItem';
import ItemsSlider from '../components/Home/ItemsSlider/ItemsSlider';
import { useIntl } from 'react-intl';
export default function WishlistMobile({ userId }) {
  const { formatMessage } = useIntl();
  const [
    removeFromWishListButtonLoading,
    setRemoveFromWishListButtonLoading,
  ] = React.useState(null);
  /**
   * Main Fetch
   */
  const { data, isLoading, refetch } = useQuery(
    'wishListItems',
    async () => {
      const res = await getWishlistItems(userId);
      return res;
    },
    {
      refetchOnWindowFocus: false,
      onError: error => {
        // setErrorOpen(true);
        // setErrorMessage(error);
      },
    }
  );

  /**
   * Remove From WishList Mutation
   */
  const [removeFromWishListMutation] = useMutation(
    async id => {
      setRemoveFromWishListButtonLoading(id);
      const res = await removeFromWishlist(id, userId);
      if (res === true) {
        return id;
      }
    },
    {
      onSuccess: data => {
        queryCache.setQueryData('wishListItems', prev => {
          const updated = prev.filter(i => i.id !== data);
          return [...updated];
        });
        // queryCache.setQueryData('cartAndWishListLength', prev => {
        //   return {
        //     ...prev,
        //     wishlist: data.wishListItems.length,
        //   };
        // });
        setRemoveFromWishListButtonLoading(null);
        refetch();
      },
      onError: error => {
        // setErrorOpen(true);
        // setErrorMessage(error);
      },
      throwOnError: true,
    }
  );
  const handleRemoveItemFromWishList = async id => {
    try {
      await removeFromWishListMutation(id);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <LayoutMobile>
      <div className=" py-1 px-2">
        {isLoading && <MainContentLoader />}
        {!isLoading && data.length === 0 && <CartEmptyMobile />}
        {!isLoading && data.length !== 0 && (
          <AnimateSharedLayout>
            <motion.div initial={false} layout className="mb-2">
              <AnimatePresence>
                {data.map(item => (
                  <WishlistMobileItem
                    key={item.id}
                    item={item}
                    handleRemoveItemFromWishList={handleRemoveItemFromWishList}
                    removeFromWishListButtonLoading={
                      removeFromWishListButtonLoading
                    }
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </AnimateSharedLayout>
        )}
        <h1 className="text-xs my-2 px-2">
          {formatMessage({ id: 'cart-tos' })}
        </h1>
        <hr />
        <ItemsSlider
          type="phone"
          miniLogo={false}
          title="Save Big with Phones & Tablets"
        />
      </div>
    </LayoutMobile>
  );
}
