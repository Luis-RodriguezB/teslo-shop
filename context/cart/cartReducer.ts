import { ICartProduct } from '@/interfaces';
import { CartState } from './';

type Action =
  | { type: '[Cart] - LoadCart From Cookies | Storage'; payload: ICartProduct[]; }
  | { type: '[Cart] - Updtate products in cart'; payload: ICartProduct[] };

export const cartReducer = (state: CartState, { type, payload }: Action) => {
  switch (type) {
    case '[Cart] - LoadCart From Cookies | Storage':
      return {
        ...state,
        cart: [...payload]
      };
    case '[Cart] - Updtate products in cart':
      return {
        ...state,
        cart: [...payload],
      };
    default:
      return state;
  }
};
