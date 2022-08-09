export const parseTimeInputValue = (value: string) => {
  const cortege = value.split(' ');

  let day = '';
  let hours = '';
  let minute = '';

  cortege.forEach((item) => {
    if (item.includes('d')) {
      day = item.split('d')[0];
    }
    if (item.includes('h')) {
      hours = item.split('h')[0];
    }
    if (item.includes('m')) {
      minute = item.split('m')[0];
    }
  });
  const totalSeconds = String(
    +day * 24 * 60 * 60 + +hours * 60 * 60 + +minute * 60
  );

  return totalSeconds;
};

export const convertToDayHourMinutes = (seconds: string) => {
  const cd = 24 * 60 * 60, // for ms need * 1000
    ch = 60 * 60; // for ms need * 1000

  let d = Math.floor(+seconds / cd),
    h = Math.floor((+seconds - d * cd) / ch),
    m = Math.round((+seconds - d * cd - h * ch) / 60);
  if (m === 60) {
    h++;
    m = 0;
  }
  if (h === 24) {
    d++;
    h = 0;
  }
  return [d ? d + 'd' : null, h ? h + 'h' : null, m ? m + 'm' : null].join(' ');
};
