import CountdownCard from '@/components/cards/CountdownCard';
import AddIcon from '@/components/display/icons/Add';
import { useGeneral } from '@/context/GeneralContext';
import { useEvent, useModal } from '@/hooks';
import useStore from '@/store/store';
import { useLocation } from 'react-router';

const TODOModal = () => {
  return (
    <div className="todo">
      <h3>TODO</h3>
    </div>
  );
};

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

const EventsPage = () => {
  const location = useLocation();
  const app = location.pathname === 'actions' ? 'actions' : 'countdown';
  const { openModal, handleTitle } = useModal();
  const {
    createEvent,
    deleteEvent,
    getPaginatedEvents,
    search,
    updateEventDesc,
  } = useEvent();
  const { view, filter, sort, setEventId } = useStore();
  // const events = getPaginatedEvents(app);
  const { isTaskOpen } = useGeneral();

  return (
    <main className="p-events">
      <div className={`cards-view-${view} cards`}>
        {!search && (
          <div
            className="c-add-card"
            onClick={() => createEvent(app, filter, sort)}
            aria-label="Adicionar evento"
          >
            <AddIcon />
          </div>
        )}

        {events.length > 0 &&
          events.map((event) => (
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
              date={event.date}
            />
          ))}

        {isTaskOpen && <TODOModal />}
      </div>
      {search && events.length === 0 && (
        <div>Sorry, we couldn’t find any results related to your research.</div>
      )}
    </main>
  );
};

export default EventsPage;
