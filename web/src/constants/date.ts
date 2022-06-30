export const DATE_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  timeZone: 'UTC',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  timeZone: 'UTC',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

export const TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  timeZone: 'UTC',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

export const exp30days = () => {
  const today = new Date();
  const priorDate = new Date(
    new Date().setDate(today.getDate() + 30)
  ).toLocaleDateString('en-US', DATE_OPTIONS);
  return priorDate;
};
