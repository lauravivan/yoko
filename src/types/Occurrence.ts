import { type OccurrenceCategoryEnum } from '@/enum/OccurrenceEnum';

export interface IOccurrence {
  id: string;
  title: string;
  desc: string | null;
  isEvent: boolean;
  allDay: boolean;
  category: OccurrenceCategoryEnum;
  goalId: string | null;
  dateOfOccurrence: Date;
  startTime: string | null;
  endTime: string | null;
}
