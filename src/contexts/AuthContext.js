import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: authenticationLoading,

    isFetching: authenticationFetching,
  } = useQuery('authentication', checkAuth, {
    retry: 0,
  });
  /**
   * Edit user Info
   */
  const { mutateAsync: editMutation } = useMutation(editUserProfileInfo, {
    onSuccess: data => {
      queryClient.setQueryData('authentication', prev => {
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
  const { mutateAsync: changePasswordMutation } = useMutation(
    changeUserPassword,
    {
      throwOnError: true,
    }
  );

  /**
   * User Login
   */
  const { mutateAsync: userLoginMutation } = useMutation(
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
        queryClient.invalidateQueries('authentication');
      },
      throwOnError: true,
    }
  );

  /**
   * User Register
   */
  const { mutateAsync: userRegisterMutation } = useMutation(
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
        queryClient.invalidateQueries('authentication');
      },
      throwOnError: true,
    }
  );

  /**
   * User Logout
   */
  const { mutateAsync: userLogoutMutation } = useMutation(() => {
    queryClient.setQueryData('authentication', () => {
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
      enabled: Boolean(data?.userData?.id),
    }
  );
  const { mutateAsync: addAddressMutation } = useMutation(
    addUserAddress,

    {
      onSuccess: data => {
        queryClient.setQueryData('addresses', () => {
          return data;
        });
      },
      throwOnError: true,
    }
  );
  const { mutateAsync: deleteAddressMutation } = useMutation(
    removeUserAddress,
    {
      onSuccess: data => {
        queryClient.setQueryData('addresses', () => {
          return data;
        });
      },
      throwOnError: true,
    }
  );

  const { mutateAsync: addReviewMutation } = useMutation(addProductReview, {
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
