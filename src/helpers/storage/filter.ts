import { FILTER_OPTIONS } from '@/constants/filter';

const LS_KEY = 'yoko-filter';

export function getStoredFilter() {
  const filter = localStorage.getItem(LS_KEY);
  return FILTER_OPTIONS.find((fo) => fo === filter) || FILTER_OPTIONS[0];
}

export function storeFilter(filter: string) {
  localStorage.setItem(LS_KEY, filter);
}
