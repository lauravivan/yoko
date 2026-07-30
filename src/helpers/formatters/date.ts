export function formatDate(date: Date): string {
  const validDate = new Date(date);

  const isUTCMidnight =
    validDate.getUTCHours() === 0 &&
    validDate.getUTCMinutes() === 0 &&
    validDate.getUTCSeconds() === 0;

  // If the date is UTC midnight, build a new local Date using UTC parts
  // to avoid the timezone shift (e.g. day 30 showing as day 29)
  const safeDate = isUTCMidnight
    ? new Date(
        validDate.getUTCFullYear(),
        validDate.getUTCMonth(),
        validDate.getUTCDate()
      )
    : validDate;

  const parts = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).formatToParts(safeDate);

  const getPart = (type: string) => parts.find((p) => p.type === type)?.value;

  return `${getPart('weekday')}, ${getPart('day')} ${getPart('month')} ${getPart('year')}`;
}

export function formatDateForInput(date: Date): string {
  const validDate = new Date(date);
  const isUTCMidnight =
    validDate.getUTCHours() === 0 &&
    validDate.getUTCMinutes() === 0 &&
    validDate.getUTCSeconds() === 0;

  const year = isUTCMidnight
    ? validDate.getUTCFullYear()
    : validDate.getFullYear();
  const month = isUTCMidnight
    ? validDate.getUTCMonth() + 1
    : validDate.getMonth() + 1;
  const day = isUTCMidnight ? validDate.getUTCDate() : validDate.getDate();

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function formatHour(
  date: Date,
  time: string,
  is24Hour: boolean
): string {
  const validDate = new Date(date);
  const hour = time.slice(0, 2);
  const minute = time.slice(3, 5);

  validDate.setHours(parseInt(hour), parseInt(minute));

  const isUTCMidnight =
    validDate.getUTCHours() === 0 &&
    validDate.getUTCMinutes() === 0 &&
    validDate.getUTCSeconds() === 0;

  // If the date is UTC midnight, build a new local Date using UTC parts
  // to avoid the timezone shift (e.g. day 30 showing as day 29)
  const safeDate = isUTCMidnight
    ? new Date(
        validDate.getUTCFullYear(),
        validDate.getUTCMonth(),
        validDate.getUTCDate()
      )
    : validDate;

  const parts = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: is24Hour,
  }).formatToParts(safeDate);

  const getPart = (type: string) => parts.find((p) => p.type === type)?.value;

  let formatted = `${getPart('hour')}:${getPart('minute')}`;

  if (is24Hour) formatted += ` ${getPart('dayPeriod')}`;

  return formatted;
}
