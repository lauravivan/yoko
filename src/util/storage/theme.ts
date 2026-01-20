import { DEFAULT_THEME } from '../constants';
import { type ThemeType } from '@/types/theme';

const LS_KEY = 'yoko-theme';

export function getStoredTheme(): ThemeType {
  const theme = localStorage.getItem(LS_KEY) as ThemeType;
  return theme || DEFAULT_THEME;
}

export function storeTheme(theme: ThemeType) {
  localStorage.setItem(LS_KEY, theme);
}
