import { FC } from 'react';
import { CartContext, useCartProvider } from './';

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}

export const CartProvider: FC<Props> = ({ children }) => {
  const { cartState, ...methods } = useCartProvider();

  return (
    <>
      <CartContext.Provider
        value={{
          ...cartState,
          ...methods,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};
