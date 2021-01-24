import React from 'react';
import { queryCache, useMutation, useQuery } from 'react-query';
import {
  changeUserPassword,
  checkAuth,
  editUserProfileInfo,
  getUserAddresses,
  userLogin,
  userRegister,
  addUserAddress,
  removeUserAddress,
  addProductReview,
} from '../Queries/Queries';
export const AuthProvider = React.createContext();
export default function AuthContext({ children }) {
  const {
    data,
    isLoading: authenticationLoading,

    isFetching: authenticationFetching,
  } = useQuery('authentication', checkAuth, {
    retry: 0,
    refetchOnWindowFocus: false,
  });
  /**
   * Edit user Info
   */
  const [editMutation] = useMutation(editUserProfileInfo, {
    onSuccess: data => {
      queryCache.setQueryData('authentication', prev => {
        return {
          ...prev,
          userData: data.userData,
        };
      });
    },
    throwOnError: true,
  });

  /**
   * Change Password
   */
  const [changePasswordMutation] = useMutation(changeUserPassword, {
    throwOnError: true,
  });

  /**
   * User Login
   */
  const [userLoginMutation] = useMutation(
    async data => {
      const res = await userLogin({
        mobile: data.phoneNumber,
        password: data.password,
      });
      if (res.status === true) {
        localStorage.setItem('mrgAuthToken', res.data.access_token);
      }
    },
    {
      onSuccess: () => {
        queryCache.invalidateQueries('authentication');
      },
      throwOnError: true,
    }
  );

  /**
   * User Register
   */
  const [userRegisterMutation] = useMutation(
    async data => {
      const res = await userRegister({
        email: data.email,
        password: data.password,
        mobile: data.phoneNumber,
        name: data.fullName,
      });

      if (res.status === true) {
        localStorage.setItem('mrgAuthToken', res.data.access_token);
      }
    },
    {
      onSuccess: () => {
        queryCache.invalidateQueries('authentication');
      },
      throwOnError: true,
    }
  );

  /**
   * User Logout
   */
  const [userLogoutMutation] = useMutation(() => {
    queryCache.setQueryData('authentication', () => {
      return { userData: { userId: null } };
    });
    localStorage.removeItem('mrgAuthToken');
  });

  /**
   * User Addresses
   */

  const { isLoading: userAddressesLoading, data: userAddresses } = useQuery(
    'addresses',
    getUserAddresses,
    {
      refetchOnWindowFocus: false,
      retry: true,
      enabled: data?.userData?.id,
    }
  );
  const [addAddressMutation] = useMutation(
    addUserAddress,

    {
      onSuccess: data => {
        queryCache.setQueryData('addresses', () => {
          return data;
        });
      },
      throwOnError: true,
    }
  );
  const [deleteAddressMutation] = useMutation(removeUserAddress, {
    onSuccess: data => {
      queryCache.setQueryData('addresses', () => {
        return data;
      });
    },
    throwOnError: true,
  });

  const [addReviewMutation] = useMutation(addProductReview, {
    throwOnError: true,
  });

  return (
    <AuthProvider.Provider
      value={{
        authenticationFetching,
        authenticationLoading,
        userRegisterMutation,
        userLoginMutation,
        userLogoutMutation,
        userData: data?.userData,
        userId: data?.userData?.id,
        userAddresses,
        userAddressesLoading,
        addAddressMutation,
        deleteAddressMutation,
        editMutation,
        changePasswordMutation,
        addReviewMutation,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
}
