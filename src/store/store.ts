import { DEFAULT_THEME, TOGGLE_THEME } from '@/constants/toggle';
import { getStoredFilter, storeFilter } from '@/helpers/storage/filter';
import { getStoredSort, storeSort } from '@/helpers/storage/sort';
import { getStoredTheme, storeTheme } from '@/helpers/storage/theme';
import { create } from 'zustand';

interface StoreState {
  theme: string;
  toggleTheme: () => void;
  sort: string;
  selectSort: (sort: string) => void;
  filter: string;
  selectFilter: (filter: string) => void;
}

const useStore = create<StoreState>((set) => ({
  theme: getStoredTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme =
        state.theme === DEFAULT_THEME ? TOGGLE_THEME : DEFAULT_THEME;

      storeTheme(newTheme);

      return { ...state, theme: newTheme };
    }),
  sort: getStoredSort(),
  selectSort: (sort: string) =>
    set((state) => {
      storeSort(sort);
      return { ...state, sort };
    }),
  filter: getStoredFilter(),
  selectFilter: (filter: string) =>
    set((state) => {
      storeFilter(filter);
      return { ...state, filter };
    }),
}));

export default useStore;
