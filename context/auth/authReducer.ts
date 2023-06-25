import { AuthState } from './';
import { UserResponse } from '@/interfaces';

type AuthAction =
  | { type: '[Auth] - Login'; payload: UserResponse }
  | { type: '[Auth] - Register' }
  | { type: '[Auth] - Logout' };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case '[Auth] - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case '[Auth] - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };

    default:
      return state;
  }
};
