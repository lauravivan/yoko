import { format } from "date-fns";

export const createUTCDate = (datePicked: string) => {
  const day = parseInt(datePicked.slice(8, 10));
  const month = parseInt(datePicked.slice(5, 7));
  const year = parseInt(datePicked.slice(0, 4));
  return new Date(Date.UTC(year, month - 1, day));
};

export const createUTCDateNow = () => {
  const currentDate = new Date();
  const now = format(currentDate, "yyyy-MM-dd");
  return createUTCDate(now);
};