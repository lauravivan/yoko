import { differenceInCalendarMonths } from 'date-fns';

export function filterEvents(
  diffInMonths: number,
  events: EventType[],
  operator = '=='
): EventType[] {
  const date = new Date();
  const filtered: EventType[] = [];

  events.filter((event: EventType) => {
    const eventDate = new Date(event.date);
    const difference = differenceInCalendarMonths(eventDate, date);

    switch (operator) {
      case '==':
        if (difference == diffInMonths) {
          filtered.push(event);
        }
        break;
      case '>':
        if (difference > diffInMonths) {
          filtered.push(event);
        }
        break;
      default:
        break;
    }
  });

  return filtered;
}
