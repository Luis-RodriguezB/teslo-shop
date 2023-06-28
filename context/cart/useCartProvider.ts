import { useEffect, useReducer, useRef } from 'react';
import Cookies from 'js-cookie';
import { CartState, cartReducer } from './';
import { ICartProduct, IShippingAddress } from '@/interfaces';

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  isLoaded: false,
  shippingAddress: undefined,
};

export const useCartProvider = () => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const firstTimeLoad = useRef(true);

  useEffect(() => {
    loadCookies();
  }, []);

  useEffect(() => {
    if (firstTimeLoad.current) return;

    Cookies.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    if (firstTimeLoad.current) return;

    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({ type: '[Cart] - Update Order Summary', payload: orderSummary });
  }, [state.cart]);

  useEffect(() => {
    loadShippingAddress();
  }, []);

  const loadCookies = async () => {
    try {
      const cookieProducts = Cookies.get('cart')
        ? JSON.parse(Cookies.get('cart')!)
        : [];
      await dispatch({
        type: '[Cart] - LoadCart From Cookies | Storage',
        payload: cookieProducts,
      });
    } catch (error) {
      await dispatch({
        type: '[Cart] - LoadCart From Cookies | Storage',
        payload: [],
      });
    } finally {
      firstTimeLoad.current = false;
    }
  };

  const loadShippingAddress = () => {
    if (Cookies.get('name')) {
      const shippingAddress: IShippingAddress = {
        name: Cookies.get('name') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zipcode: Cookies.get('zipcode') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
      };

      dispatch({
        type: '[Cart] - LoadAddress From Cookies',
        payload: shippingAddress,
      });
    }
  };

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.find(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCart) {
      return dispatch({
        type: '[Cart] - Update Products In Cart',
        payload: [...state.cart, product],
      });
    }

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id || p.size !== product.size) return p;

      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: '[Cart] - Update Products In Cart',
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({
      type: '[Cart] - Change Cart Quantity',
      payload: product,
    });
  };

  const deleteProductInCart = (product: ICartProduct) => {
    dispatch({
      type: '[Cart] - Delete Product In Cart',
      payload: product,
    });
  };

  const updateAddress = (address: IShippingAddress) => {
    for (const key in address) {
      Cookies.set(key, (address as any)[key] || '');
    }

    dispatch({
      type: '[Cart] - Update Address',
      payload: address,
    });
  };

  return {
    state,

    //methods
    addProductToCart,
    updateCartQuantity,
    deleteProductInCart,
    updateAddress
  };
};
