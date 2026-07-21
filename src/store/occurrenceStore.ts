import { storeOccurrences } from '@/helpers/storage/occurrence';
import { create } from 'zustand';
import { v7 as uuidv7 } from 'uuid';
import { IOccurrence } from '@/types/Occurrence';
import { OccurrenceCategoryEnum } from '@/enum/OccurrenceEnum';

interface OccurrenceStoreState {
  occurrences: IOccurrence[];
  createOccurrence: (isEvent?: boolean) => void;
  updateOccurrenceTitle: (id: string, newTitle: string) => void;
  updateOccurrenceDesc: (id: string, newDesc: string) => void;
  updateOccurrenceStartDate: (id: string, newDate: Date) => void;
  updateOccurrenceCategory: (
    id: string,
    newCategory: OccurrenceCategoryEnum
  ) => void;
  deleteOccurrence: (id: string) => void;
  setOccurrences: (search: string, filter: string, sort: string) => void;
  saveOccurrences: (occurrences: IOccurrence[]) => void;
  getOccurrences: () => IOccurrence[];
  getEvents: () => IOccurrence[];
  getActions: () => IOccurrence[];
}

const useOccurrenceStore = create<OccurrenceStoreState>((set, get) => ({
  occurrences: [],
  createOccurrence: (isEvent: boolean = true) =>
    set((state) => {
      const occurrence: IOccurrence = {
        id: uuidv7(),
        title: 'Unamed',
        desc: '',
        isEvent,
        category: OccurrenceCategoryEnum.Personal,
        goalId: null,
        startDate: new Date(),
        endDate: new Date(),
      };

      const prevOccurrences = [...state.occurrences];

      prevOccurrences.unshift(occurrence);

      storeOccurrences(prevOccurrences);

      return {
        ...state,
        occurrences: prevOccurrences,
      };
    }),
  updateOccurrenceTitle: (id: string, newTitle: string) =>
    set((state) => {
      const prevOccurrences = [...state.occurrences];

      for (const e of prevOccurrences) {
        if (e.id === id) {
          e.title = newTitle;
        }
      }

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
  updateOccurrenceStartDate: (id: string, newDate: Date) =>
    set((state) => {
      const prevOccurrences = [...state.occurrences];

      for (const e of prevOccurrences) {
        if (e.id === id) {
          e.startDate = newDate;
        }
      }

      storeOccurrences(prevOccurrences);

      return {
        ...state,
        occurrences: prevOccurrences,
      };
    }),
  updateOccurrenceCategory: (id: string, newCategory: OccurrenceCategoryEnum) =>
    set((state) => {
      const prevOccurrences = [...state.occurrences];

      for (const e of prevOccurrences) {
        if (e.id === id) {
          e.category = newCategory;
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
  getOccurrences: () => get().occurrences,
  getEvents: () => get().occurrences.filter((occ) => occ.isEvent),
  getActions: () => get().occurrences.filter((occ) => !occ.isEvent),
}));

export default useOccurrenceStore;
