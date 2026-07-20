import { useState } from 'react';
import NoteIcon from '@/components/display/icons/Note';
import { formatDate } from '@/helpers/formatters/date';
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
import { OccurrenceCategoryEnum, OccurrenceEnum } from '@/enum/OccurrenceEnum';
import PersonalIcon from '@/components/display/icons/categories/Personal';
import WorkIcon from '@/components/display/icons/categories/Work';

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
    dateToEvent.setHours(23, 59),
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
  title,
  desc,
  onSelect,
  onDeselect,
  category,
  isEvent,
}: {
  title: string;
  desc?: string;
  category: OccurrenceCategoryEnum;
  onSelect: () => void;
  onDeselect: () => void;
  isEvent: boolean;
}) => {
  const [showDesc, setShowDesc] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showRightContainer, setShowRightContainer] = useState(
    isEvent ? true : false
  );

  const articleRef = useClickOutside<HTMLDivElement>(() => setModalOpen(false));

  const baseClass = isEvent ? 'c-countdown-card' : 'c-countup-card';
  const showRightClass = showRightContainer ? ' c-countup-card--show-desc' : '';

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
        className={`c-occurrence-card ${baseClass}${showRightClass}`}
        onClick={() => setModalOpen((prev) => !prev)}
        ref={refs.setReference}
      >
        <div
          className={`${baseClass}__left-container ${baseClass}__left-container--${category}`}
        >
          <div>
            <div className={`${baseClass}__title-container`}>
              <h3
                className={`${baseClass}__title ${baseClass}__title--${showDesc ? 'desc-shown' : 'desc-hidden'}`}
              >
                {title}
              </h3>
              {desc && isEvent && (
                <button onClick={handleDesc}>
                  <NoteIcon />
                </button>
              )}
            </div>
            {showDesc && desc && isEvent && (
              <p className={`c-countdown-card__desc`}>{desc}</p>
            )}
            {/* <span className={`${baseClass}__date`}>{formatDate(date)}</span> */}
            {!isEvent && (
              <div className="c-countup-card__countup">
                <span className="c-countup-card__countup__num">26</span>
                <span className="c-countup-card__countup__ext">days</span>
              </div>
            )}
            {!isEvent && desc && (
              <button className="c-countup-card__desc-btn" onClick={handleDesc}>
                <DocumentTextIcon />
              </button>
            )}
          </div>
          <div className={`${baseClass}__left-container__category-icon`}>
            <CategoryIcon category={category} />
          </div>
        </div>
        {showRightContainer && (
          <div className={`${baseClass}__right-container`}>
            {/* {isEvent && <CountingOfDays dateToEvent={date} />} */}
            {showDesc && desc && !isEvent && (
              <p className={`c-countup-card__desc`}>{desc}</p>
            )}
          </div>
        )}
        <div className={`${baseClass}__checkbox-container`}>
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
            placeholder="Description..."
          />
          <input className={`c-dynamic-modal__date`} type="date" />
          <select>
            <option disabled>Choose a category</option>
            {Object.values(OccurrenceCategoryEnum).map((occ) => (
              <option value={occ}>{occ}</option>
            ))}
          </select>
        </DynamicModal>
      )}
    </div>
  );
};

export default OccurrenceCard;
