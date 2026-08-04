import AddButton from '@/components/action/AddButton';
import ListToolbar from '@/components/action/ListToolbar';
import useDelete from '@/hooks/useDelete';
import useOccurrenceStore from '@/store/occurrenceStore';
import { type IOccurrence } from '@/types/Occurrence';
import OccurrenceCard from './OccurrenceCard';
import NotFound from './NotFound';

const ActionsView = () => {
  const { createOccurrence, getActions } = useOccurrenceStore();
  const { selectedCount, onSelect, onDeselect } = useDelete();

  const actions = getActions();

  const handleCreateOccurrence = () => createOccurrence(false);

  return (
    <div className="c-actions-view">
      {actions.length > 0 ? (
        <>
          <ListToolbar>
            <ListToolbar.Item type="filter" currentActive="">
              <span>When:</span>
              <ul>
                <li></li>
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
          <div className="c-actions-view__cards">
            <AddButton
              onClick={handleCreateOccurrence}
              aria-label="Add action"
            />

            {actions.length > 0 &&
              actions.map((action: IOccurrence) => (
                <OccurrenceCard
                  occurrence={action}
                  key={action.id}
                  onSelect={onSelect}
                  onDeselect={onDeselect}
                  is24Hour={action.allDay}
                />
              ))}
          </div>
        </>
      ) : (
        <NotFound keyword="action" handleCreate={handleCreateOccurrence} />
      )}
    </div>
  );
};

export default ActionsView;
