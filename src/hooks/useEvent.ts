import { useEffect, useState } from "react";
import { getFilterAndSortEvents } from "@/util/getFilterAndSortEvents";
import QueryManager from "@/util/query";
import { AppType } from "@/types/app";
import useEventStore from "@/store/eventStore";
import useStore from "@/store/store";

const useEvent = () => {
  const queryManager = new QueryManager();
  const { filter, sort } = useStore();
  const {
    createEvent,
    deleteEvent,
    events: evs,
    updateEventColor,
    updateEventDate,
    updateEventDesc,
    setEvents,
  } = useEventStore();
  const [search, setSearch] = useState<string>(() =>
    queryManager.getQuery("search")
  );

  useEffect(() => {
    setEvents(search, filter, sort);
  }, [search]);

  const getPaginatedEvents = (type: AppType): EventType[] => {
    const e = getFilterAndSortEvents(filter, sort, evs);
    return e.filter((e) => e.type === type);
  };

  const getEvent = (id: string) => {
    return evs.find((e) => e.id === id);
  };

  return {
    getPaginatedEvents,
    handleSearch: (search: string) => setSearch(search),
    search,
    getEvent,
    createEvent,
    deleteEvent,
    events: getFilterAndSortEvents(filter, sort, evs),
    updateEventColor,
    updateEventDate,
    updateEventDesc,
  };
};

export default useEvent;
