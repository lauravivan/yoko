import AddButton from '@/components/action/AddButton';
import ListToolbar from '@/components/action/ListToolbar';
import useDelete from '@/hooks/useDelete';
import { type IOccurrence } from '@/types/Occurrence';
import OccurrenceCard from '../OccurrenceCard';
import NotFound from '../NotFound';
import useOccurrenceStore from '@/store/occurrenceStore';
import TwentyFourHourIcon from '@/components/display/icons/toolbar/24Hour';
import { useState } from 'react';
import TwentyFourHourDisabledIcon from '@/components/display/icons/toolbar/24HourDisabled';

const filterOptions = [
  'This month',
  'Next month',
  'In 2 months',
  'In 3 months',
  'In 4 months',
  'In 5 months',
  'In 6 months',
  'In more than 6 months',
];

const EventsView = () => {
  const { createOccurrence, getEvents } = useOccurrenceStore();
  const { selectedCount, onSelect, onDeselect } = useDelete();
  const [is24Hour, setIs24Hour] = useState(true);

  const events = getEvents();

  const handleCreateOccurrence = () => createOccurrence();

  return (
    <div className="c-events-view">
      {events.length > 0 ? (
        <>
          <ListToolbar>
            <ListToolbar.Item type="filter" currentActive="">
              <span>When:</span>
              <ul>
                {filterOptions?.map((op) => (
                  <li key={op}>{op}</li>
                ))}
              </ul>
            </ListToolbar.Item>
            <ListToolbar.Item type="sort" currentActive="">
              <div></div>
            </ListToolbar.Item>
            <ListToolbar.Item
              type="delete"
              currentActive={`Delete (${selectedCount} selected)`}
            >
              <div></div>
            </ListToolbar.Item>
            <ListToolbar.Item
              type="toggle"
              ToggleIcon={
                is24Hour ? TwentyFourHourDisabledIcon : TwentyFourHourIcon
              }
              currentActive=""
              onToggle={() => setIs24Hour((prev) => !prev)}
              toggleTitle="Set hour format"
            />
          </ListToolbar>
          <div className="c-events-view__cards">
            <AddButton
              onClick={handleCreateOccurrence}
              aria-label="Add event"
            />

            {events.length > 0 &&
              events.map((event: IOccurrence) => (
                <OccurrenceCard
                  id={event.id}
                  title={event.title}
                  desc={event.desc}
                  key={event.id}
                  onSelect={onSelect}
                  onDeselect={onDeselect}
                  category={event.category}
                  isEvent={event.isEvent}
                  dateOfOccurrence={event.dateOfOccurrence}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  allDay={event.allDay}
                  is24Hour={is24Hour}
                />
              ))}
          </div>
        </>
      ) : (
        <NotFound keyword="event" handleCreate={handleCreateOccurrence} />
      )}
    </div>
  );
};

export default EventsView;
