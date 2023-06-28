import { ICartProduct, IOrderSummary, IShippingAddress } from '@/interfaces';
import { CartState } from './';

type Action =
  | {
      type: '[Cart] - LoadCart From Cookies | Storage';
      payload: ICartProduct[];
    }
  | { type: '[Cart] - Update Products In Cart'; payload: ICartProduct[] }
  | { type: '[Cart] - Change Cart Quantity'; payload: ICartProduct }
  | { type: '[Cart] - Delete Product In Cart'; payload: ICartProduct }
  | { type: '[Cart] - Update Order Summary'; payload: IOrderSummary }
  | { type: '[Cart] - LoadAddress From Cookies'; payload: IShippingAddress }
  | { type: '[Cart] - Update Address'; payload: IShippingAddress };

export const cartReducer = (
  state: CartState,
  { type, payload }: Action
): CartState => {
  switch (type) {
    case '[Cart] - LoadCart From Cookies | Storage':
      return {
        ...state,
        isLoaded: true,
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
    case '[Cart] - Delete Product In Cart':
      return {
        ...state,
        cart: state.cart.filter(
          (p) => !(p._id === payload._id && p.size === payload.size)
        ),
      };
    case '[Cart] - Update Order Summary':
      return {
        ...state,
        ...payload,
      };
    case '[Cart] - LoadAddress From Cookies':
    case '[Cart] - Update Address':
      return {
        ...state,
        shippingAddress: {...payload},
      };
    default:
      return state;
  }
};
