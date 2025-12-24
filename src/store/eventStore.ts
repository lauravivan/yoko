import { AppType } from "@/types/app";
import { getStoredEvents, storeEvents } from "@/util/storage/events";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { getDateByFilter } from "@/util/date/getDateByFilter";
import { getDrawnColor } from "@/util/color/getDrawnColor";
import { getFilterAndSortEvents } from "@/util/getFilterAndSortEvents";
import { FilterType } from "@/types/filter";
import { SortType } from "@/types/sort";

interface EventStoreState {
  events: EventType[];
  createEvent: (type: AppType, filter: FilterType, sort: SortType) => void;
  updateEventDesc: (id: string, newDesc: string) => void;
  updateEventColor: (id: string, newColor: string) => void;
  updateEventDate: (id: string, newDate: Date) => void;
  deleteEvent: (id: string) => void;
  setEvents: (search: string, filter: FilterType, sort: SortType) => void;
}

const useEventStore = create<EventStoreState>((set) => ({
  events: getStoredEvents(),
  createEvent: (type: AppType, filter: FilterType, sort: SortType) =>
    set((state) => {
      const ev = getFilterAndSortEvents(filter, sort, state.events);
      const id = uuidv4();
      const dateValid = filter ? getDateByFilter(filter) : new Date();

      const drawnColor =
        ev?.length > 0
          ? getDrawnColor(ev[ev.length - 1].color)
          : getDrawnColor("");

      const event: EventType = {
        id: id,
        desc: "Unamed",
        color: drawnColor,
        date: dateValid,
        type,
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
  setEvents: (search: string, filter: FilterType, sort: SortType) =>
    set((state) => {
      const ev = getFilterAndSortEvents(filter, sort, state.events);
      const evsFiltered = ev.filter(
        (e) =>
          search.toLowerCase().includes(e.desc.toLowerCase()) ||
          e.desc.toLowerCase().includes(search.toLowerCase())
      );

      return search
        ? {
            ...state,
            events: evsFiltered,
          }
        : state;
    }),
}));

export default useEventStore;
