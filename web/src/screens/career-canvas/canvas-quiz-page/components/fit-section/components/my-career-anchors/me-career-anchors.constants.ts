import { RANGE_HASH_MAPS } from '@screens/career-canvas/career-canvas.constants';

export const reverseRangeHashMap = () => {
  const result: { [key: string]: string } = {};

  Object.entries(RANGE_HASH_MAPS).forEach(([key, value]) => {
    result[value] = key;
  });

  return result;
};
