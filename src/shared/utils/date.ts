export const parseDate = (value: string): Date | null => {
  if (!value) return null;

  const match = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(value.trim());

  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  )
    return null;

  return date;
};

export const toMidnight = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());
