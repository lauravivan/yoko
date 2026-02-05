import { filterEvents } from './filterEvents';

export function getFilteredEvents(
  filter: string,
  events: EventType[]
): EventType[] {
  const e = [...events];
  const filterLower = filter.toLowerCase();

  if (filterLower.includes('this')) {
    return filterEvents(0, e);
  }

  if (filterLower.includes('next')) {
    return filterEvents(1, e);
  }

  if (filter.includes('2')) {
    return filterEvents(2, e);
  }

  if (filter.includes('3')) {
    return filterEvents(3, e);
  }

  if (filter.includes('4')) {
    return filterEvents(4, e);
  }

  if (filter.includes('5')) {
    return filterEvents(5, e);
  }

  if (filterLower.includes('in 6')) {
    return filterEvents(6, e);
  }

  if (filterLower.includes('more than')) {
    return filterEvents(6, e, '>');
  }

  return e;
}
