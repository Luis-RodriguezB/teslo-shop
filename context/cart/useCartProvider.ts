import { useEffect, useReducer, useRef } from 'react';
import Cookie from 'js-cookie';
import { CartState, cartReducer } from './';
import { ICartProduct } from '@/interfaces';

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const useCartProvider = () => {
  const [cartState, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const firstTimeLoad = useRef(true);

  useEffect(() => {
    loadCookies();
  }, []);

  useEffect(() => {
    if (firstTimeLoad.current) return;

    Cookie.set('cart', JSON.stringify(cartState.cart));
  }, [cartState.cart]);

  const loadCookies = async () => {
    try {
      const cookieProducts = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!)
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

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = cartState.cart.find(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCart) {
      return dispatch({
        type: '[Cart] - Update Products In Cart',
        payload: [...cartState.cart, product],
      });
    }

    const updatedProducts = cartState.cart.map((p) => {
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

  return {
    cartState,

    //methods
    addProductToCart,
    updateCartQuantity,
  };
};
