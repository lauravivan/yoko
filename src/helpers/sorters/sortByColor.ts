export function sortByColor(events: EventType[]) {
  return events.sort((a, b) => {
    return a.color.localeCompare(b.color);
  });
}
