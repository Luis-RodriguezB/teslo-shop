import { FC } from 'react';
import { UiContext } from './';
import { useUiProvider } from './useUiProvider';

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
}

export const UiProvider: FC<Props> = ({ children }) => {
  const { uiState, ...methods } = useUiProvider();

  return (
    <UiContext.Provider value={{ ...uiState, ...methods }}>
      {children}
    </UiContext.Provider>
  );
};
