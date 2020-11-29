import React from 'react';
import { queryCache, useMutation, useQuery } from 'react-query';
import {
  checkAuth,
  editUserProfileInfo,
  userLogin,
  userRegister,
} from '../Queries/Queries';
export const AuthProvider = React.createContext();
export default function AuthContext({ children }) {
  /**
   * Authentication
   */
  // const checkAuthenticationStatus = () => {
  //   const localAuthenticated = localStorage.getItem('localAuthenticated');
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       if (localAuthenticated === 'true') {
  //         resolve({ isAuthenticated: true });
  //       } else {
  //         resolve({ isAuthenticated: false });
  //       }
  //     }, 2000);
  //   });
  // };

  const {
    data,
    isLoading: authenticationLoading,
    isError,
    isFetching: authenticationFetching,
  } = useQuery('authentication', checkAuth, {
    retry: 0,
    refetchOnWindowFocus: false,
    // onSuccess: data => {
    //   queryCache.setQueryData('userProfile', prev => {
    //     return {
    //       ...prev,
    //       ...data.userData,
    //     };
    //   });
    // },
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
        return { isAuthenticated: true };
      }
    },
    {
      onSuccess: () => {
        queryCache.setQueryData('authentication', prev => {
          return {
            ...prev,
            isAuthenticated: true,
          };
        });
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
        return { isAuthenticated: true };
      }
    },
    {
      onSuccess: () => {
        queryCache.setQueryData('authentication', prev => {
          return {
            ...prev,
            isAuthenticated: true,
          };
        });
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
      return { isAuthenticated: false, userData: { userId: null } };
    });
    localStorage.removeItem('mrgAuthToken');
  });

  /**
   *
   */

  // const handleUserRegister = data => {
  //   return new Promise(resolve => {
  //     localStorage.setItem('localAuthenticated', true);
  //     setTimeout(() => {
  //       resolve({
  //         message: 'ok',
  //       });
  //     }, 1500);
  //   });
  // };
  // const handleUserLogin = data => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       localStorage.setItem('localAuthenticated', true);
  //       resolve({
  //         message: 'ok',
  //       });
  //     }, 1500);
  //   });
  // };
  return (
    <AuthProvider.Provider
      value={{
        isAuthenticated: isError ? false : data?.isAuthenticated,
        authenticationFetching,
        authenticationLoading,
        userRegisterMutation,
        userLoginMutation,
        userLogoutMutation,
        userData: data?.userData,
        userId: data?.userData?.id,
        editMutation,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
}
