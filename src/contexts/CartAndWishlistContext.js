import React from 'react';
import { queryCache, useMutation, useQuery } from 'react-query';
import {
  addToCart,
  addToWishlist,
  getCartItems,
  getWishlistItems,
  removeFromCart,
  removeFromWishlist,
  getGuestCartItems,
  addToGuestCart,
  checkCoupon,
  editCart,
  removeFromGuestCart,
  editGuestCart,
} from '../Queries/Queries';
import { AuthProvider } from './AuthContext';
import { DataProvider } from './DataContext';
export const CartAndWishlistProvider = React.createContext();
export default function CartAndWishlistContext({ children }) {
  const { deliveryCountry } = React.useContext(DataProvider);
  const { userId, authenticationLoading } = React.useContext(AuthProvider);
  /**
   * Cart Main Fetch
   */
  const {
    data: cartData,
    isLoading: cartItemsLoading,
    isError: isGetCartError,
    error: getCartError,
    isIdle: cartIdle,
  } = useQuery(['cartItems', userId, deliveryCountry], getCartItems, {
    refetchOnWindowFocus: false,
    enabled: !authenticationLoading && userId,
    retry: true,
  });
  const {
    data: guestCartData,
    isLoading: guestCartItemsLoading,
    isError: isGuestGetCartError,
    error: getGuestCartError,
  } = useQuery(['guestCartItems', deliveryCountry], getGuestCartItems, {
    refetchOnWindowFocus: false,
    enabled: !authenticationLoading && !userId,
    retry: true,
  });

  const [addToCartMutation] = useMutation(addToCart, {
    onSuccess: data => {
      queryCache.setQueryData(
        ['cartItems', userId, deliveryCountry],
        () => data
      );
    },
    throwOnError: true,
  });
  const [addToGuestCartMutation] = useMutation(addToGuestCart, {
    onSuccess: data => {
      queryCache.setQueryData(['guestCartItems', deliveryCountry], () => data);
    },
    throwOnError: true,
  });
  const [removeFromCartMutation] = useMutation(removeFromCart, {
    onSuccess: data => {
      queryCache.setQueryData(
        ['cartItems', userId, deliveryCountry],
        () => data
      );
    },
    throwOnError: true,
  });
  const [removeFromGuestCartMutation] = useMutation(removeFromGuestCart, {
    onSuccess: data => {
      queryCache.setQueryData(['guestCartItems', deliveryCountry], () => data);
    },
  });
  const [editCartMutation] = useMutation(editCart, {
    onSuccess: () => {
      queryCache.invalidateQueries(['cartItems', userId, deliveryCountry]);
    },
    throwOnError: true,
  });
  const [editGuestCartMutation] = useMutation(editGuestCart, {
    onSuccess: data => {
      queryCache.setQueryData(['guestCartItems', deliveryCountry], () => data);
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
    enabled: userId,
    retry: true,
  });

  // const [combineCartsMutation] = useMutation(combineCarts, {
  //   throwOnError:true
  // })
  const [addToWishListMutation] = useMutation(addToWishlist, {
    onSuccess: data => {
      queryCache.setQueryData(['wishlistItems', userId], data);
      // queryCache.invalidateQueries(['wishlistItems', userId]);
    },
    throwOnError: true,
  });

  const [removeFromWishListMutation] = useMutation(removeFromWishlist, {
    onSuccess: data => {
      queryCache.setQueryData(['wishlistItems', userId], prev => {
        console.log(prev);
        const updated = prev.wishlistItems.filter(i => i.id !== data);
        return {
          wishlistItems: [...updated],
        };
      });
    },

    throwOnError: true,
  });
  const [checkCouponMutation, { isLoading: isCheckingCoupon }] = useMutation(
    checkCoupon,
    {
      throwOnError: true,
    }
  );
  return (
    <CartAndWishlistProvider.Provider
      value={{
        cartItems: cartData?.cartItems,
        cartTotal: cartData?.cartTotal,
        cartMessage: cartData?.message,
        cartSubtotal: cartData?.cartSubtotal,
        shippingCost: cartData?.shippingCost,
        couponCost: cartData?.couponCost,
        guestCartItems: guestCartData?.cartItems,
        guestCartTotal: guestCartData?.cartTotal,
        guestCartSubtotal: guestCartData?.cartSubtotal,
        guestShippingCost: guestCartData?.shippingCost,
        guestCouponCost: guestCartData?.coupon_cost,
        wishlistItems: wishListData?.wishlistItems,
        cartIdle,
        cartItemsLoading,
        guestCartItemsLoading,
        wishlistItemsLoading,
        isGuestGetCartError,
        getGuestCartError,
        isGetCartError,
        isGetWishlistError,
        getCartError,
        getWishlistError,
        addToCartMutation,
        removeFromCartMutation,
        addToWishListMutation,
        removeFromWishListMutation,
        addToGuestCartMutation,
        removeFromGuestCartMutation,
        editGuestCartMutation,
        checkCouponMutation,
        isCheckingCoupon,
        editCartMutation,
        sideCartItems: userId ? cartData?.cartItems : guestCartData?.cartItems,
        sideCartSubTotal: userId
          ? cartData?.cartSubtotal
          : guestCartData?.cartSubtotal,
      }}
    >
      {children}
    </CartAndWishlistProvider.Provider>
  );
}
