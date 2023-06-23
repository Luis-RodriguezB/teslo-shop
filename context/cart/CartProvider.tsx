import { FC } from 'react';
import { CartContext, useCartProvider } from './';

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}

export const CartProvider: FC<Props> = ({ children }) => {
  const { state, ...methods } = useCartProvider();

  return (
    <>
      <CartContext.Provider
        value={{
          ...state,
          ...methods,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};
