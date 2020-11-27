import React from 'react';
import { queryCache, useMutation, useQuery } from 'react-query';
import {
  addToCart,
  addToWishlist,
  getCartItems,
  getWishlistItems,
  removeFromCart,
  removeFromWishlist,
} from '../Queries/Queries';
import { AuthProvider } from './AuthContext';
export const CartAndWishlistProvider = React.createContext();
export default function CartAndWishlistContext({ children }) {
  const { userId, authenticationLoading, isAuthenticated } = React.useContext(
    AuthProvider
  );
  /**
   * Cart Main Fetch
   */
  const {
    data: cartData,
    isLoading: cartItemsLoading,
    isError: isGetCartError,
    error: getCartError,
  } = useQuery(['cartItems', userId], getCartItems, {
    refetchOnWindowFocus: false,
    enabled: !authenticationLoading && isAuthenticated,
  });

  const [addToCartMutation] = useMutation(addToCart, {
    onSuccess: data => {
      queryCache.setQueryData('cartItems', prev => {
        return {
          ...prev,
          cartItems: data.cartItems,
          cartTotal: data.cartTotal,
        };
      });
    },
    throwOnError: true,
  });
  const [removeFromCartMutation] = useMutation(removeFromCart, {
    onSuccess: data => {
      queryCache.setQueryData('cartItems', prev => {
        return {
          ...prev,
          cartItems: data.cartItems,
          cartTotal: data.cartTotal,
        };
      });
    },
    throwOnError: true,
  });
  /**
   * Wishlist Main Fetch
   */
  const {
    data: wishListData,
    isLoading: wishlistItemsLoading,
    isGetWishlistError,
    getWishlistError,
  } = useQuery(['wishlistItems', userId], getWishlistItems, {
    refetchOnWindowFocus: false,
  });
  const [addToWishListMutation] = useMutation(addToWishlist, {
    onSuccess: data => {
      queryCache.setQueryData('cartAndWishListLength', prev => {
        return {
          ...prev,
          wishlist: prev.wishlist + 1,
        };
      });
      queryCache.setQueryData('wishlistItems', prev => {
        return {
          ...prev,
          wishListItems: data.wishListItems,
        };
      });
      // queryCache.invalidateQueries('wishListItems');
    },
    throwOnError: true,
  });

  const [removeFromWishListMutation] = useMutation(removeFromWishlist, {
    onSuccess: data => {
      queryCache.setQueryData('wishlistItems', prev => {
        const updated = prev.filter(i => i.id !== data);
        return [...updated];
      });
    },

    throwOnError: true,
  });
  return (
    <CartAndWishlistProvider.Provider
      value={{
        cartItems: cartData?.cartItems,
        wishlistItems: wishListData?.wishlistItems,
        cartItemsLoading,
        wishlistItemsLoading,
        isGetCartError,
        isGetWishlistError,
        getCartError,
        getWishlistError,
        addToCartMutation,
        removeFromCartMutation,
        addToWishListMutation,
        removeFromWishListMutation,
      }}
    >
      {children}
    </CartAndWishlistProvider.Provider>
  );
}
