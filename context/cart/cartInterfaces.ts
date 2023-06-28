import { ICartProduct, IOrderSummary, IShippingAddress } from '@/interfaces';

export interface ICartContext extends IOrderSummary {
  cart: ICartProduct[];
  shippingAddress?: IShippingAddress;
  isLoaded: boolean;

  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  deleteProductInCart: (product: ICartProduct) => void;
  updateAddress: (address: IShippingAddress) => void;
}

export interface CartState extends IOrderSummary {
  cart: ICartProduct[];
  shippingAddress?: IShippingAddress;
  isLoaded: boolean;
}
