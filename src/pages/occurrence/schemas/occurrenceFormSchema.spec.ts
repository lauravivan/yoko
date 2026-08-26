import { describe, expect, it } from 'vitest';
import { OccurrenceCategoryEnum } from '../enum/OccurrenceCategoryEnum';
import { OccurrenceEndsTypeEnum } from '../enum/OccurrenceEndsTypeEnum';
import { occurrenceFormSchema } from './occurrenceFormSchema';

const validForm = {
  title: 'Plan trip',
  desc: '',
  category: OccurrenceCategoryEnum.Personal,
  dateOfOccurrence: '2026-08-26',
  endDateOfOccurrence: '2026-08-27',
  allDay: true,
  startTime: '',
  endTime: '',
  weekRepetition: 0,
  monthRepetition: 0,
  yearRepetition: 0,
  weekRepetitionSpace: 0,
  monthRepetitionSpace: 0,
  yearRepetitionSpace: 0,
  endsType: OccurrenceEndsTypeEnum.Never,
  qntOccurrencesTillEnd: 0,
};

describe('occurrenceFormSchema', () => {
  it('accepts a valid occurrence form', () => {
    expect(occurrenceFormSchema.safeParse(validForm).success).toBe(true);
  });

  it('requires a title and date', () => {
    const result = occurrenceFormSchema.safeParse({
      ...validForm,
      title: ' ',
      dateOfOccurrence: '',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.path[0])).toEqual(
        expect.arrayContaining(['title', 'dateOfOccurrence'])
      );
    }
  });

  it('rejects titles longer than 50 characters', () => {
    const result = occurrenceFormSchema.safeParse({
      ...validForm,
      title: 'a'.repeat(51),
    });

    expect(result.success).toBe(false);
  });
});
