import { ICartProduct } from '@/interfaces';
import { CartState } from './';

type Action =
  | { type: '[Cart] - LoadCart From Cookies | Storage'; payload: ICartProduct[]; }
  | { type: '[Cart] - Update Products In Cart'; payload: ICartProduct[] }
  | { type: '[Cart] - Change Cart Quantity'; payload: ICartProduct };

export const cartReducer = (state: CartState, { type, payload }: Action) => {
  switch (type) {
    case '[Cart] - LoadCart From Cookies | Storage':
      return {
        ...state,
        cart: [...payload],
      };
    case '[Cart] - Update Products In Cart':
      return {
        ...state,
        cart: [...payload],
      };
    case '[Cart] - Change Cart Quantity':
      return {
        ...state,
        cart: state.cart.map((p) => {
          if (p._id !== payload._id) return p;
          if (p.size !== payload.size) return p;

          return payload;
        }),
      };
    default:
      return state;
  }
};
