import Footer from '@/layouts/components/Footer';
import Header from '@/layouts/components/Header';
import useModal from '@/hooks/useModal';
import useEvent from '@/hooks/useEvent';
import useStore from '@/store/store';
import { useState } from 'react';
import { Outlet } from 'react-router';

const AppLayout = () => {
  const { closeModal, contentType, isOpen, openModal, handleTitle, title } =
    useModal();
  const { filter, theme, sort, selectFilter, selectSort, toggleTheme } =
    useStore();
  const { getEvent, handleSearch, search, updateEventDate } = useEvent();
  const [date, setDate] = useState(() => {
    // if (!event) return createUTCDateNow().toISOString();

    // return event.date.toDateString();

    return new Date().toDateString();
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const datePicked = e.target.value;
    // const date = createUTCDate(datePicked);
    // updateEventDate(eventId, date);
    setDate(e.target.value);
  };

  return (
    <div className={`app ${theme === 'moon' ? 'dark' : 'light'}`}>
      <Header
        toggleTheme={toggleTheme}
        handleTitle={handleTitle}
        handleSearch={handleSearch}
        search={search}
        openModal={() => {}}
      />
      <Outlet />
      <Footer />
      {/* {createPortal(
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
      )} */}
    </div>
  );
};

export default AppLayout;
