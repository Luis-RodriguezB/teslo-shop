import { ICartProduct } from '@/interfaces';

export interface ICartContext {
  cart: ICartProduct[];

  addProductToCart: (product: ICartProduct) => void;
}

export interface CartState {
  cart: ICartProduct[];
}
