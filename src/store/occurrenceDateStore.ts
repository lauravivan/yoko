import { storeOccurrenceDates } from '@/helpers/storage/occurrence';
import { create } from 'zustand';
import { v7 as uuidv7 } from 'uuid';
import { type IOccurrenceDate } from '@/types/Occurrence';
import { OccurrenceDateStatusEnum } from '@/enum/OccurrenceEnum';

interface OccurrenceDateStoreState {
  occurrenceDates: IOccurrenceDate[];
  createOccurrenceDate: (
    occurrenceId: string,
    date: Date,
    status: OccurrenceDateStatusEnum
  ) => void;
  getOccurrenceDates: (occurrenceId: string) => IOccurrenceDate[];
  getCompletedOccurrenceDates: (occurrenceId: string) => IOccurrenceDate[];
}

const useOccurrenceDateStore = create<OccurrenceDateStoreState>((set, get) => ({
  occurrenceDates: [],
  createOccurrenceDate: (
    occurrenceId: string,
    date: Date,
    status: OccurrenceDateStatusEnum
  ) =>
    set((state) => {
      const occurrenceDate: IOccurrenceDate = {
        id: uuidv7(),
        dateOfOccurrence: date,
        occurrenceId,
        status,
      };

      const prevOccurrenceDates = [...state.occurrenceDates];

      prevOccurrenceDates.unshift(occurrenceDate);

      storeOccurrenceDates(prevOccurrenceDates);

      return {
        ...state,
        occurrences: prevOccurrenceDates,
      };
    }),
  getOccurrenceDates: (occurrenceId: string) =>
    get().occurrenceDates.filter((occ) => occ.occurrenceId === occurrenceId),
  getCompletedOccurrenceDates: (occurrenceId: string) =>
    get().occurrenceDates.filter(
      (occ) =>
        occ.occurrenceId === occurrenceId &&
        occ.status === OccurrenceDateStatusEnum.COMPLETED
    ),
}));

export default useOccurrenceDateStore;
