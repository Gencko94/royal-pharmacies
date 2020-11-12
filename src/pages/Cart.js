import React from 'react';
import CartItem from '../components/Cart/CartItem';
// import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';
import RecentlyViewedVertical from '../components/RecentlyViewedVertical';
import { DataProvider } from '../contexts/DataContext';

import ItemsSlider from '../components/Home/ItemsSlider/ItemsSlider';
import FeaturedItemsVertical from '../components/Cart/FeaturedItemsVertical';
import { Helmet } from 'react-helmet';
import CheckoutModal from '../components/Cart/CheckoutModal';
import useClickAway from '../hooks/useClickAway';
import Layout from '../components/Layout';
import { useIntl } from 'react-intl';
import ContentLoader from 'react-content-loader';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { queryCache, useMutation, useQuery } from 'react-query';
import NoCartItems from '../components/Cart/NoCartItems';
import ErrorSnackbar from '../components/ErrorSnackbar';
export default function Cart() {
  const {
    healthCare,
    isLightTheme,
    getCartItems,
    removeItemFromCart,
  } = React.useContext(DataProvider);
  /**
   * Main Fetch
   */
  const { data, isLoading, refetch } = useQuery(
    'cartItems',
    async () => {
      const res = await getCartItems();
      return res;
    },
    {
      refetchOnWindowFocus: false,
      onError: error => {
        setErrorOpen(true);
        setErrorMessage(error);
      },
    }
  );

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
        queryCache.setQueryData('cartItems', prev => {
          return {
            ...prev,
            cartItems: data.cartItems,
            cartTotal: data.cartTotal,
          };
        });
        setRemoveButtonLoading(null);
        refetch();
      },
      onError: error => {
        setErrorOpen(true);
        setErrorMessage(error);
      },
    }
  );

  const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));
  const [checkoutModalOpen, setCheckOutModalOpen] = React.useState(false);
  const [removeButtonLoading, setRemoveButtonLoading] = React.useState(null);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const modalRef = React.useRef();
  useClickAway(modalRef, () => {
    setCheckOutModalOpen(false);
  });
  const { formatMessage, locale } = useIntl();
  const handleRemoveItem = async id => {
    try {
      await removeMutation(id);
    } catch (error) {
      console.log(error);
    }
  };
  const closeErrorSnackbar = () => {
    setErrorOpen(false);
  };
  return (
    <Layout>
      <Helmet>
        <title>Cart | MRG</title>
      </Helmet>
      {errorOpen && (
        <ErrorSnackbar
          message={errorMessage}
          closeFunction={closeErrorSnackbar}
        />
      )}
      <div className="px-4 py-2 max-w-default mx-auto">
        <div className=" cart  ">
          <div className=" cart__container ">
            {isLoading && (
              <ContentLoader
                speed={3}
                viewBox="0 0 400 200"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                rtl={locale === 'ar'}
                style={{ alignSelf: 'flex-start' }}
              >
                <rect x="0" y="0" rx="1" ry="1" width="22%" height="56" />
                <rect x="23%" y="0" rx="1" ry="1" width="77%" height="16" />
                <rect x="23%" y="20px" rx="1" ry="1" width="77%" height="16" />
                <rect x="23%" y="40px" rx="1" ry="1" width="77%" height="16" />
                <rect x="0" y="65" rx="1" ry="1" width="22%" height="56" />
                <rect x="23%" y="65" rx="1" ry="1" width="77%" height="16" />
                <rect x="23%" y="85" rx="1" ry="1" width="77%" height="16" />
                <rect x="23%" y="105" rx="1" ry="1" width="77%" height="16" />
                <rect x="0" y="130" rx="1" ry="1" width="22%" height="56" />
                <rect x="23%" y="130" rx="1" ry="1" width="77%" height="16" />
                <rect x="23%" y="150" rx="1" ry="1" width="77%" height="16" />
                <rect x="23%" y="170" rx="1" ry="1" width="77%" height="16" />
              </ContentLoader>
            )}

            {!isLoading && (
              <>
                <AnimatePresence>
                  {data.cartItems.length === 0 && <NoCartItems />}
                </AnimatePresence>
                {data.cartItems.length !== 0 && (
                  <>
                    <div className="cart__title font-semibold text-lg">
                      <h1 className="  ">
                        {formatMessage({ id: 'shopping-cart' })}
                      </h1>
                      <h1 className="  ">{formatMessage({ id: 'item' })}</h1>
                      <h1 className="text-center">
                        {formatMessage({ id: 'price' })}
                      </h1>
                    </div>
                    <hr />
                    <AnimateSharedLayout>
                      <motion.div
                        initial={false}
                        layout
                        className=" grid grid-cols-1 gap-2"
                      >
                        <AnimatePresence>
                          {data.cartItems.map(item => {
                            return (
                              <CartItem
                                key={item.id}
                                item={item}
                                handleRemoveItem={handleRemoveItem}
                                removeButtonLoading={removeButtonLoading}
                              />
                            );
                          })}
                        </AnimatePresence>
                      </motion.div>

                      <motion.div
                        layout
                        className="flex justify-end p-2 rounded mt-2 border bg-gray-100"
                      >
                        <h1 className="text-lg font-semibold">
                          {formatMessage({ id: 'subtotal' })} (
                          {data.cartItems.length}{' '}
                          {data.cartItems.length === 1 ? 'item' : 'items'}) :{' '}
                          {data.cartTotal} KD
                        </h1>
                      </motion.div>
                      <motion.div layout className="text-sm my-4">
                        <h1>{formatMessage({ id: 'cart-tos' })}</h1>
                      </motion.div>
                    </AnimateSharedLayout>
                  </>
                )}
              </>
            )}
            <hr />
            {/* {visitedItems.length > 7 ? (
            <RecentlyVisitedHorizontal visitedItems={visitedItems} />
          ) : (
            <ItemsSlider
              data={phone}
              miniLogo={false}
              isLightTheme={isLightTheme}
              title="Save Big with Phones & Tablets"
            />
          )} */}
          </div>
          <div
            className="font-semibold overflow-hidden  sticky top-0"
            style={{ top: '134px' }}
          >
            {isLoading && (
              <div className=" rounded border bg-gray-100 p-2 flex justify-center flex-col mb-2 ">
                <ContentLoader
                  speed={3}
                  viewBox="0 0 400 115"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                  rtl={locale === 'ar'}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <rect x="0" y="0" rx="5" ry="5" width="100%" height="53" />
                  <rect x="0" y="62" rx="5" ry="5" width="100%" height="53" />
                </ContentLoader>
              </div>
            )}
            {!isLoading && !data.cartItems.length !== 0 && (
              <div className=" rounded border bg-gray-100 p-2 flex justify-center flex-col mb-2 ">
                <h1 className="text-base font-semibold mb-2 ">
                  {formatMessage({ id: 'subtotal' })} ({data.cartItems.length}{' '}
                  {data.cartItems.length === 1 ? 'item' : 'items'}) :{' '}
                  {data.cartTotal} KD
                </h1>
                <button
                  onClick={() => setCheckOutModalOpen(true)}
                  className={`${
                    data.cartItems.length === 0
                      ? 'cursor-not-allowed bg-gray-600'
                      : 'bg-green-600'
                  } p-1 rounded text-gray-100 `}
                  disabled={data.cartItems.length === 0}
                >
                  {formatMessage({ id: 'checkout' })}
                </button>
              </div>
            )}

            {visitedItems.length > 4 ? (
              <RecentlyViewedVertical visitedItems={visitedItems} />
            ) : (
              <FeaturedItemsVertical />
            )}
          </div>
        </div>
        <ItemsSlider
          data={healthCare}
          miniLogo={false}
          type="healthCare"
          title="Health Care Essentials"
          isLightTheme={isLightTheme}
        />
        <CheckoutModal
          checkoutModalOpen={checkoutModalOpen}
          isLightTheme={isLightTheme}
          modalRef={modalRef}
          setCheckOutModalOpen={setCheckOutModalOpen}
        />
      </div>
    </Layout>
  );
}
