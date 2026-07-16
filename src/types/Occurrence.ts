import { OccurrenceEnum } from '@/enum/OccurrenceEnum';

export interface IOccurrence {
  id: string;
  title: string;
  desc?: string;
  color: string;
  date: Date;
  state: OccurrenceEnum;
}
