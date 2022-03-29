import { ISortedObj, IState, uniqueAptitude } from './../constants';
export const getScoreApptitude = (data: ISortedObj[]) => {
  const container = [];

  const highest = data[0].sub + ' ' + data[1].sub;
  container.push(`${highest}:(${data[0].score},${data[1].score})`);

  if (data[1].score === data[2].score) {
    const secondary = data[0].sub + ' ' + data[2].sub;
    container.push(`${secondary}:(${data[0].score},${data[2].score}`);
  }
  return container;
};

export const aptitudeReducer = (actions: string[]) => {
  const state: IState = {
    PCM: 0,
    PCB: 0,
    HUM: 0,
    CWM: 0,
    CWOM: 0,
  };

  const alfabetize = actions.map((element) => {
    return element.split(':')[0].split(' ').sort().join(' ');
  });

  alfabetize.forEach((key) => {
    const value = uniqueAptitude[key];

    state[value[0]]++;
    value.length > 1 && state[value[1]]++;
  });
  return [state, actions];
};
