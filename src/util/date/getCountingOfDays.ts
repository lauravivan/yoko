import { differenceInCalendarDays } from 'date-fns';
import { createUTCDateNow } from './createUTCDate';

export function getCountingOfDays(dateToEvent: Date): string {
  const difference = differenceInCalendarDays(dateToEvent, createUTCDateNow());

  const happened = difference < 0 && 'Already happened';
  const today = difference === 0 && "It's today!!";
  const oneDay = difference === 1 && `In ${difference} day`;

  return happened || today || oneDay || `In ${difference} days`;
}
