import CountdownCard from '@/components/cards/CountdownCard';
import AddIcon from '@/components/display/icons/Add';
import { useAuth } from '@/context/AuthContext';
import useModal from '@/hooks/useModal';
import useEvent from '@/hooks/useEvent';
import useStore from '@/store/store';
import { useLocation } from 'react-router';

//mock
// const events = [
//   {
//     title: 'Meu evento',
//     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo voluptatum explicabo architecto fugiat molestiae vitae suscipit modi voluptatem eligendi. Laudantium rem autem dolor ipsa magnam voluptatibus perspiciatis natus cumque repellendus.',
//     date: new Date(),
//   },
//   {
//     title: 'Meu evento 2',
//     date: new Date(),
//   },
// ];

const EventsPage = () => {
  const session = useAuth();
  const location = useLocation();
  const app = location.pathname === 'actions' ? 'actions' : 'countdown';
  const { openModal, handleTitle } = useModal();
  const {
    createEvent,
    deleteEvent,
    getPaginatedEvents,
    search,
    updateEventDesc,
    events,
  } = useEvent();
  const { filter, sort, setEventId } = useStore();
  // const events = getPaginatedEvents(app);

  return (
    <main className="p-events">
      <div className={`cards`}>
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
            <CountdownCard
              title={event.title}
              desc={event.desc}
              date={new Date(event.date)}
              bgColor=""
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
