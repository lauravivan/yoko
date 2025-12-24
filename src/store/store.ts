import { AppType } from "@/types/app";
import { FilterType } from "@/types/filter";
import { SortType } from "@/types/sort";
import { ThemeType } from "@/types/theme";
import { ViewType } from "@/types/view";
import {
  DEFAULT_APP,
  DEFAULT_THEME,
  DEFAULT_VIEW,
  TOGGLE_APP,
  TOGGLE_THEME,
  TOGGLE_VIEW,
} from "@/util/constants";
import { getStoredApp, storeApp } from "@/util/storage/app";
import { getStoredFilter, storeFilter } from "@/util/storage/filter";
import { getStoredSort, storeSort } from "@/util/storage/sort";
import { getStoredTheme, storeTheme } from "@/util/storage/theme";
import { getStoredView, storeView } from "@/util/storage/view";
import { create } from "zustand";

interface StoreState {
  view: ViewType;
  toggleView: () => void;
  theme: ThemeType;
  toggleTheme: () => void;
  sort: SortType;
  selectSort: (sort: SortType) => void;
  filter: FilterType;
  selectFilter: (filter: FilterType) => void;
  app: AppType;
  toggleApp: () => void;
  eventId: string;
  setEventId: (eventId: string) => void;
}

const useStore = create<StoreState>((set) => ({
  view: getStoredView(),
  toggleView: () =>
    set((state) => {
      const newView = state.view === DEFAULT_VIEW ? TOGGLE_VIEW : DEFAULT_VIEW;
      storeView(newView);
      return { ...state, view: newView };
    }),
  theme: getStoredTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme =
        state.theme === DEFAULT_THEME ? TOGGLE_THEME : DEFAULT_THEME;

      storeTheme(newTheme);

      return { ...state, theme: newTheme };
    }),
  sort: getStoredSort(),
  selectSort: (sort: SortType) =>
    set((state) => {
      storeSort(sort);
      return { ...state, sort };
    }),
  filter: getStoredFilter(),
  selectFilter: (filter: FilterType) =>
    set((state) => {
      storeFilter(filter);
      return { ...state, filter };
    }),
  app: getStoredApp(),
  toggleApp: () =>
    set((state) => {
      const newApp = state.app === DEFAULT_APP ? TOGGLE_APP : DEFAULT_APP;
      storeApp(newApp);
      return { ...state, app: newApp };
    }),
  eventId: "",
  setEventId: (eventId: string) => set((state) => ({ ...state, eventId })),
}));

export default useStore;
