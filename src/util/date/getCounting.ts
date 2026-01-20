import {
  addMonths,
  addYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';
import { createUTCDateNow } from './createUTCDate';

const getCounting = (date: Date) => {
  const now = createUTCDateNow();
  const years = differenceInYears(now, date);
  const dateAfterYears = addYears(date, years);
  const months = differenceInMonths(now, dateAfterYears);
  const dateAfterMonths = addMonths(dateAfterYears, months);
  const days = differenceInDays(now, dateAfterMonths);

  const yearsExtense = `${years} ${years === 1 ? 'year' : 'years'}`;
  const monthsExtense = `${months} ${months === 1 ? 'month' : 'months'}`;
  const daysExtense = `${days} ${days === 1 ? 'day' : 'days'}`;

  let counting = '';

  if (years > 0) {
    counting += `${yearsExtense}, `;
  }

  if (months > 0) {
    counting += `${monthsExtense}, `;
  }

  if (days > 0 || months > 0 || years > 0) {
    return `It has been ${counting}${daysExtense}`;
  }

  return `It has been 0 days`;
};

export default getCounting;
