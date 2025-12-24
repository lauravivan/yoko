import { SortType } from "@/types/sort";
import { SORT_OPTIONS } from "../constants";

const LS_KEY = "yoko-sort";

export function getStoredSort(): SortType {
  const sort = localStorage.getItem(LS_KEY) as SortType;
  return sort || SORT_OPTIONS[0];
}

export function storeSort(sort: SortType) {
  localStorage.setItem(LS_KEY, sort);
}
