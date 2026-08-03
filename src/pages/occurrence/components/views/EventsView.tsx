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
import { OccurrenceCategoryEnum } from '@/enum/OccurrenceEnum';
import DefaultButton from '@/components/action/DefaultButton';

const filterOptions = [
  'All',
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
  const [activeWhen, setActiveWhen] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');

  const eventsRes = getEvents({ category: activeCategory });

  const handleCreateOccurrence = () => createOccurrence();

  return (
    <div className="c-events-view">
      {eventsRes.totalEvents === 0 && (
        <NotFound keyword="event" handleCreate={handleCreateOccurrence} />
      )}
      {eventsRes.totalEvents > 0 && eventsRes.events.length > 0 && (
        <>
          <ListToolbar>
            <ListToolbar.Item
              type="filter"
              currentActive={`${activeWhen}, ${activeCategory}`}
            >
              <div className="c-events-view__filter">
                <div className="c-events-view__filter__when">
                  <span>When</span>
                  <ul>
                    {filterOptions?.map((op) => (
                      <li
                        onClick={() => setActiveWhen(op)}
                        key={op}
                        data-when-active={activeWhen === op}
                      >
                        {op}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="c-events-view__filter__category">
                  <span>Category</span>
                  <ul>
                    {['All', ...Object.values(OccurrenceCategoryEnum)].map(
                      (occ) => (
                        <li
                          key={occ}
                          onClick={() => setActiveCategory(occ)}
                          data-category-active={activeCategory === occ}
                        >
                          {occ}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <DefaultButton
                  onClick={() => {
                    setActiveCategory('All');
                    setActiveWhen('All');
                  }}
                >
                  Reset filters
                </DefaultButton>
              </div>
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
            {activeCategory === 'All' && (
              <AddButton
                onClick={handleCreateOccurrence}
                aria-label="Add event"
              />
            )}

            {eventsRes.events.map((event: IOccurrence) => (
              <OccurrenceCard
                occurrence={event}
                key={event.id}
                onSelect={onSelect}
                onDeselect={onDeselect}
                is24Hour={is24Hour}
              />
            ))}
          </div>
        </>
      )}
      {eventsRes.totalEvents > 0 && eventsRes.events.length === 0 && (
        <div className="c-events-view__not-found">No events were find</div>
      )}
    </div>
  );
};

export default EventsView;
