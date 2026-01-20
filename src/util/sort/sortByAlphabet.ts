export function sortByAlphabet(events: EventType[]) {
  return events.sort((a, b) => {
    const x = a.desc.toLowerCase();
    const y = b.desc.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
}
