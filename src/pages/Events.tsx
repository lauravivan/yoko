import Card from '@/components/Card';
import { useGeneral } from '@/context/GeneralContext';
import { useEvent, useModal } from '@/hooks';
import navigation from '@/navigation';
import useStore from '@/store/store';
import { BsPlusLg } from 'react-icons/bs';
import { Link, useLocation, useNavigate } from 'react-router';

const TODOModal = () => {
  return (
    <div className="todo">
      <h3>TODO</h3>
    </div>
  );
};

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
  const events = getPaginatedEvents(app);
  const { isTaskOpen } = useGeneral();
  const navigate = useNavigate();

  navigate(navigation.navigateToActions());

  return (
    <main className="events-page">
      <Link to={navigation.navigateToActions()}>teste</Link>
      <div className={`cards-view-${view} cards`}>
        {!search && (
          <div
            className="cards__add-event"
            style={{ textAlign: 'center' }}
            onClick={() => createEvent(app, filter, sort)}
            aria-label="Adicionar evento"
          >
            <BsPlusLg />
          </div>
        )}

        {events.length > 0 &&
          events.map((event: EventType) => (
            <Card
              event={event}
              key={event.id}
              updateEventDesc={updateEventDesc}
              deleteEvent={deleteEvent}
              handleEventId={(eventId: string) => setEventId(eventId)}
              openModal={openModal}
              handleTitle={handleTitle}
              app={app}
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
