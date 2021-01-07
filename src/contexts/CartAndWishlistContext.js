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
  const [coupon, setCoupon] = React.useState('');
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
    isFetching: cartItemsFetching,
  } = useQuery(['cartItems', userId, deliveryCountry, coupon], getCartItems, {
    refetchOnWindowFocus: false,
    enabled: !authenticationLoading && userId,
    retry: true,
    keepPreviousData: true,
  });
  const {
    data: guestCartData,
    isLoading: guestCartItemsLoading,
    isError: isGuestGetCartError,
    error: getGuestCartError,
    isFetching: guestCartItemsFetching,
  } = useQuery(['guestCartItems', deliveryCountry, coupon], getGuestCartItems, {
    refetchOnWindowFocus: false,
    enabled: !authenticationLoading && !userId,
    retry: true,
    keepPreviousData: true,
  });

  const [addToCartMutation] = useMutation(addToCart, {
    onSuccess: data => {
      queryCache.setQueryData(
        ['cartItems', userId, deliveryCountry, coupon],
        () => data
      );
    },
    throwOnError: true,
  });
  const [addToGuestCartMutation] = useMutation(addToGuestCart, {
    onSuccess: data => {
      queryCache.setQueryData(
        ['guestCartItems', deliveryCountry, coupon],
        () => data
      );
    },
    throwOnError: true,
  });
  const [removeFromCartMutation] = useMutation(removeFromCart, {
    onSuccess: data => {
      queryCache.setQueryData(
        ['cartItems', userId, deliveryCountry, coupon],
        () => data
      );
    },
    throwOnError: true,
  });
  const [removeFromGuestCartMutation] = useMutation(removeFromGuestCart, {
    onSuccess: data => {
      queryCache.setQueryData(
        ['guestCartItems', deliveryCountry, coupon],
        () => data
      );
    },
  });
  const [editCartMutation] = useMutation(editCart, {
    onSuccess: data => {
      queryCache.setQueryData(
        ['cartItems', userId, deliveryCountry, coupon],
        () => data
      );
    },
    throwOnError: true,
  });
  const [editGuestCartMutation] = useMutation(editGuestCart, {
    onSuccess: data => {
      queryCache.setQueryData(
        ['guestCartItems', deliveryCountry, coupon],
        () => data
      );
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

  const [addToWishListMutation] = useMutation(addToWishlist, {
    onSuccess: data => {
      queryCache.setQueryData(['wishlistItems', userId], data);
    },
    throwOnError: true,
  });

  const [removeFromWishListMutation] = useMutation(removeFromWishlist, {
    onSuccess: data => {
      queryCache.setQueryData(['wishlistItems', userId], prev => {
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
      onSuccess: data => {
        setCoupon(data.code);
      },
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
        cartItemsFetching,
        guestCartItemsFetching,
        sideCartItems: userId ? cartData?.cartItems : guestCartData?.cartItems,
        sideCartSubTotal: userId
          ? cartData?.cartSubtotal
          : guestCartData?.cartSubtotal,
        sideCartCouponCost: userId
          ? cartData?.couponCost
          : guestCartData?.coupon_cost,
        coupon,
        setCoupon,
      }}
    >
      {children}
    </CartAndWishlistProvider.Provider>
  );
}
