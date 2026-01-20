import { getFilteredEvents } from './filter/getFilteredEvents';
import { getSortedEvents } from './sort/getSortedEvents';

export function getFilterAndSortEvents(
  filter: string,
  sort: string,
  events: EventType[]
) {
  const filtered = getFilteredEvents(filter, events);
  return getSortedEvents(filtered, sort);
}
