import { ISize } from './';

export interface ICartProduct {
  _id: string;
  description: string;
  image: string;
  price: number;
  size?: ISize;
  slug: string;
  title: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  quantity: number;
}

export interface IOrderSummary {
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

export interface IShippingAddress {
  name: string;
  lastName: string;
  address: string;
  address2: string;
  zipcode: string;
  city: string;
  country: string;
  phone: string;
}
