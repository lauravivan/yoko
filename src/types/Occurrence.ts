import { type WeekDayEnum } from '@/enum/DayEnum';
import {
  type OccurrenceEndsTypeEnum,
  type OccurrenceCategoryEnum,
} from '@/enum/OccurrenceEnum';

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
  weekDayRepetition: WeekDayEnum[];
  weekRepetitionSpace: number | null;
  monthRepetitionSpace: number | null;
  yearRepetitionSpace: number | null;
  monthRepetition: number | null;
  weekRepetition: number | null;
  yearRepetition: number | null;
  endsType: OccurrenceEndsTypeEnum | null;
  endDateOfOccurrence: Date;
  qntOccurrencesTillEnd: number | null;
}
