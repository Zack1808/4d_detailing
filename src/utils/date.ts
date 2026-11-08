const DMY = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;

export const parseDate = (value: string): Date | null => {
  if (!value) return null;

  const match = DMY.exec(value.trim());

  if (!match) return null;

  const [day, month, year] = [match[1], match[2], match[3]].map(Number);
  const date = new Date(year, month - 1, day);

  const isReal =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  return isReal ? date : null;
};

export const toMidnight = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const pad = (value: number) => String(value).padStart(2, "0");

export const formatDate = (date: Date) =>
  `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;

export const formatDateValue = (value: string) => {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? "-" : formatDate(date);
};

export const getTime = (value: string) => {
  const time = new Date(value).getTime();

  return Number.isNaN(time) ? 0 : time;
};
