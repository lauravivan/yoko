import { type FilterType } from '@/types/filter';
import { FILTER_OPTIONS } from '../constants';

const LS_KEY = 'yoko-filter';

export function getStoredFilter(): FilterType {
  const filter = localStorage.getItem(LS_KEY) as FilterType;
  return filter || FILTER_OPTIONS[0];
}

export function storeFilter(filter: FilterType) {
  localStorage.setItem(LS_KEY, filter);
}
