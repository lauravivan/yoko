import { IOccurrence } from '@/types/Occurrence';

const LS_KEY = 'yoko-occurrences';

export function getStoredOccurrences<T>() {
  const occurrences = localStorage.getItem(LS_KEY);
  return occurrences ? (JSON.parse(occurrences) as T) : ([] as T);
}

export function storeOccurrences(occurrences: IOccurrence[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(occurrences));
}
