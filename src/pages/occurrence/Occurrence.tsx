import OccurrenceCard from './components/OccurrenceCard';
import { useAuth } from '@/context/AuthContext';
import useModal from '@/hooks/useModal';
import useStore from '@/store/store';
import { useLocation } from 'react-router';
import useDelete from '@/hooks/useDelete';
import ListToolbar from '@/components/action/ListToolbar';
import DefaultButton from '@/components/action/DefaultButton';
import AddButton from '@/components/action/AddButton';
import useOccurrence from '@/hooks/useOccurrence';
import { IOccurrence } from '@/types/Occurrence';
import { OccurrenceEnum } from '@/enum/OccurrenceEnum';

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

interface OccurrencePageProps {
  isEvents?: boolean;
}

const OccurrencePage = ({ isEvents = false }: OccurrencePageProps) => {
  const session = useAuth();
  const location = useLocation();
  const { openModal, handleTitle } = useModal();
  const {
    createOccurrence,
    deleteOccurrence,
    getPaginatedOccurrences,
    search,
    updateOccurrenceDesc,
    getOccurrences,
  } = useOccurrence();
  const { filter, sort, setEventId } = useStore();
  const { selectedCount, onSelect, onDeselect } = useDelete();
  // const events = getPaginatedEvents(app);

  const modifier = isEvents ? 'events' : 'actions';

  const modifierSingular = modifier.replace('s', '');

  const handleCreateOccurrence = () =>
    createOccurrence(
      isEvents ? OccurrenceEnum.WAITING : OccurrenceEnum.ONGOING
    );

  const occurrences = getOccurrences(isEvents);

  return (
    <main className={`p-occurrence p-occurrence--${modifier}`}>
      {occurrences.length > 0 ? (
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
          <div className={`p-occurrence__cards`}>
            {!search && (
              <AddButton
                onClick={handleCreateOccurrence}
                aria-label={`Add ${modifierSingular}`}
              />
            )}

            {occurrences.length > 0 &&
              occurrences.map((event: IOccurrence) => (
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
                  date={new Date(event.date)}
                  key={event.id}
                  onSelect={onSelect}
                  onDeselect={onDeselect}
                  category={event.category}
                  state={event.state}
                />
              ))}
          </div>
        </>
      ) : (
        <div className={`p-occurrence__no-data`}>
          <div>
            <p>
              It appears you haven't created any {modifierSingular} yet. Click
              in <span className="highlight">'Create {modifierSingular}'</span>{' '}
              to create.
            </p>
            <DefaultButton onClick={handleCreateOccurrence}>
              {`Create ${modifierSingular}`}
            </DefaultButton>
          </div>
        </div>
      )}
      {search && occurrences.length === 0 && (
        <div>Sorry, we couldn't find any results related to your research.</div>
      )}
    </main>
  );
};

export default OccurrencePage;
