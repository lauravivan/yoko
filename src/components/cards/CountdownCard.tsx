import { formatDate } from '@/util/date/formatDate';
import { useState } from 'react';
import NoteIcon from '@/components/display/icons/Note';

interface CountdownCardProps {
  title: string;
  date: Date;
  desc?: string;
  bgColor: string;
}

const CountdownCard = ({ title, date, desc, bgColor }: CountdownCardProps) => {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <article className="c-countdown-card">
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
        <span>
          Already <br /> happened
        </span>
      </div>
      <div className="c-countdown-card__checkbox-container">
        <input type="checkbox" />
      </div>
    </article>
  );
};

export default CountdownCard;
