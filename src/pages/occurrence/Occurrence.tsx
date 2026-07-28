import EventsView from './components/views/EventsView';
import { useEffect, useState } from 'react';
import CalendarView from './components/views/CalendarView';
import ActionsView from './components/views/ActionsView';
import CalendarIcon from '@/components/display/icons/views/Calendar';
import StopWatchIcon from '@/components/display/icons/views/StopWatch';
import ClockIcon from '@/components/display/icons/views/Clock';
import { useAuth } from '@/context/AuthContext';
import useOccurrenceStore from '@/store/occurrenceStore';
import { getStoredOccurrences } from '@/helpers/storage/occurrence';

enum ViewsEnum {
  EVENTS = 'EVENTS',
  CALENDAR = 'CALENDAR',
  ACTIONS = 'ACTIONS',
}

const OccurrencePage = () => {
  const { signed } = useAuth();
  const { setOccurrences } = useOccurrenceStore();
  const [view, setView] = useState<ViewsEnum>(ViewsEnum.EVENTS);

  useEffect(() => {
    //eslint-disable-next-line no-empty
    if (signed) {
    } else {
      const occ = getStoredOccurrences();
      setOccurrences(occ);
    }
  }, []);

  return (
    <main className="p-occurrence">
      <div className="p-occurrence__tabs">
        <button
          className={`p-occurrence__tabs__tab p-occurrence__tabs__tab${view === ViewsEnum.EVENTS ? '--active' : ''}`}
          onClick={() => setView(ViewsEnum.EVENTS)}
          title="Events"
          aria-label="Go to events view"
        >
          <ClockIcon />
        </button>
        <button
          className={`p-occurrence__tabs__tab p-occurrence__tabs__tab${view === ViewsEnum.CALENDAR ? '--active' : ''}`}
          onClick={() => setView(ViewsEnum.CALENDAR)}
          title="Calendar"
          aria-label="Go to calendar view"
        >
          <CalendarIcon />
        </button>
        <button
          className={`p-occurrence__tabs__tab p-occurrence__tabs__tab${view === ViewsEnum.ACTIONS ? '--active' : ''}`}
          onClick={() => setView(ViewsEnum.ACTIONS)}
          title="Actions"
          aria-label="Go to actions view"
        >
          <StopWatchIcon />
        </button>
      </div>
      {view === ViewsEnum.EVENTS && <EventsView />}
      {view === ViewsEnum.CALENDAR && <CalendarView />}
      {view === ViewsEnum.ACTIONS && <ActionsView />}
      {/* eslint-disable-next-line sonarjs/no-commented-code */}
      {/* {search && occurrences.length === 0 && (
        <div>Sorry, we couldn't find any results related to your research.</div>
      )} */}
    </main>
  );
};

export default OccurrencePage;
