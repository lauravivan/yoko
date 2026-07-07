import { sortByAlphabet } from './sortByAlphabet';
import { sortByColor } from './sortByColor';
import { sortByDate } from './sortByDate';

export function getSortedEvents(
  filteredEvents: EventType[],
  typeOfSort: string
) {
  const sortLower = typeOfSort.toLowerCase();

  if (sortLower.includes('alphabet')) {
    return sortByAlphabet(filteredEvents);
  }

  if (sortLower.includes('color')) {
    return sortByColor(filteredEvents);
  }

  if (sortLower.includes('date')) {
    return sortByDate(filteredEvents);
  }

  return filteredEvents;
}
