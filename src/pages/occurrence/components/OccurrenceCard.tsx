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
import DefaultButton from '@/components/action/DefaultButton';
import { WeekDayEnum } from '@/enum/DayEnum';
import { type IOccurrence } from '@/types/Occurrence';

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
  const [modalOpen, setModalOpen] = useState(false);
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

  const articleRef = useClickOutside<HTMLDivElement>(() => setModalOpen(false));

  const showRightClass = showRightContainer
    ? ' c-occurrence-card--show-desc'
    : '';

  const handleDesc = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowDesc((prev) => !prev);
    if (!occurrence.isEvent) setShowRightContainer((prev) => !prev);
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
                  26
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
                Edit <span>{occurrence.title}</span>
              </span>
              {/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */}
              <textarea
                className="c-occurrence-card__edit-form__desc"
                placeholder={occurrence.desc || 'Description...'}
                ref={descRef}
                maxLength={250}
                rows={4}
                defaultValue={occurrence.desc ?? 'Description...'}
              />
              {/* eslint-enable @typescript-eslint/prefer-nullish-coalescing */}
              <select defaultValue={occurrence.category} ref={categoryRef}>
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
                  defaultValue={formatDateForInput(occurrence.dateOfOccurrence)}
                  ref={dateOfOccurrenceRef}
                />
                <div className="c-occurrence-card__edit-form__all-day">
                  <input
                    name="all-day"
                    id="all-day"
                    type="checkbox"
                    onChange={handleAllDay}
                    defaultChecked={occurrence.allDay}
                  />
                  <label htmlFor="all-day">All day</label>
                </div>
              </div>
              {!isAllDay && (
                <div className="c-occurrence-card__edit-form__times">
                  <input
                    type="time"
                    ref={startTimeRef}
                    defaultValue={occurrence.startTime ?? '00:00'}
                  />
                  <input
                    type="time"
                    ref={endTimeRef}
                    defaultValue={occurrence.endTime ?? '00:00'}
                  />
                </div>
              )}
              {!occurrence.isEvent && (
                <>
                  <div className="c-occurrence-card__edit-form__weekday-rep">
                    {Object.keys(WeekDayEnum).map((item) => (
                      <div key={item}>
                        <input
                          type="checkbox"
                          name="weekday-repetition"
                          ref={weekDayRepetitionRefs}
                          id={item}
                          value={item}
                          defaultChecked={occurrence.weekDayRepetition.some(
                            (wdr) => wdr === (item as WeekDayEnum)
                          )}
                        />
                        <label htmlFor={item}>{item}</label>
                      </div>
                    ))}
                  </div>
                  <div className="c-occurrence-card__edit-form__rep">
                    <span>Repeat every: </span>
                    <div>
                      <div>
                        <input
                          type="number"
                          id="repeat-week"
                          name="repeat-week"
                          defaultValue={occurrence.weekRepetition ?? 0}
                          min={0}
                          disabled={monthRepetition > 0}
                          onChange={(e) =>
                            handleWeekRepetition(parseInt(e.target.value))
                          }
                        />
                        <label htmlFor="repeat-week">week</label>
                      </div>
                      <div>
                        <input
                          type="number"
                          id="repeat-month"
                          name="repeat-month"
                          defaultValue={occurrence.monthRepetition ?? 0}
                          min={0}
                          disabled={weekRepetition > 0}
                          onChange={(e) =>
                            handleMonthRepetition(parseInt(e.target.value))
                          }
                        />
                        <label htmlFor="repeat-month">month</label>
                      </div>
                      <div>
                        <input
                          type="number"
                          id="repeat-year"
                          name="repeat-year"
                          defaultValue={occurrence.yearRepetition ?? 0}
                          min={0}
                          onChange={(e) =>
                            handleYearRepetition(parseInt(e.target.value))
                          }
                        />
                        <label htmlFor="repeat-year">year</label>
                      </div>
                    </div>
                  </div>
                  <div className="c-occurrence-card__edit-form__rep-space">
                    <span>Repetition space: </span>
                    <div>
                      <div>
                        <input
                          id="repeat-week-space"
                          name="repeat-week-space"
                          type="number"
                          defaultValue={occurrence.weekRepetitionSpace ?? 0}
                          min={0}
                          disabled={weekRepetitionSpace > 0}
                          onChange={(e) =>
                            handleWeekRepetitionSpace(parseInt(e.target.value))
                          }
                        />
                        <label htmlFor="repeat-week-space">week</label>
                      </div>
                      <div>
                        <input
                          id="repeat-month-space"
                          name="repeat-month-space"
                          type="number"
                          defaultValue={occurrence.monthRepetitionSpace ?? 0}
                          min={0}
                          disabled={monthRepetitionSpace > 0}
                          onChange={(e) =>
                            handleMonthRepetitionSpace(parseInt(e.target.value))
                          }
                        />
                        <label htmlFor="repeat-month-space">month</label>
                      </div>
                      <div>
                        <input
                          id="repeat-year-space"
                          name="repeat-year-space"
                          type="number"
                          defaultValue={occurrence.yearRepetitionSpace ?? 0}
                          min={0}
                          onChange={(e) =>
                            handleYearRepetitionSpace(parseInt(e.target.value))
                          }
                        />
                        <label htmlFor="repeat-year-space">year</label>
                      </div>
                    </div>
                  </div>
                  <div className="c-occurrence-card__edit-form__ends">
                    <span>When it ends: </span>
                    <div>
                      <input
                        type="radio"
                        name="ends"
                        onChange={() =>
                          handleEndsType(OccurrenceEndsTypeEnum.Never)
                        }
                        id="ends-never"
                        defaultChecked={
                          occurrence.endsType ===
                            OccurrenceEndsTypeEnum.Never || !occurrence.endsType
                        }
                      />
                      <label htmlFor="ends-never">
                        {OccurrenceEndsTypeEnum.Never}
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="ends"
                        id="ends-on"
                        defaultChecked={
                          occurrence.endsType === OccurrenceEndsTypeEnum.On
                        }
                        onChange={() =>
                          handleEndsType(OccurrenceEndsTypeEnum.On)
                        }
                      />
                      <label htmlFor="ends-on">
                        {OccurrenceEndsTypeEnum.On}
                      </label>
                      <input
                        type="date"
                        disabled={endsType !== OccurrenceEndsTypeEnum.On}
                        ref={endDateOfOccurrenceRef}
                        defaultValue={formatDateForInput(
                          occurrence.endDateOfOccurrence
                        )}
                      />
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="ends"
                        id="ends-after"
                        onChange={() =>
                          handleEndsType(OccurrenceEndsTypeEnum.After)
                        }
                        defaultChecked={
                          occurrence.endsType === OccurrenceEndsTypeEnum.After
                        }
                      />
                      <label htmlFor="ends-after">
                        {OccurrenceEndsTypeEnum.After}
                      </label>
                      <input
                        type="number"
                        defaultValue={occurrence.qntOccurrencesTillEnd ?? 0}
                        min={0}
                        name="qnt-occurrences"
                        id="qnt-occurrences"
                        ref={qntOccurrencesTillEndRef}
                        disabled={endsType !== OccurrenceEndsTypeEnum.After}
                      />
                      <label htmlFor="qnt-occurrences">occurrences</label>
                    </div>
                  </div>
                </>
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
