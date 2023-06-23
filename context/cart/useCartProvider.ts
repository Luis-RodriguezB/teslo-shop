import { useEffect, useReducer, useRef } from 'react';
import Cookie from 'js-cookie';
import { CartState, cartReducer } from './';
import { ICartProduct } from '@/interfaces';

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
};

export const useCartProvider = () => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const firstTimeLoad = useRef(true);

  useEffect(() => {
    loadCookies();
  }, []);

  useEffect(() => {
    if (firstTimeLoad.current) return;

    Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    if(firstTimeLoad.current) return;

    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
    const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1)
    }

    dispatch({type: '[Cart] - Update Order Summary', payload: orderSummary});
  }, [state.cart]);

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

  return {
    state,

    //methods
    addProductToCart,
    updateCartQuantity,
    deleteProductInCart,
  };
};
