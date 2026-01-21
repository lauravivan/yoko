import { Header, Modal } from '@/components';
import { useEvent, useModal } from '@/hooks';
import useStore from '@/store/store';
import { type FilterType } from '@/types/filter';
import { type SortType } from '@/types/sort';
import { FILTER_OPTIONS, SORT_OPTIONS } from '@/util/constants';
import { createUTCDate, createUTCDateNow } from '@/util/date/createUTCDate';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Outlet } from 'react-router';

const MainLayout = () => {
  const { closeModal, contentType, isOpen, openModal, handleTitle, title } =
    useModal();
  const {
    app,
    filter,
    theme,
    sort,
    selectFilter,
    selectSort,
    toggleTheme,
    toggleApp,
    eventId,
  } = useStore();
  const { getEvent, handleSearch, search, updateEventDate } = useEvent();
  const [date, setDate] = useState(() => {
    const event = getEvent(eventId);

    if (!event) return createUTCDateNow().toISOString();

    return event.date.toDateString();
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const datePicked = e.target.value;
    const date = createUTCDate(datePicked);
    updateEventDate(eventId, date);
    setDate(e.target.value);
  };

  return (
    <div className={`app ${theme === 'moon' ? 'dark' : 'light'}`}>
      <Header
        toggleTheme={toggleTheme}
        theme={theme}
        openModal={openModal}
        handleTitle={handleTitle}
        handleSearch={handleSearch}
        app={app}
        toggleApp={toggleApp}
        search={search}
      />
      <Outlet />
      {createPortal(
        <Modal closeModal={closeModal} title={title} isOpen={isOpen}>
          {contentType === 'filter' && (
            <ul className="select-list">
              {FILTER_OPTIONS.map((option: FilterType, i) => {
                return (
                  <li
                    key={i}
                    className={`${
                      option === filter ? ' select-list__active' : ''
                    } select-list__option`}
                    onClick={() => selectFilter(option)}
                  >
                    {option}
                  </li>
                );
              })}
            </ul>
          )}
          {contentType === 'sort' && (
            <ul className="select-list">
              {SORT_OPTIONS.map((option: SortType, i) => {
                return (
                  <li
                    key={i}
                    className={`${
                      option === sort ? ' select-list__active' : ''
                    } select-list__option`}
                    onClick={() => selectSort(option)}
                  >
                    {option}
                  </li>
                );
              })}
            </ul>
          )}
          {contentType === 'card' && (
            <form className="card-date-update" onSubmit={handleFormSubmit}>
              <label className="card-date-update__date">
                Pick a date:
                <input
                  type="date"
                  name="card-date"
                  id="card-date"
                  onChange={handleDate}
                  value={date}
                />
              </label>
              <div className="card-date-update__colors">
                <span>Pick a color: </span>
                <div className="card-date-update__colors__colors"></div>
              </div>
            </form>
          )}
        </Modal>,
        document.getElementById('root')!
      )}
    </div>
  );
};

export default MainLayout;
