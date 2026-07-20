import { OccurrenceCategoryEnum } from '@/enum/OccurrenceEnum';

export interface IOccurrence {
  id: string;
  title: string;
  desc?: string;
  isEvent: boolean;
  category: OccurrenceCategoryEnum;
}
