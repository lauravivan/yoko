import { OccurrenceCategoryEnum } from '@/enum/OccurrenceEnum';

export interface IOccurrence {
  id: string;
  title: string;
  desc: string | null;
  isEvent: boolean;
  category: OccurrenceCategoryEnum;
  goalId: string | null;
  startDate: Date;
  endDate: Date;
}
