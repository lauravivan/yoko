export function formatDate(date: Date): string {
  const dateUTCString = date.toUTCString();
  const dateUTCStringSplit = dateUTCString.split(' ');
  const dayOfWeek = dateUTCStringSplit[0];
  const day = dateUTCStringSplit[1];
  const month = dateUTCStringSplit[2];
  const year = dateUTCStringSplit[3];

  return `${dayOfWeek} ${day} ${month} ${year}`;
}
