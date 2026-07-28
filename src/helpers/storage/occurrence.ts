import { type IOccurrence } from '@/types/Occurrence';

const LS_KEY = 'yoko-occurrences';

export function getStoredOccurrences(): IOccurrence[] {
  const occurrences = localStorage.getItem(LS_KEY);
  return occurrences ? (JSON.parse(occurrences) as IOccurrence[]) : [];
}

export function storeOccurrences(occurrences: IOccurrence[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(occurrences));
}
