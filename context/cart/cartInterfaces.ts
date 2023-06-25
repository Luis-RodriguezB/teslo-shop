import { ICartProduct, IOrderSummary } from '@/interfaces';

export interface ICartContext extends IOrderSummary {
  cart: ICartProduct[];
  isLoaded: boolean;

  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  deleteProductInCart: (product: ICartProduct) => void;
}

export interface CartState extends IOrderSummary {
  cart: ICartProduct[];
  isLoaded: boolean;
}
