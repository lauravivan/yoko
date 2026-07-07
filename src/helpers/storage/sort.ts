import { SORT_OPTIONS } from '@/constants/sort';

const LS_KEY = 'yoko-sort';

export function getStoredSort() {
  const sort = localStorage.getItem(LS_KEY);
  return SORT_OPTIONS.find((so) => so === sort) || SORT_OPTIONS[0];
}

export function storeSort(sort: string) {
  localStorage.setItem(LS_KEY, sort);
}
