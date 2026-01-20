const LS_KEY = 'yoko-events';

export function getStoredEvents() {
  const events = localStorage.getItem(LS_KEY);
  return events ? JSON.parse(events) : [];
}

export function storeEvents(events: EventType[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(events));
}
