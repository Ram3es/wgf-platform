import { ISortedObj, uniquePersonality } from './../constants';
import { IState } from '../constants';

export const getHighScore = (sorted: ISortedObj[]) => {
  const container = [];

  const higestSubcategory = sorted[0].sub + sorted[1].sub;
  container.push(`${higestSubcategory}(${sorted[0].score},${sorted[1].score})`);

  if (sorted[1].score === sorted[2].score) {
    const secondSubcategory = sorted[0].sub + sorted[2].sub;
    container.push(
      `${secondSubcategory}(${sorted[0].score},${sorted[2].score})`
    );
    if (sorted[0].score === sorted[1].score) {
      const thirdSubcategory = sorted[1].sub + sorted[2].sub;
      container.push(
        `${thirdSubcategory}(${sorted[1].score},${sorted[2].score})`
      );
    }
  }
  return container;
};

export const personalityReducer = (actions: string[]) => {
  const state: IState = {
    PCM: 0,
    PCB: 0,
    HUM: 0,
    CWM: 0,
    CWOM: 0,
  };
  const alfabetize = actions.map((item) =>
    item.substring(0, 2).split('').sort().join('')
  );

  alfabetize.forEach((key) => {
    const values = uniquePersonality[key];
    state[values[0]]++;
    state[values[1]]++;
  });
  return [state, actions];
};
