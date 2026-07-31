import { useCallback, useEffect, useMemo, useState } from 'react';
import NoteIcon from '@/components/display/icons/Note';
import { formatDate, formatHour } from '@/helpers/formatters/date';
import { differenceInCalendarDays } from 'date-fns';
import useClickOutside from '@/hooks/useClickOutside';
import DocumentTextIcon from '@/components/display/icons/DocumentText';
import DynamicModal from '@/components/display/DynamicModal';
import { useFloating, autoUpdate, autoPlacement } from '@floating-ui/react-dom';
import {
  OccurrenceCategoryEnum,
  OccurrenceEndsTypeEnum,
} from '@/enum/OccurrenceEnum';
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
import { type IOccurrence } from '@/types/Occurrence';
import OccurrenceEdit from './OccurrenceEdit';
import useOccurrenceDateStore from '@/store/occurrenceDateStore';

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
  onSelect,
  onDeselect,
  occurrence,
  is24Hour,
}: {
  onSelect: () => void;
  onDeselect: () => void;
  occurrence: IOccurrence;
  is24Hour: boolean;
}) => {
  const [showDesc, setShowDesc] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [optionsMenuModalOpen, setOptionsMenuModalOpen] = useState(false);
  const [showRightContainer, setShowRightContainer] = useState(
    occurrence.isEvent ? true : false
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
    weekDayRepetitionRefs,
    monthRepetition,
    weekRepetition,
    handleMonthRepetition,
    handleWeekRepetition,
    handleYearRepetition,
    handleMonthRepetitionSpace,
    handleWeekRepetitionSpace,
    handleYearRepetitionSpace,
    monthRepetitionSpace,
    weekRepetitionSpace,
    endsType,
    handleEndsType,
    qntOccurrencesTillEndRef,
    endDateOfOccurrenceRef,
  } = useOccurrenceForm({
    occurrenceId: occurrence.id,
    allDay: occurrence.allDay,
    isEvent: occurrence.isEvent,
    endsTypeDefault: occurrence.endsType ?? OccurrenceEndsTypeEnum.Never,
    monthRepetitionDefault: occurrence.monthRepetition ?? 0,
    monthRepetitionSpaceDefault: occurrence.monthRepetitionSpace ?? 0,
    weekRepetitionDefault: occurrence.weekRepetition ?? 0,
    weekRepetitionSpaceDefault: occurrence.weekRepetitionSpace ?? 0,
    yearRepetitionDefault: occurrence.yearRepetition ?? 0,
    yearRepetitionSpaceDefault: occurrence.yearRepetitionSpace ?? 0,
  });

  const { getCompletedOccurrenceDates } = useOccurrenceDateStore();

  const articleRef = useClickOutside<HTMLDivElement>(() => {
    setEditModalOpen(false);
    setOptionsMenuModalOpen(false);
  });

  const showRightClass = showRightContainer
    ? ' c-occurrence-card--show-desc'
    : '';

  const handleDesc = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowDesc((prev) => !prev);
    if (!occurrence.isEvent) setShowRightContainer((prev) => !prev);
  };

  const { refs: editModalRefs } = useFloating({
    open: editModalOpen,
    middleware: [autoPlacement()],
    whileElementsMounted: autoUpdate,
  });

  const { refs: optionsMenuModalRefs } = useFloating({
    open: optionsMenuModalOpen,
    middleware: [autoPlacement()],
    whileElementsMounted: autoUpdate,
  });

  const setReference = useCallback(
    (node: HTMLElement | null) => {
      editModalRefs.setReference(node);
      optionsMenuModalRefs.setReference(node);
    },
    [editModalRefs, optionsMenuModalRefs]
  );

  const completedDays = useMemo(() => {
    const completed = getCompletedOccurrenceDates(occurrence.id);
    return completed.length;
  }, [occurrence.id]);

  useEffect(() => {
    if (submittedSuccessfully) {
      setEditModalOpen((prev) => !prev);
      clearForm();
    }
  }, [submittedSuccessfully]);

  return (
    <div className="c-occurrence-card-wrapper" ref={articleRef}>
      <article
        className={`c-occurrence-card${showRightClass}`}
        onContextMenu={(e) => {
          e.preventDefault();
          setEditModalOpen(false);
          setOptionsMenuModalOpen((prev) => !prev);
        }}
        onClick={() => {
          setOptionsMenuModalOpen(false);
          setEditModalOpen((prev) => !prev);
        }}
        ref={setReference}
      >
        <div
          className={`c-occurrence-card__left-container c-occurrence-card__left-container--${occurrence.category}`}
        >
          <div>
            <div className="c-occurrence-card__left-container__title-container">
              {occurrence.desc && occurrence.isEvent && !titleEditMode && (
                <button onClick={handleDesc}>
                  <NoteIcon />
                </button>
              )}
              {titleEditMode && (
                <textarea
                  placeholder={occurrence.title}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={handleTitleUpdateOnKeyDown}
                  ref={titleRef}
                  defaultValue={occurrence.title}
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
                  {occurrence.title}
                </h3>
              )}
            </div>
            {showDesc && occurrence.desc && occurrence.isEvent && (
              <>
                <Divider />
                <p className="c-occurrence-card__left-container__desc">
                  {occurrence.desc}
                </p>
              </>
            )}
            <div className="c-occurrence-card__left-container__datetime-container">
              <span className="c-occurrence-card__left-container__datetime-container__date">
                {formatDate(occurrence.dateOfOccurrence)}
              </span>
              {occurrence.startTime && occurrence.endTime && (
                <span className="c-occurrence-card__left-container__datetime-container__time">
                  {formatHour(
                    occurrence.dateOfOccurrence,
                    occurrence.startTime,
                    is24Hour
                  )}{' '}
                  -{' '}
                  {formatHour(
                    occurrence.dateOfOccurrence,
                    occurrence.endTime,
                    is24Hour
                  )}
                </span>
              )}
            </div>
            {!occurrence.isEvent && (
              <div className="c-occurrence-card__left-container__countup">
                <span className="c-occurrence-card__left-container__countup__num">
                  {completedDays}
                </span>
                <span className="c-occurrence-card__left-container__countup__ext">
                  days
                </span>
              </div>
            )}
            {!occurrence.isEvent && occurrence.desc && (
              <button
                className="c-occurrence-card__left-container__desc-btn"
                onClick={handleDesc}
              >
                <DocumentTextIcon />
              </button>
            )}
          </div>
          <div className="c-occurrence-card__left-container__category-icon">
            <CategoryIcon category={occurrence.category} />
          </div>
        </div>
        {showRightContainer && (
          <div className="c-occurrence-card__right-container">
            {occurrence.isEvent && (
              <Countdown dateToEvent={occurrence.dateOfOccurrence} />
            )}
            {showDesc && occurrence.desc && !occurrence.isEvent && (
              <p className="c-occurrence-card__right-container__desc">
                {occurrence.desc}
              </p>
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

      {editModalOpen && (
        <>
          {/* eslint-disable react-hooks/refs -- false positive refs.setFloating floating-ui */}
          <DynamicModal
            ref={editModalRefs.setFloating}
            onClick={(e) => e.stopPropagation()}
            className="c-occurrence-card-wrapper__edit-modal"
          >
            <OccurrenceEdit
              occurrence={occurrence}
              categoryRef={categoryRef}
              dateOfOccurrenceRef={dateOfOccurrenceRef}
              descRef={descRef}
              endDateOfOccurrenceRef={endDateOfOccurrenceRef}
              endTimeRef={endTimeRef}
              endsType={endsType}
              handleAllDay={handleAllDay}
              handleEndsType={handleEndsType}
              handleMonthRepetition={handleMonthRepetition}
              handleYearRepetition={handleYearRepetition}
              handleWeekRepetition={handleWeekRepetition}
              handleWeekRepetitionSpace={handleWeekRepetitionSpace}
              handleYearRepetitionSpace={handleYearRepetitionSpace}
              handleMonthRepetitionSpace={handleMonthRepetitionSpace}
              handleSubmit={handleSubmit}
              isAllDay={isAllDay}
              monthRepetition={monthRepetition}
              weekRepetition={weekRepetition}
              weekRepetitionSpace={weekRepetitionSpace}
              monthRepetitionSpace={monthRepetitionSpace}
              qntOccurrencesTillEndRef={qntOccurrencesTillEndRef}
              startTimeRef={startTimeRef}
              weekDayRepetitionRefs={weekDayRepetitionRefs}
            />
          </DynamicModal>
          {/* eslint-enable react-hooks/refs */}
        </>
      )}

      {optionsMenuModalOpen && (
        <>
          {/* eslint-disable react-hooks/refs -- false positive refs.setFloating floating-ui */}
          <DynamicModal
            className="c-occurrence-card-wrapper__options-menu-modal"
            ref={optionsMenuModalRefs.setFloating}
            onClick={(e) => e.stopPropagation()}
          >
            <div>Options menu</div>
          </DynamicModal>
          {/* eslint-enable react-hooks/refs */}
        </>
      )}
    </div>
  );
};

export default OccurrenceCard;
