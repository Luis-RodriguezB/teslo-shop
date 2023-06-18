import { UiState } from './';

type Action = { type: '[UI] ToggleMenu' };

export const uiReducer = (state: UiState, action: Action) => {
  console.log(action);
  switch (action.type) {
    case '[UI] ToggleMenu':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    default:
      return state;
  }
};
