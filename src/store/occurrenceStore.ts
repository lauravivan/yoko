import { storeOccurrences } from '@/helpers/storage/occurrence';
import { create } from 'zustand';
import { v7 as uuidv7 } from 'uuid';
import { generateRandomString } from '@/helpers/generators/random';
import { getCardColors } from '@/helpers/transformers/getCardColors';
import { IOccurrence } from '@/types/Occurrence';
import { OccurrenceEnum } from '@/enum/OccurrenceEnum';

interface OccurrenceStoreState {
  occurrences: IOccurrence[];
  createOccurrence: (state: OccurrenceEnum) => void;
  updateOccurrenceDesc: (id: string, newDesc: string) => void;
  updateOccurrenceColor: (id: string, newColor: string) => void;
  updateOccurrenceDate: (id: string, newDate: Date) => void;
  deleteOccurrence: (id: string) => void;
  setOccurrences: (search: string, filter: string, sort: string) => void;
  saveOccurrences: (occurrences: IOccurrence[]) => void;
  getOccurrences: (isEvents: boolean) => IOccurrence[];
}

const useOccurrenceStore = create<OccurrenceStoreState>((set, get) => ({
  occurrences: [],
  createOccurrence: (occurrenceState: OccurrenceEnum) =>
    set((state) => {
      const occurrence: IOccurrence = {
        id: uuidv7(),
        title: 'Unamed',
        desc: '',
        color: generateRandomString('', getCardColors()),
        date: new Date(),
        state: occurrenceState,
      };

      const prevOccurrences = [...state.occurrences];

      prevOccurrences.unshift(occurrence);

      storeOccurrences(prevOccurrences);

      return {
        ...state,
        occurrences: prevOccurrences,
      };
    }),
  updateOccurrenceDesc: (id: string, newDesc: string) =>
    set((state) => {
      const prevOccurrences = [...state.occurrences];

      for (const e of prevOccurrences) {
        if (e.id === id) {
          e.desc = newDesc;
        }
      }

      storeOccurrences(prevOccurrences);

      return {
        ...state,
        occurrences: prevOccurrences,
      };
    }),
  updateOccurrenceColor: (id: string, newColor: string) =>
    set((state) => {
      const prevOccurrences = [...state.occurrences];

      for (const e of prevOccurrences) {
        if (e.id === id) {
          e.color = newColor;
        }
      }

      storeOccurrences(prevOccurrences);

      return {
        ...state,
        occurrences: prevOccurrences,
      };
    }),
  updateOccurrenceDate: (id: string, newDate: Date) =>
    set((state) => {
      const prevOccurrences = [...state.occurrences];

      for (const e of prevOccurrences) {
        if (e.id === id) {
          e.date = newDate;
        }
      }

      storeOccurrences(prevOccurrences);

      return {
        ...state,
        occurrences: prevOccurrences,
      };
    }),
  deleteOccurrence: (id: string) =>
    set((state) => {
      const prevOccurrences = [...state.occurrences];
      const newOccurrences = prevOccurrences.filter((e) => e.id !== id);
      storeOccurrences(newOccurrences);
      return {
        ...state,
        occurrences: newOccurrences,
      };
    }),
  setOccurrences: (search: string, filter: string, sort: string) =>
    set((state) => {
      const occ = [...state.occurrences];
      return search
        ? {
            ...state,
            occurrences: occ,
          }
        : state;
    }),
  saveOccurrences: (occurrences: IOccurrence[]) =>
    set(() => ({
      occurrences,
    })),
  getOccurrences: (isEvents: boolean) => {
    if (isEvents)
      return get().occurrences.filter(
        (occ) => occ.state === OccurrenceEnum.WAITING
      );
    return get().occurrences.filter(
      (occ) => occ.state !== OccurrenceEnum.WAITING
    );
  },
}));

export default useOccurrenceStore;
