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

interface CountingCardProps {
  title: string;
  date: Date;
  desc?: string;
  bgColor: string;
  onSelect: () => void;
  onDeselect: () => void;
  isCountdown?: boolean;
}

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

const CountingCard = ({
  title,
  date,
  desc,
  bgColor,
  onSelect,
  onDeselect,
  isCountdown = true,
}: CountingCardProps) => {
  const [showDesc, setShowDesc] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showRightContainer, setShowRightContainer] = useState(
    isCountdown ? true : false
  );

  const articleRef = useClickOutside<HTMLElement>(() => setModalOpen(false));

  const baseClass = isCountdown ? 'c-countdown-card' : 'c-countup-card';
  const showRightClass = showRightContainer ? ' c-countup-card--show-desc' : '';

  const handleDesc = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowDesc((prev) => !prev);
    if (!isCountdown) setShowRightContainer((prev) => !prev);
  };

  return (
    <article
      className={`${baseClass}${showRightClass}`}
      onClick={() => setModalOpen((prev) => !prev)}
      ref={articleRef}
    >
      <div
        className={`${baseClass}__left-container`}
        style={{ backgroundColor: bgColor || '#ffd7f6' }}
      >
        <div>
          <div className={`${baseClass}__title-container`}>
            <h3
              className={`${baseClass}__title ${baseClass}__title--${showDesc ? 'desc-shown' : 'desc-hidden'}`}
            >
              {title}
            </h3>
            {desc && isCountdown && (
              <button onClick={handleDesc}>
                <NoteIcon />
              </button>
            )}
          </div>
          {showDesc && desc && isCountdown && (
            <p className={`c-countdown-card__desc`}>{desc}</p>
          )}
          <span className={`${baseClass}__date`}>{formatDate(date)}</span>
          {!isCountdown && (
            <div className="c-countup-card__countup">
              <span className="c-countup-card__countup__num">26</span>
              <span className="c-countup-card__countup__ext">days</span>
            </div>
          )}
          {!isCountdown && desc && (
            <button className="c-countup-card__desc-btn" onClick={handleDesc}>
              <DocumentTextIcon />
            </button>
          )}
        </div>
      </div>
      {showRightContainer && (
        <div
          className={`${baseClass}__right-container`}
          style={{ backgroundColor: bgColor || '#ffd7f680' }}
        >
          {isCountdown && <CountingOfDays dateToEvent={date} />}
          {showDesc && desc && !isCountdown && (
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

      {modalOpen && (
        <div className={`${baseClass}__modal`}>
          <span>Edit {title}</span>
          <input placeholder="Description..." />
          <input type="date" />
        </div>
      )}
    </article>
  );
};

export default CountingCard;
