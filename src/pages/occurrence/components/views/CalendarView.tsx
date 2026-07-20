import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  startOfMonth,
  subMonths,
} from 'date-fns';

const getDaysOfTheMonth = (date: Date): Date[] => {
  const firstDay = startOfMonth(date);
  const endDay = endOfMonth(date);
  const dayOfTheWeekMonthStarts = getDay(firstDay);
  const dayOfTheWeekMonthEnds = getDay(endDay);
  const qntDaysOfNextMonth = 6 - dayOfTheWeekMonthEnds;

  const previousMonth = eachDayOfInterval({
    start: startOfMonth(subMonths(date, 1)),
    end: endOfMonth(subMonths(date, 1)),
  });

  const currentMonth = eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });

  const nextMonth = eachDayOfInterval({
    start: startOfMonth(addMonths(date, 1)),
    end: endOfMonth(addMonths(date, 1)),
  });

  const daysOfPreviousMonth = previousMonth.slice(
    previousMonth.length - dayOfTheWeekMonthStarts,
    previousMonth.length
  );

  const daysOfNextMonth = nextMonth.slice(0, qntDaysOfNextMonth);

  return daysOfPreviousMonth.concat(currentMonth).concat(daysOfNextMonth);
};

const getSunDays = () => {
  return Array(5).fill(1);
};

const getMonDays = () => {
  return Array(5).fill(1);
};

const getTueDays = () => {
  return Array(5).fill(1);
};
const getWedDays = () => {
  return Array(5).fill(1);
};
const getThuDays = () => {
  return Array(5).fill(1);
};
const getFriDays = () => {
  return Array(5).fill(1);
};

const getSatDays = () => {
  return Array(5).fill(1);
};

const CalendarView = () => {
  return (
    <div className="c-calendar-view">
      <div className="c-calendar-view__head">
        <div className="c-calendar-view__head__item">Sunday</div>
        <div className="c-calendar-view__head__item">Monday</div>
        <div className="c-calendar-view__head__item">Tuesday</div>
        <div className="c-calendar-view__head__item">Wednesday</div>
        <div className="c-calendar-view__head__item">Thursday</div>
        <div className="c-calendar-view__head__item">Friday</div>
        <div className="c-calendar-view__head__item">Saturday</div>
      </div>
      <div className="c-calendar-view__body">
        <div className="c-calendar-view__body__item">
          {getSunDays().map((d) => (
            <div>{d}</div>
          ))}
        </div>
        <div className="c-calendar-view__body__item">
          {getMonDays().map((d) => (
            <div>{d}</div>
          ))}
        </div>
        <div className="c-calendar-view__body__item">
          {getTueDays().map((d) => (
            <div>{d}</div>
          ))}
        </div>
        <div className="c-calendar-view__body__item">
          {getWedDays().map((d) => (
            <div>{d}</div>
          ))}
        </div>
        <div className="c-calendar-view__body__item">
          {getThuDays().map((d) => (
            <div>{d}</div>
          ))}
        </div>
        <div className="c-calendar-view__body__item">
          {getFriDays().map((d) => (
            <div>{d}</div>
          ))}
        </div>
        <div className="c-calendar-view__body__item">
          {getSatDays().map((d) => (
            <div>{d}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
