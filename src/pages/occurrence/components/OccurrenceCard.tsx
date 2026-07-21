import { useRef, useState } from 'react';
import NoteIcon from '@/components/display/icons/Note';
import { formatDate, formatDateForInput } from '@/helpers/formatters/date';
import {
  addMonths,
  addYears,
  differenceInCalendarDays,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';
import useClickOutside from '@/hooks/useClickOutside';
import DocumentTextIcon from '@/components/display/icons/DocumentText';
import DynamicModal from '@/components/display/DynamicModal';
import { useFloating, autoUpdate, autoPlacement } from '@floating-ui/react-dom';
import { OccurrenceCategoryEnum } from '@/enum/OccurrenceEnum';
import PersonalIcon from '@/components/display/icons/categories/Personal';
import WorkIcon from '@/components/display/icons/categories/Work';
import Divider from '@/components/utils/Divider';
import useOccurrenceForm from '../hooks/useOccurrenceForm';

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

const CountingOfDays = ({ dateToEvent }: { dateToEvent: Date }) => {
  const difference = differenceInCalendarDays(
    new Date(dateToEvent).setHours(23, 59),
    new Date().setHours(0, 1)
  );

  const happened = difference < 0 && (
    <span>
      Already <br /> happened
    </span>
  );
  const today = difference === 0 && <span>It's today!!</span>;
  const oneDay = difference > 0 && (
    <span>
      In {difference} {difference === 1 ? 'day' : 'days'}{' '}
    </span>
  );

  return happened || today || oneDay;
};

const CategoryIcon = ({ category }: { category: OccurrenceCategoryEnum }) => {
  if (category === OccurrenceCategoryEnum.Personal) return <PersonalIcon />;
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
  startDate,
}: {
  id: string;
  title: string;
  desc: string | null;
  category: OccurrenceCategoryEnum;
  onSelect: () => void;
  onDeselect: () => void;
  isEvent: boolean;
  startDate: Date;
}) => {
  const [showDesc, setShowDesc] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showRightContainer, setShowRightContainer] = useState(
    isEvent ? true : false
  );

  const {
    handleDescUpdateOnKeyDown,
    handleTitleEditMode,
    handleTitleUpdateOnBlur,
    handleTitleUpdateOnKeyDown,
    descRef,
    titleRef,
    handleDescUpdateOnBlur,
    titleEditMode,
    handleStartDateUpdateOnBlur,
    handleCategoryUpdateOnBlur,
  } = useOccurrenceForm({ occurrenceId: id });

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
            <div
              className={`c-occurrence-card__left-container__title-container`}
            >
              {titleEditMode && (
                <input
                  className={`c-occurrence-card__left-container__title-container__input c-occurrence-card__left-container__title-container__title--${showDesc ? 'desc-shown' : 'desc-hidden'}`}
                  placeholder={title}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={handleTitleUpdateOnKeyDown}
                  ref={titleRef}
                  defaultValue={title}
                  onBlur={handleTitleUpdateOnBlur}
                  maxLength={50}
                  title={title}
                />
              )}
              {!titleEditMode && (
                <h3
                  className={`c-occurrence-card__left-container__title-container__title c-occurrence-card__left-container__title-container__title--${showDesc ? 'desc-shown' : 'desc-hidden'}`}
                  onClick={handleTitleEditMode}
                >
                  {title}
                </h3>
              )}
              {desc && isEvent && !titleEditMode && (
                <button onClick={handleDesc}>
                  <NoteIcon />
                </button>
              )}
            </div>
            {showDesc && desc && isEvent && (
              <>
                <Divider />
                <p className={`c-occurrence-card__left-container__desc`}>
                  {desc}
                </p>
              </>
            )}
            <span className={`c-occurrence-card__left-container__date`}>
              {formatDate(startDate)}
            </span>
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
          <div className={`c-occurrence-card__left-container__category-icon`}>
            <CategoryIcon category={category} />
          </div>
        </div>
        {showRightContainer && (
          <div className={`c-occurrence-card__right-container`}>
            {isEvent && <CountingOfDays dateToEvent={startDate} />}
            {showDesc && desc && !isEvent && (
              <p className={`c-occurrence-card__right-container__desc`}>
                {desc}
              </p>
            )}
          </div>
        )}
        <div className={`c-occurrence-card__checkbox-container`}>
          <input
            onClick={(e) => e.stopPropagation()}
            type="checkbox"
            onChange={(e) => (e.target.checked ? onSelect() : onDeselect())}
          />
        </div>
      </article>

      {modalOpen && (
        <DynamicModal
          ref={refs.setFloating}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={`c-dynamic-modal__title`}>
            Edit <span>{title}</span>
          </span>
          <textarea
            className={`c-dynamic-modal__desc`}
            placeholder={desc ? desc : 'Description...'}
            onKeyDown={handleDescUpdateOnKeyDown}
            onBlur={handleDescUpdateOnBlur}
            ref={descRef}
            maxLength={250}
            rows={4}
            defaultValue={desc ? desc : 'Description...'}
          />
          <input
            className={`c-dynamic-modal__date`}
            type="date"
            onBlur={handleStartDateUpdateOnBlur}
            defaultValue={formatDateForInput(startDate)}
          />
          <select onChange={handleCategoryUpdateOnBlur}>
            <option disabled>Choose a category</option>
            {Object.values(OccurrenceCategoryEnum).map((occ) => (
              <option key={occ} value={occ}>
                {occ}
              </option>
            ))}
          </select>
        </DynamicModal>
      )}
    </div>
  );
};

export default OccurrenceCard;
