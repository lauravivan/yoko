import CountingCard from '@/pages/event/components/CountingCard';
import AddIcon from '@/components/display/icons/Add';
import { useAuth } from '@/context/AuthContext';
import useModal from '@/hooks/useModal';
import useEvent from '@/hooks/useEvent';
import useStore from '@/store/store';
import { useLocation } from 'react-router';
import useDelete from '@/hooks/useDelete';
import ListToolbar from '@/components/action/ListToolbar';

//mock
const events = [
  {
    title: 'Meu evento',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo voluptatum explicabo architecto fugiat molestiae vitae suscipit modi voluptatem eligendi. Laudantium rem autem dolor ipsa magnam voluptatibus perspiciatis natus cumque repellendus.',
    date: new Date(),
  },
  {
    title: 'Meu evento 2',
    date: new Date(),
  },
];

interface EventsPageProps {
  isEvents?: boolean;
}

const EventsPage = ({ isEvents = false }: EventsPageProps) => {
  const session = useAuth();
  const location = useLocation();
  const { openModal, handleTitle } = useModal();
  const {
    createEvent,
    deleteEvent,
    getPaginatedEvents,
    search,
    updateEventDesc,
  } = useEvent();
  const { filter, sort, setEventId } = useStore();
  const { selectedCount, onSelect, onDeselect } = useDelete();
  // const events = getPaginatedEvents(app);

  const baseClass = isEvents ? 'p-events' : 'p-actions';

  return (
    <main className={`${baseClass}`}>
      <ListToolbar>
        <ListToolbar.Item
          type="filter"
          options={[
            'All',
            'Happening this month',
            'Happening next month',
            'Happening in 2 months',
            'Happening in 3 months',
            'Happening in 4 months',
            'Happening in 5 months',
            'Happening in 6 months',
            'Happening in more than 6 months',
          ]}
        >
          All
        </ListToolbar.Item>
        <ListToolbar.Item type="delete">Delete</ListToolbar.Item>
      </ListToolbar>
      <div className={`${baseClass}__cards`}>
        {!search && (
          <button
            className="c-add-card"
            onClick={() => createEvent()}
            aria-label="Adicionar evento"
          >
            <AddIcon />
          </button>
        )}

        {events.length > 0 &&
          events.map((event: IEvent) => (
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
            <CountingCard
              title={event.title}
              desc={event.desc}
              date={new Date(event.date)}
              bgColor=""
              key={event.id}
              onSelect={onSelect}
              onDeselect={onDeselect}
              isCountdown={isEvents}
            />
          ))}
      </div>
      {search && events.length === 0 && (
        <div>Sorry, we couldn't find any results related to your research.</div>
      )}
    </main>
  );
};

export default EventsPage;
