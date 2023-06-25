import { FC } from 'react';
import { AuthContext, useAuthProvider } from './';

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const { state, ...methods } = useAuthProvider();

  return (
    <AuthContext.Provider value={{ ...state, ...methods }}>
      {children}
    </AuthContext.Provider>
  );
};
