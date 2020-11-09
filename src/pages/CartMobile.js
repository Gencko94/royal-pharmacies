import React from 'react';
import { DataProvider } from '../contexts/DataContext';
// import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';
import ItemsSlider from '../components/Home/ItemsSlider/ItemsSlider';
import LayoutMobile from '../components/LayoutMobile';
import { useIntl } from 'react-intl';
import CartItemMobile from '../components/CartMobile/CartItemMobile';
import CheckoutButton from '../components/CartMobile/CheckoutButton';
import CartEmpty from '../components/CartMobile/CartEmpty';
import MainContentLoader from '../components/CartMobile/ContentLoaders/MainContentLoader';
import { queryCache, useMutation, useQuery } from 'react-query';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

export default function CartMobile() {
  const { formatMessage } = useIntl();
  const {
    removeItemFromCart,

    isLightTheme,
    getCartItems,
  } = React.useContext(DataProvider);

  /**
   * Main Fetch
   */
  const { data, isLoading, refetch } = useQuery('cartItemsMobile', async () => {
    const res = await getCartItems();
    return res;
  });

  /**
   * Remove Mutation
   */
  const [removeMutation] = useMutation(
    async id => {
      setRemoveButtonLoading(id);
      const res = await removeItemFromCart(id);
      return res;
    },
    {
      onSuccess: data => {
        queryCache.setQueryData('cartItemsMobile', prev => {
          return {
            ...prev,
            cartItems: data.cartItems,
            cartTotal: data.cartTotal,
          };
        });
        setRemoveButtonLoading(null);
        refetch();
      },
    }
  );

  const [removeButtonLoading, setRemoveButtonLoading] = React.useState(null);

  // const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));
  const handleRemoveItem = async id => {
    try {
      await removeMutation(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutMobile>
      <div className=" py-1 px-2">
        {!isLoading && data.cartItems.length !== 0 && (
          <CheckoutButton data={data.cartItems} cartTotal={data.cartTotal} />
        )}
        {isLoading && <MainContentLoader />}
        {!isLoading && data.cartItems.length === 0 && <CartEmpty />}

        {!isLoading && data.cartItems.length !== 0 && (
          <AnimateSharedLayout>
            <motion.div initial={false} layout className="mb-2">
              <AnimatePresence>
                {data.cartItems.map(item => (
                  <CartItemMobile
                    key={item.id}
                    item={item}
                    handleRemoveItem={handleRemoveItem}
                    removeButtonLoading={removeButtonLoading}
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
        {/* <RecentlyVisitedHorizontal visitedItems={visitedItems} /> */}

        <ItemsSlider
          type="phone"
          miniLogo={false}
          isLightTheme={isLightTheme}
          title="Save Big with Phones & Tablets"
        />
      </div>
    </LayoutMobile>
  );
}
