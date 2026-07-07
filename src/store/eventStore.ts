import { storeEvents } from '@/helpers/storage/events';
import { create } from 'zustand';
import { v7 as uuidv7 } from 'uuid';
import { generateRandomString } from '@/helpers/generators/random';
import { getCardColors } from '@/helpers/transformers/getCardColors';

interface EventStoreState {
  events: IEvent[];
  createEvent: () => void;
  updateEventDesc: (id: string, newDesc: string) => void;
  updateEventColor: (id: string, newColor: string) => void;
  updateEventDate: (id: string, newDate: Date) => void;
  deleteEvent: (id: string) => void;
  setEvents: (search: string, filter: string, sort: string) => void;
  saveEvents: (events: IEvent[]) => void;
}

const useEventStore = create<EventStoreState>((set) => ({
  events: [],
  createEvent: () =>
    set((state) => {
      const event: IEvent = {
        id: uuidv7(),
        title: 'Unamed',
        desc: '',
        color: generateRandomString('', getCardColors()),
        date: new Date(),
      };

      const prevEvents = [...state.events];

      prevEvents.push(event);

      storeEvents(prevEvents);

      return {
        ...state,
        events: prevEvents,
      };
    }),
  updateEventDesc: (id: string, newDesc: string) =>
    set((state) => {
      const prevEvents = [...state.events];

      for (const e of prevEvents) {
        if (e.id === id) {
          e.desc = newDesc;
        }
      }

      storeEvents(prevEvents);

      return {
        ...state,
        events: prevEvents,
      };
    }),
  updateEventColor: (id: string, newColor: string) =>
    set((state) => {
      const prevEvents = [...state.events];

      for (const e of prevEvents) {
        if (e.id === id) {
          e.color = newColor;
        }
      }

      storeEvents(prevEvents);

      return {
        ...state,
        events: prevEvents,
      };
    }),
  updateEventDate: (id: string, newDate: Date) =>
    set((state) => {
      const prevEvents = [...state.events];

      for (const e of prevEvents) {
        if (e.id === id) {
          e.date = newDate;
        }
      }

      storeEvents(prevEvents);

      return {
        ...state,
        events: prevEvents,
      };
    }),
  deleteEvent: (id: string) =>
    set((state) => {
      const prevEvents = [...state.events];
      const newEvents = prevEvents.filter((e) => e.id !== id);
      storeEvents(newEvents);
      return {
        ...state,
        events: newEvents,
      };
    }),
  setEvents: (search: string, filter: string, sort: string) =>
    set((state) => {
      const ev = [...state.events];
      return search
        ? {
            ...state,
            events: ev,
          }
        : state;
    }),
  saveEvents: (events: IEvent[]) =>
    set(() => ({
      events,
    })),
}));

export default useEventStore;
