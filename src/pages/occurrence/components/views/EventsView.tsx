import AddButton from '@/components/action/AddButton';
import DefaultButton from '@/components/action/DefaultButton';
import ListToolbar from '@/components/action/ListToolbar';
import { OccurrenceEnum } from '@/enum/OccurrenceEnum';
import useDelete from '@/hooks/useDelete';
import useOccurrence from '@/hooks/useOccurrence';
import { IOccurrence } from '@/types/Occurrence';
import OccurrenceCard from '../OccurrenceCard';
import NotFound from '../NotFound';
import useOccurrenceStore from '@/store/occurrenceStore';

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
                  <li>{op}</li>
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
          </ListToolbar>
          <div className="c-events-view__cards">
            <AddButton
              onClick={handleCreateOccurrence}
              aria-label="Add event"
            />

            {events.length > 0 &&
              events.map((event: IOccurrence) => (
                // <Card
                //   event={event}
                //   key={event.id}
                //   updateEventDesc={updateEventDesc}
                //   deleteEvent={deleteEvent}
                //   handleEventId={(eventId: string) => setEventId(eventId)}
                //   openModal={openModal}
                //   handleTitle={handleTitle}
                //   app={app}
                // />
                <OccurrenceCard
                  title={event.title}
                  desc={event.desc}
                  key={event.id}
                  onSelect={onSelect}
                  onDeselect={onDeselect}
                  category={event.category}
                  isEvent={event.isEvent}
                  startDate={event.startDate}
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
