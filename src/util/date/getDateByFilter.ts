import { type FilterType } from '@/types/filter';
import { addMonths } from 'date-fns';

export function getDateByFilter(filter: FilterType) {
  const currentDate = new Date();

  if (filter === 'Happening this month') {
    return currentDate;
  }

  if (filter === 'Happening next month') {
    return addMonths(currentDate, 1);
  }

  if (filter === 'Happening in 2 months') {
    return addMonths(currentDate, 2);
  }

  if (filter === 'Happening in 3 months') {
    return addMonths(currentDate, 3);
  }

  if (filter === 'Happenning in 4 months') {
    return addMonths(currentDate, 4);
  }

  if (filter === 'Hapenning in 5 months') {
    return addMonths(currentDate, 5);
  }

  if (filter === 'Happening in 6 months') {
    return addMonths(currentDate, 6);
  }

  if (filter === 'Happening in more than 6 months') {
    return addMonths(currentDate, 7);
  }

  return currentDate;
}
