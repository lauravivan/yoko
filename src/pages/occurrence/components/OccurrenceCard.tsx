import { useEffect, useState } from 'react';
import NoteIcon from '@/components/display/icons/Note';
import {
  formatDate,
  formatDateForInput,
  formatHour,
} from '@/helpers/formatters/date';
import { differenceInCalendarDays } from 'date-fns';
import useClickOutside from '@/hooks/useClickOutside';
import DocumentTextIcon from '@/components/display/icons/DocumentText';
import DynamicModal from '@/components/display/DynamicModal';
import { useFloating, autoUpdate, autoPlacement } from '@floating-ui/react-dom';
import { OccurrenceCategoryEnum } from '@/enum/OccurrenceEnum';
import PersonalIcon from '@/components/display/icons/categories/Personal';
import WorkIcon from '@/components/display/icons/categories/Work';
import Divider from '@/components/utils/Divider';
import useOccurrenceForm from '../hooks/useOccurrenceForm';
import FamilyIcon from '@/components/display/icons/categories/Family';
import FinanceIcon from '@/components/display/icons/categories/Finance';
import HealthIcon from '@/components/display/icons/categories/Health';
import HobbyIcon from '@/components/display/icons/categories/Hobby';
import HomeIcon from '@/components/display/icons/categories/Home';
import ReadingIcon from '@/components/display/icons/categories/Reading';
import SocialIcon from '@/components/display/icons/categories/Social';
import StudyIcon from '@/components/display/icons/categories/Study';
import TravelIcon from '@/components/display/icons/categories/Travel';
import DefaultButton from '@/components/action/DefaultButton';

/* eslint-disable sonarjs/no-commented-code */
// const getCounting = (date: Date) => {
//   const now = createUTCDateNow();
//   const years = differenceInYears(now, date);
//   const dateAfterYears = addYears(date, years);
//   const months = differenceInMonths(now, dateAfterYears);
//   const dateAfterMonths = addMonths(dateAfterYears, months);
//   const days = differenceInDays(now, dateAfterMonths);

//   const yearsExtense = `${years} ${years === 1 ? 'year' : 'years'}`;
//   const monthsExtense = `${months} ${months === 1 ? 'month' : 'months'}`;
//   const daysExtense = `${days} ${days === 1 ? 'day' : 'days'}`;

//   let counting = '';

//   if (years > 0) {
//     counting += `${yearsExtense}, `;
//   }

//   if (months > 0) {
//     counting += `${monthsExtense}, `;
//   }

//   if (days > 0 || months > 0 || years > 0) {
//     return `It has been ${counting}${daysExtense}`;
//   }

//   return `It has been 0 days`;
// };
/* eslint-enable sonarjs/no-commented-code */

const Countdown = ({ dateToEvent }: { dateToEvent: Date }) => {
  const difference = differenceInCalendarDays(
    new Date(dateToEvent).toISOString().slice(0, 10),
    new Date().toISOString().slice(0, 10)
  );

  return (
    <span className="c-occurrence-card__right-container__counting">
      {difference < 0 && (
        <>
          Already <br /> happened
        </>
      )}
      {difference === 0 && <>It&apos;s today!!</>}
      {difference > 0 && (
        <>
          In{' '}
          <span className="c-occurrence-card__right-container__counting--highlight">
            {difference}
          </span>{' '}
          {difference === 1 ? 'day' : 'days'}
        </>
      )}
    </span>
  );
};

const CategoryIcon = ({ category }: { category: OccurrenceCategoryEnum }) => {
  if (category === OccurrenceCategoryEnum.Personal) return <PersonalIcon />;
  if (category === OccurrenceCategoryEnum.Family) return <FamilyIcon />;
  if (category === OccurrenceCategoryEnum.Finance) return <FinanceIcon />;
  if (category === OccurrenceCategoryEnum.Health) return <HealthIcon />;
  if (category === OccurrenceCategoryEnum.Hobby) return <HobbyIcon />;
  if (category === OccurrenceCategoryEnum.Home) return <HomeIcon />;
  if (category === OccurrenceCategoryEnum.Reading) return <ReadingIcon />;
  if (category === OccurrenceCategoryEnum.Social) return <SocialIcon />;
  if (category === OccurrenceCategoryEnum.Study) return <StudyIcon />;
  if (category === OccurrenceCategoryEnum.Travel) return <TravelIcon />;
  if (category === OccurrenceCategoryEnum.Work) return <WorkIcon />;
  return null;
};

const OccurrenceCard = ({
  id,
  title,
  desc,
  onSelect,
  onDeselect,
  category,
  isEvent,
  dateOfOccurrence,
  endTime,
  startTime,
  allDay,
  is24Hour,
}: {
  id: string;
  title: string;
  desc: string | null;
  category: OccurrenceCategoryEnum;
  onSelect: () => void;
  onDeselect: () => void;
  isEvent: boolean;
  dateOfOccurrence: Date;
  startTime: string | null;
  endTime: string | null;
  allDay: boolean;
  is24Hour: boolean;
}) => {
  const [showDesc, setShowDesc] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showRightContainer, setShowRightContainer] = useState(
    isEvent ? true : false
  );

  const {
    handleTitleEditMode,
    handleTitleUpdateOnBlur,
    handleTitleUpdateOnKeyDown,
    descRef,
    titleRef,
    categoryRef,
    dateOfOccurrenceRef,
    titleEditMode,
    startTimeRef,
    endTimeRef,
    handleAllDay,
    isAllDay,
    handleSubmit,
    submittedSuccessfully,
    clearForm,
  } = useOccurrenceForm({
    occurrenceId: id,
    allDay,
  });

  const articleRef = useClickOutside<HTMLDivElement>(() => setModalOpen(false));

  const showRightClass = showRightContainer
    ? ' c-occurrence-card--show-desc'
    : '';

  const handleDesc = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowDesc((prev) => !prev);
    if (!isEvent) setShowRightContainer((prev) => !prev);
  };

  const { refs } = useFloating({
    open: modalOpen,
    middleware: [autoPlacement()],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    if (submittedSuccessfully) {
      setModalOpen((prev) => !prev);
      clearForm();
    }
  }, [submittedSuccessfully]);

  return (
    <div className="c-occurrence-card-wrapper" ref={articleRef}>
      <article
        className={`c-occurrence-card${showRightClass}`}
        onClick={() => setModalOpen((prev) => !prev)}
        ref={refs.setReference}
      >
        <div
          className={`c-occurrence-card__left-container c-occurrence-card__left-container--${category}`}
        >
          <div>
            <div className="c-occurrence-card__left-container__title-container">
              {desc && isEvent && !titleEditMode && (
                <button onClick={handleDesc}>
                  <NoteIcon />
                </button>
              )}
              {titleEditMode && (
                <textarea
                  placeholder={title}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={handleTitleUpdateOnKeyDown}
                  ref={titleRef}
                  defaultValue={title}
                  onBlur={handleTitleUpdateOnBlur}
                  maxLength={50}
                  rows={3}
                  autoFocus
                />
              )}
              {!titleEditMode && (
                <h3
                  className="c-occurrence-card__left-container__title-container__title"
                  onClick={handleTitleEditMode}
                >
                  {title}
                </h3>
              )}
            </div>
            {showDesc && desc && isEvent && (
              <>
                <Divider />
                <p className="c-occurrence-card__left-container__desc">
                  {desc}
                </p>
              </>
            )}
            <div className="c-occurrence-card__left-container__datetime-container">
              <span className="c-occurrence-card__left-container__datetime-container__date">
                {formatDate(dateOfOccurrence)}
              </span>
              {startTime && endTime && (
                <span className="c-occurrence-card__left-container__datetime-container__time">
                  {formatHour(dateOfOccurrence, startTime, is24Hour)} -{' '}
                  {formatHour(dateOfOccurrence, endTime, is24Hour)}
                </span>
              )}
            </div>
            {!isEvent && (
              <div className="c-occurrence-card__left-container__countup">
                <span className="c-occurrence-card__left-container__countup__num">
                  26
                </span>
                <span className="c-occurrence-card__left-container__countup__ext">
                  days
                </span>
              </div>
            )}
            {!isEvent && desc && (
              <button
                className="c-occurrence-card__left-container__desc-btn"
                onClick={handleDesc}
              >
                <DocumentTextIcon />
              </button>
            )}
          </div>
          <div className="c-occurrence-card__left-container__category-icon">
            <CategoryIcon category={category} />
          </div>
        </div>
        {showRightContainer && (
          <div className="c-occurrence-card__right-container">
            {isEvent && <Countdown dateToEvent={dateOfOccurrence} />}
            {showDesc && desc && !isEvent && (
              <p className="c-occurrence-card__right-container__desc">{desc}</p>
            )}
          </div>
        )}
        <div className="c-occurrence-card__checkbox-container">
          <input
            onClick={(e) => e.stopPropagation()}
            type="checkbox"
            onChange={(e) => (e.target.checked ? onSelect() : onDeselect())}
          />
        </div>
      </article>

      {modalOpen && (
        <>
          {/* eslint-disable react-hooks/refs -- false positive refs.setFloating floating-ui */}
          <DynamicModal
            ref={refs.setFloating}
            onClick={(e) => e.stopPropagation()}
          >
            <form
              className="c-occurrence-card__edit-form"
              onSubmit={handleSubmit}
            >
              <span className="c-occurrence-card__edit-form__title">
                Edit <span>{title}</span>
              </span>
              {/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */}
              <textarea
                className="c-occurrence-card__edit-form__desc"
                placeholder={desc || 'Description...'}
                ref={descRef}
                maxLength={250}
                rows={4}
                defaultValue={desc ?? 'Description...'}
              />
              {/* eslint-enable @typescript-eslint/prefer-nullish-coalescing */}
              <select defaultValue={category} ref={categoryRef}>
                <option value="" disabled>
                  Choose a category
                </option>
                {Object.values(OccurrenceCategoryEnum).map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
              <div className="c-occurrence-card__edit-form__date-wrapper">
                <input
                  type="date"
                  defaultValue={formatDateForInput(dateOfOccurrence)}
                  ref={dateOfOccurrenceRef}
                />
                <div className="c-occurrence-card__edit-form__all-day">
                  <input
                    name="all-day"
                    type="checkbox"
                    onChange={handleAllDay}
                    defaultChecked={allDay}
                  />
                  <label htmlFor="all-day">All day</label>
                </div>
              </div>
              {!isAllDay && (
                <div className="c-occurrence-card__edit-form__times">
                  <input
                    type="time"
                    ref={startTimeRef}
                    defaultValue={startTime ?? '00:00'}
                  />
                  <input
                    type="time"
                    ref={endTimeRef}
                    defaultValue={endTime ?? '00:00'}
                  />
                </div>
              )}
              <DefaultButton type="submit">Save</DefaultButton>
            </form>
          </DynamicModal>
          {/* eslint-enable react-hooks/refs */}
        </>
      )}
    </div>
  );
};

export default OccurrenceCard;
