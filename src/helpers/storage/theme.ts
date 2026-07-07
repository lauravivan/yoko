import { DEFAULT_THEME } from '@/constants/toggle';

const LS_KEY = 'yoko-theme';

export function getStoredTheme() {
  const theme = localStorage.getItem(LS_KEY);
  return theme || DEFAULT_THEME;
}

export function storeTheme(theme: string) {
  localStorage.setItem(LS_KEY, theme);
}
