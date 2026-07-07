import { useEffect, useState } from 'react';
import { getFilterAndSortEvents } from '@/util/getFilterAndSortEvents';
import QueryManager from '@/util/query';
import useEventStore from '@/store/eventStore';
import useStore from '@/store/store';
import { getStoredEvents } from '@/helpers/storage/events';
import { useAuth } from '@/context/AuthContext';

const useEvent = () => {
  const session = useAuth();
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
    saveEvents,
  } = useEventStore();
  const [search, setSearch] = useState<string>(() =>
    queryManager.getQuery('search')
  );

  useEffect(() => {
    const events: IEvent[] = getStoredEvents();

    if (session.user?.id) {
    } else {
      saveEvents(events);
    }
  }, []);

  useEffect(() => {
    setEvents(search, filter, sort);
  }, [search]);

  const getPaginatedEvents = (): IEvent[] => {
    const e = evs;
    // return e.filter((e) => e.type === type);
    return [];
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
    events: evs,
    updateEventColor,
    updateEventDate,
    updateEventDesc,
  };
};

export default useEvent;
