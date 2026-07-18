import { OccurrenceCategoryEnum, OccurrenceEnum } from '@/enum/OccurrenceEnum';

export interface IOccurrence {
  id: string;
  title: string;
  desc?: string;
  date: Date;
  state: OccurrenceEnum;
  category: OccurrenceCategoryEnum;
}
