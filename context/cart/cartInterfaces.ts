import { ICartProduct } from '@/interfaces';

export interface ICartContext {
  cart: ICartProduct[];

  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
}

export interface CartState {
  cart: ICartProduct[];
}
