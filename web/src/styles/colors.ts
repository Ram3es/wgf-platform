export const COLORS = {
  default: '#333',
  white: '#FFF',
  black: '#000',
  grey: '#888281',
  greyLite: '#F2F2F3',
  green: '#00A651',
  greenLite: '#8DC63F',
  red: '#DF0003',
  yellow: '#FFD530',
  pink: '#EF60A2',
  blue: '#00AEEF',
  violet: '#5448A9',
  bgGrey: '#f2f2f3',

  levelResult: {
    Low: '#F664C5',
    Moderate: '#FBB040',
    High: '#10D83C',
  },
};

export type TLevelResult = keyof typeof COLORS.levelResult;
