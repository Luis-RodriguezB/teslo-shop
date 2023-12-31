import { useEffect, useReducer } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';

import { AuthState, authReducer } from './';
import { tesloApi } from '@/api';

import { AuthResponse, IUser } from '@/interfaces';

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const useAuthProvider = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch({ type: '[Auth] - Login', payload: data.user as IUser })
    }
  }, [status, data]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const checkToken = async () => {
    if (!Cookies.get('token')) return;

    try {
      const { data } = await tesloApi.get<AuthResponse>('/user/validate-token');
      const { token, user } = data;
      dispatch({ type: '[Auth] - Login', payload: user });

      Cookies.set('token', token);
    } catch (error) {
      Cookies.remove('token');
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post<AuthResponse>('/user/login', {
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });

      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post<AuthResponse>('/user/register', {
        email,
        password,
        name,
      });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message:
          'Algo salió mal, no se pudo crear el usuario, intente de nuevo',
      };
    }
  };

  const logout = () => {
    Cookies.remove('cart');

    Cookies.remove('name');
    Cookies.remove('lastName');
    Cookies.remove('address');
    Cookies.remove('address2');
    Cookies.remove('zipcode');
    Cookies.remove('city');
    Cookies.remove('country');
    Cookies.remove('phone');

    signOut();
    // Cookies.remove('token');
    // router.reload();
  };

  return {
    state,

    loginUser,
    registerUser,
    logout,
  };
};
