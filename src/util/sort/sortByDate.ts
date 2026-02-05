export function sortByDate(events: EventType[]) {
  return events.sort((a, b) => {
    const x = new Date(a.date);
    const y = new Date(b.date);
    return x.getTime() - y.getTime();
  });
}
