import getTimesOfDay from './getTimesOfDay';

interface TimeOfDayComplete extends TimeOfDay {
  time: string;
}

const getTimeOfDay = (): TimeOfDayComplete => {
  const now = new Date();
  const timeNow = now.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const period = timeNow.toString().split(' ')[1];
  const time = parseInt(timeNow.toString().split(':')[0]);

  const timesOfDay = getTimesOfDay();
  const timeExtense = `${time}${period}`;

  switch (true) {
    case time >= 6 && period === 'AM':
      return {
        ...timesOfDay.morning,
        time: timeExtense,
      };
    case (time >= 12 || time <= 6) && period === 'PM':
      return {
        ...timesOfDay.afternoon,
        time: timeExtense,
      };
    case time > 6 && time < 8 && period === 'PM':
      return {
        ...timesOfDay.sunset,
        time: timeExtense,
      };
    case time >= 8 && period === 'PM':
      return {
        ...timesOfDay.night,
        time: timeExtense,
      };
    case time >= 12 && period === 'AM':
      return {
        ...timesOfDay.dawn,
        time: timeExtense,
      };
    default:
      return {
        ...timesOfDay.morning,
        time: timeExtense,
      };
  }
};

export default getTimeOfDay;
