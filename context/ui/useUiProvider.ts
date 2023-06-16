import { useReducer } from 'react';
import { UiState, uiReducer } from './';

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
};

export const useUiProvider = () => {
  const [uiState, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({
      type: '[UI] ToggleMenu',
    });
  };

  return {
    uiState,

    //Methods
    toggleSideMenu,
  };
};
