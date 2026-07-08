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

interface CountdownCardProps {
  title: string;
  date: Date;
  desc?: string;
  bgColor: string;
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

const CountdownCard = ({ title, date, desc, bgColor }: CountdownCardProps) => {
  const [showDesc, setShowDesc] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const articleRef = useClickOutside<HTMLElement>(() => setModalOpen(false));

  return (
    <article
      className="c-countdown-card"
      onClick={() => setModalOpen((prev) => !prev)}
      ref={articleRef}
    >
      <div style={{ backgroundColor: bgColor || '#ffd7f6' }}>
        <div>
          <div className="c-countdown-card__title-container">
            <h3
              className={`c-countdown-card__title c-countdown-card__title--${showDesc ? 'desc-shown' : 'desc-hidden'}`}
            >
              {title}
            </h3>
            {desc && (
              <button onClick={() => setShowDesc((prev) => !prev)}>
                <NoteIcon />
              </button>
            )}
          </div>
          {showDesc && desc && <p className="c-countdown-card__desc">{desc}</p>}
          <span className="c-countdown-card__date">{formatDate(date)}</span>
        </div>
      </div>
      <div
        className="c-countdown-card__counting-container"
        style={{ backgroundColor: bgColor || '#ffd7f680' }}
      >
        <CountingOfDays dateToEvent={date} />
      </div>
      <div className="c-countdown-card__checkbox-container">
        <input type="checkbox" />
      </div>

      {modalOpen && (
        <div className="c-countdown-card__modal">
          <span>Edit {title}</span>
          <input placeholder="Description..." />
          <input type="date" />
        </div>
      )}
    </article>
  );
};

export default CountdownCard;
