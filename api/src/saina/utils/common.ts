import { IState } from './../constants';
import { AnswerEntity } from '../../answer/entities/answer.entity';
import { ISubcategoryObj } from '../constants';

export type TResultSection = IState | string[];

export const scoreSubcategory = (data: AnswerEntity[]) => {
  const subCategObj = data.reduce((acc: ISubcategoryObj, answer) => {
    const { subcategory, type } = answer.question;
    subcategory.trim();

    if (type === 'test') {
      if (acc[subcategory]) {
        acc[subcategory].score += Number(answer.isCorrect);
      } else {
        acc[subcategory] = {
          score: Number(answer.isCorrect),
          sub: subcategory,
        };
      }
    }
    if (type === 'single')
      if (acc[subcategory]) {
        acc[subcategory].score += +answer.value;
      } else {
        acc[subcategory] = {
          score: +answer.value,
          sub: subcategory,
        };
      }
    return acc;
  }, {});

  return Object.values(subCategObj).sort((a, b) => b.score - a.score);
};

export const sumSectionsResult = (
  a: TResultSection[],
  b: TResultSection[],
  c: TResultSection[]
) => {
  const container = {};
  for (const key of Object.keys(a[0])) {
    container[key] = 0;
    container[key] += a[0][key] + b[0][key] + c[0][key];
  }
  return container;
};

export const calcFinallResult = (result: IState) => {
  const sorted = Object.entries(result).sort(
    (a, b) => Number(b[1]) - Number(a[1])
  );
  if (sorted[0][1] > sorted[1][1] && sorted[1][1] === sorted[2][1]) {
    return sorted[0];
  } else {
    return [...sorted[0], ...sorted[1]];
  }
};
