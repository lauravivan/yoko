import { storeOccurrences } from '@/helpers/storage/occurrence';
import { create } from 'zustand';
import { v7 as uuidv7 } from 'uuid';
import { type IOccurrence } from '@/types/Occurrence';
import { OccurrenceCategoryEnum } from '@/enum/OccurrenceEnum';
import { getDateWeekDay } from '@/helpers/formatters/date';

interface OccurrenceStoreState {
  occurrences: IOccurrence[];
  createOccurrence: (isEvent?: boolean) => void;
  updateOccurrenceTitle: (id: string, newTitle: string) => void;
  updateOccurrence: (occurrence: IOccurrence) => void;
  deleteOccurrence: (id: string) => void;
  setOccurrences: (occurrences: IOccurrence[]) => void;
  getOccurrences: () => IOccurrence[];
  getEvents: () => IOccurrence[];
  getActions: () => IOccurrence[];
}

const useOccurrenceStore = create<OccurrenceStoreState>((set, get) => ({
  occurrences: [],
  createOccurrence: (isEvent = true) =>
    set((state) => {
      const occurrenceDate = new Date();

      const occurrence: IOccurrence = {
        id: uuidv7(),
        title: 'Unamed',
        desc: '',
        isEvent,
        category: OccurrenceCategoryEnum.Personal,
        goalId: null,
        dateOfOccurrence: occurrenceDate,
        startTime: null,
        endTime: null,
        allDay: true,
        yearRepetition: null,
        endDateOfOccurrence: occurrenceDate,
        endsType: null,
        monthRepetition: null,
        qntOccurrencesTillEnd: null,
        weekRepetitionSpace: null,
        monthRepetitionSpace: null,
        yearRepetitionSpace: null,
        weekDayRepetition: [getDateWeekDay(occurrenceDate)],
        weekRepetition: null,
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
  updateOccurrence: (occ: IOccurrence) =>
    set((state) => {
      const prevOccurrences = [...state.occurrences];

      for (const e of prevOccurrences) {
        if (e.id === occ.id) {
          e.allDay = occ.allDay;
          e.category = occ.category;
          e.dateOfOccurrence = occ.dateOfOccurrence;
          e.desc = occ.desc;
          e.monthRepetition = occ.monthRepetition;
          e.weekRepetition = occ.weekRepetition;
          e.yearRepetition = occ.yearRepetition;
          e.monthRepetitionSpace = occ.monthRepetitionSpace;
          e.yearRepetitionSpace = occ.yearRepetitionSpace;
          e.weekRepetitionSpace = occ.weekRepetitionSpace;
          e.weekDayRepetition = occ.weekDayRepetition;
          e.startTime = occ.startTime;
          e.endTime = occ.endTime;
          e.endsType = occ.endsType;
          e.endDateOfOccurrence = occ.endDateOfOccurrence;
          e.qntOccurrencesTillEnd = occ.qntOccurrencesTillEnd;
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
  setOccurrences: (occurrences: IOccurrence[]) =>
    set(() => ({
      occurrences,
    })),
  getOccurrences: () => get().occurrences,
  getEvents: () => get().occurrences.filter((occ) => occ.isEvent),
  getActions: () => get().occurrences.filter((occ) => !occ.isEvent),
}));

export default useOccurrenceStore;
