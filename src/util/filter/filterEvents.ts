import { differenceInCalendarMonths } from 'date-fns';

export function filterEvents(
  diffInMonths: number,
  events: EventType[],
  operator = '=='
): EventType[] {
  const date = new Date();

  return events.filter((event: EventType) => {
    const eventDate = new Date(event.date);
    const difference = differenceInCalendarMonths(eventDate, date);

    switch (operator) {
      case '==':
        if (difference == diffInMonths) {
          return event;
        }
        break;
      case '>':
        if (difference > diffInMonths) {
          return event;
        }
        break;
      default:
        break;
    }
  });
}
