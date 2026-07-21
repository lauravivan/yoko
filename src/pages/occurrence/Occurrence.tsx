import EventsView from './components/views/EventsView';
import { useState } from 'react';
import CalendarView from './components/views/CalendarView';
import ActionsView from './components/views/ActionsView';
import CalendarIcon from '@/components/display/icons/views/Calendar';
import StopWatchIcon from '@/components/display/icons/views/StopWatch';
import ClockIcon from '@/components/display/icons/views/Clock';

enum ViewsEnum {
  EVENTS = 'EVENTS',
  CALENDAR = 'CALENDAR',
  ACTIONS = 'ACTIONS',
}

const OccurrencePage = () => {
  const [view, setView] = useState<ViewsEnum>(ViewsEnum.EVENTS);

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
      {/* {search && occurrences.length === 0 && (
        <div>Sorry, we couldn't find any results related to your research.</div>
      )} */}
    </main>
  );
};

export default OccurrencePage;
