import React from 'react';
import { queryCache, useMutation, useQuery } from 'react-query';
import { checkAuth, userLogin, userRegister } from '../Queries/Queries';
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

  const { data: isAuthenticated, isLoading: authenticationLoading } = useQuery(
    'authentication',
    async () => {
      const mrgAuthToken = localStorage.getItem('mrgAuthToken');
      const { isAuthenticated } = await checkAuth(mrgAuthToken);
      return isAuthenticated;
    },
    { retry: 0 }
  );

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
        return res.status;
      }
    },
    {
      onSuccess: () => {
        queryCache.setQueryData('authentication', () => {
          return true;
        });
      },
      throwOnError: true,
    }
  );

  /**
   * User Register
   */
  const [userRegisterMutation] = useMutation(
    async data => {
      console.log(data);
      const res = await userRegister({
        email: data.email,
        password: data.password,
        mobile: data.phoneNumber,
        name: data.fullName,
      });

      if (res.status === true) {
        localStorage.setItem('mrgAuthToken', res.data.access_token);
        return res.status;
      }
    },
    {
      onSuccess: () => {
        queryCache.setQueryData('authentication', () => {
          return true;
        });
      },
      throwOnError: true,
    }
  );

  /**
   * User Logout
   */
  const [userLogout] = useMutation(() => {
    queryCache.setQueryData('authentication', () => {
      return false;
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
        isAuthenticated,
        authenticationLoading,
        userRegisterMutation,
        userLoginMutation,
        userLogout,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
}
