export interface UiState {
  isMenuOpen: boolean;
}

export interface ContextProps {
  isMenuOpen: boolean;

  toggleSideMenu: () => void;
}
