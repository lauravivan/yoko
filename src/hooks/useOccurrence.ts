import { useEffect, useState } from 'react';
import { getFilterAndSortEvents } from '@/util/getFilterAndSortEvents';
import QueryManager from '@/helpers/query';
import useStore from '@/store/store';
import { useAuth } from '@/context/AuthContext';
import useOccurrenceStore from '@/store/occurrenceStore';
import { getStoredOccurrences } from '@/helpers/storage/occurrence';
import { IOccurrence } from '@/types/Occurrence';

const useOccurrence = () => {
  const session = useAuth();
  const queryManager = new QueryManager();
  const { filter, sort } = useStore();
  const {
    createOccurrence,
    deleteOccurrence,
    occurrences: occs,
    updateOccurrenceColor,
    updateOccurrenceDate,
    updateOccurrenceDesc,
    setOccurrences,
    saveOccurrences,
    getOccurrences,
  } = useOccurrenceStore();
  const [search, setSearch] = useState<string>(() =>
    queryManager.getQuery('search')
  );

  useEffect(() => {
    const occurrences: IOccurrence[] = getStoredOccurrences();

    if (session.user?.id) {
    } else {
      saveOccurrences(occurrences);
    }
  }, []);

  useEffect(() => {
    setOccurrences(search, filter, sort);
  }, [search]);

  const getPaginatedOccurrences = (): IOccurrence[] => {
    const e = occs;
    // return e.filter((e) => e.type === type);
    return [];
  };

  const getOccurrence = (id: string) => {
    return occs.find((e) => e.id === id);
  };

  return {
    getPaginatedOccurrences,
    handleSearch: (search: string) => setSearch(search),
    search,
    getOccurrence,
    createOccurrence,
    deleteOccurrence,
    occurrences: occs,
    updateOccurrenceColor,
    updateOccurrenceDate,
    updateOccurrenceDesc,
    getOccurrences,
  };
};

export default useOccurrence;
