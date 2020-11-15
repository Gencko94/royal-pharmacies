import React from 'react';
// import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';
import { DataProvider } from '../contexts/DataContext';

import ItemsSlider from '../components/Home/ItemsSlider/ItemsSlider';
import { Helmet } from 'react-helmet';
import CheckoutModal from '../components/Cart/CheckoutModal';
import useClickAway from '../hooks/useClickAway';
import Layout from '../components/Layout';
import { queryCache, useMutation, useQuery } from 'react-query';
import ErrorSnackbar from '../components/ErrorSnackbar';
import CartContainer from '../components/Cart/CartContainer';
import CartRightSide from '../components/Cart/CartRightSide';
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

  const [checkoutModalOpen, setCheckOutModalOpen] = React.useState(false);
  const [removeButtonLoading, setRemoveButtonLoading] = React.useState(null);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const modalRef = React.useRef();
  useClickAway(modalRef, () => {
    setCheckOutModalOpen(false);
  });
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
          <CartContainer
            isLoading={isLoading}
            handleRemoveItem={handleRemoveItem}
            data={data}
            removeButtonLoading={removeButtonLoading}
          />
          <CartRightSide
            data={data}
            isLoading={isLoading}
            setCheckOutModalOpen={setCheckOutModalOpen}
          />
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
