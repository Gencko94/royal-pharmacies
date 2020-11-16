import React from 'react';
import { Helmet } from 'react-helmet';
import { queryCache, useMutation, useQuery } from 'react-query';
import Layout from '../components/Layout';
import WishlistContainer from '../components/Wishlist/WishlistContainer';
import WishlistRightSide from '../components/Wishlist/WishlistRightSide';
import { DataProvider } from '../contexts/DataContext';

export default function Wishlist() {
  const [removeButtonLoading, setRemoveButtonLoading] = React.useState(null);
  const {
    getWishListItems,

    removeItemFromWishList,
  } = React.useContext(DataProvider);

  /**
   * Main Fetch
   */
  const { data, isLoading, refetch } = useQuery(
    'wishListItems',
    async () => {
      const res = await getWishListItems();
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
   * Remove Mutation
   */
  const [removeMutation] = useMutation(
    async id => {
      setRemoveButtonLoading(id);
      const res = await removeItemFromWishList(id);
      return res;
    },
    {
      onSuccess: data => {
        console.log(data);
        queryCache.setQueryData('wishListItems', prev => {
          return {
            ...prev,
            wishListItems: data.wishListItems,
          };
        });
        queryCache.setQueryData('cartAndWishListLength', prev => {
          return {
            ...prev,
            wishlist: data.wishListItems.length,
          };
        });
        setRemoveButtonLoading(null);
        refetch();
      },
      onError: error => {
        // setErrorOpen(true);
        // setErrorMessage(error);
      },
    }
  );
  const handleRemoveItem = async id => {
    try {
      await removeMutation(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Wishlist | MRG</title>
      </Helmet>
      <div className="px-4 py-2 max-w-default mx-auto">
        <div className="wishlist-main-grid">
          <WishlistContainer
            isLoading={isLoading}
            data={data}
            handleRemoveItem={handleRemoveItem}
            removeButtonLoading={removeButtonLoading}
          />
          <WishlistRightSide data={data} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
}
