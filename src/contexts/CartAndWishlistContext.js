import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
  const queryClient = useQueryClient();

  const { deliveryCountry, deliveryCountriesLoading } = React.useContext(
    DataProvider
  );
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
  } = useQuery(
    ['cartItems', userId, deliveryCountry, coupon],
    () => getCartItems(userId, deliveryCountry, coupon),
    {
      enabled: Boolean(!authenticationLoading) && Boolean(userId),
      retry: true,
      keepPreviousData: true,
    }
  );
  const {
    data: guestCartData,
    isLoading: guestCartItemsLoading,
    isError: isGuestGetCartError,
    error: getGuestCartError,
    isFetching: guestCartItemsFetching,
    isIdle: guestCartItemsIdle,
  } = useQuery(
    ['guestCartItems', deliveryCountry, coupon],
    () => getGuestCartItems(deliveryCountry, coupon),
    {
      enabled:
        Boolean(!authenticationLoading) &&
        Boolean(!userId) &&
        Boolean(!deliveryCountriesLoading),
      retry: true,
      keepPreviousData: true,
    }
  );

  const { mutateAsync: addToCartMutation } = useMutation(addToCart, {
    onSuccess: data => {
      queryClient.setQueryData(
        ['cartItems', userId, deliveryCountry, coupon],
        () => data
      );
    },
    throwOnError: true,
  });
  const { mutateAsync: addToGuestCartMutation } = useMutation(addToGuestCart, {
    onSuccess: data => {
      queryClient.setQueryData(
        ['guestCartItems', deliveryCountry, coupon],
        () => data
      );
    },
    throwOnError: true,
  });
  const { mutateAsync: removeFromCartMutation } = useMutation(removeFromCart, {
    onSuccess: data => {
      queryClient.setQueryData(
        ['cartItems', userId, deliveryCountry, coupon],
        () => data
      );
    },
    throwOnError: true,
  });
  const { mutateAsync: removeFromGuestCartMutation } = useMutation(
    removeFromGuestCart,
    {
      onSuccess: data => {
        queryClient.setQueryData(
          ['guestCartItems', deliveryCountry, coupon],
          () => data
        );
      },
    }
  );
  const { mutateAsync: editCartMutation } = useMutation(editCart, {
    onSuccess: data => {
      queryClient.setQueryData(
        ['cartItems', userId, deliveryCountry, coupon],
        () => data
      );
    },
    throwOnError: true,
  });
  const { mutateAsync: editGuestCartMutation } = useMutation(editGuestCart, {
    onSuccess: data => {
      queryClient.setQueryData(
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
  } = useQuery(['wishlistItems', userId], () => getWishlistItems(userId), {
    refetchOnWindowFocus: false,
    enabled: Boolean(userId),
    retry: true,
  });

  const { mutateAsync: addToWishListMutation } = useMutation(addToWishlist, {
    onSuccess: data => {
      queryClient.setQueryData(['wishlistItems', userId], data);
    },
    throwOnError: true,
  });

  const { mutateAsync: removeFromWishListMutation } = useMutation(
    removeFromWishlist,
    {
      onSuccess: data => {
        queryClient.setQueryData(['wishlistItems', userId], prev => {
          const updated = prev.wishlistItems.filter(i => i.id !== data);
          return {
            wishlistItems: [...updated],
          };
        });
      },

      throwOnError: true,
    }
  );
  const {
    mutateAsync: checkCouponMutation,
    isLoading: isCheckingCoupon,
  } = useMutation(
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
        guestCartItemsIdle,
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
        note: cartData?.note,
      }}
    >
      {children}
    </CartAndWishlistProvider.Provider>
  );
}
