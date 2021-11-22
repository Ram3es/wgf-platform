export const RANGE_HASH_MAPS: Record<string, string> = {
  ['Not Important']: '1',
  ['Slightly Important']: '2',
  ['Moderately Important']: '3',
  ['Important']: '4',
  ['Very Important']: '5',
};

export const reverseRangeHashMap = () => {
  const result: { [key: string]: string } = {};

  Object.entries(RANGE_HASH_MAPS).forEach(([key, value]) => {
    result[value] = key;
  });

  return result;
};
