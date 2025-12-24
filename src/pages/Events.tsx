import { Card } from "@/components";
import { useEvent, useModal } from "@/hooks";
import useStore from "@/store/store";
import { BsPlusLg } from "react-icons/bs";

const EventsPage = () => {
  const { openModal, handleTitle } = useModal();
  const {
    createEvent,
    deleteEvent,
    getPaginatedEvents,
    search,
    updateEventDesc,
  } = useEvent();
  const { view, app, filter, sort, setEventId } = useStore();
  const events = getPaginatedEvents(app);

  return (
    <main>
      <div className={`cards-view-${view} cards`}>
        {!search && (
          <div
            className="cards__add-event"
            style={{ textAlign: "center" }}
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
      </div>
      {search && events.length === 0 && (
        <div>Sorry, we couldn’t find any results related to your research.</div>
      )}
    </main>
  );
};

export default EventsPage;
