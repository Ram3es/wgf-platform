export const COLORS = {
  default: '#333',
  white: '#FFF',
  black: '#000',
  grey: '#888281',
  greyLite: '#F2F2F3',
  authBg: '#F2F2F2',
  backdropBg: '#F1F1F2',
  green: '#00A651',
  greenLite: '#8DC63F',
  red: '#FF000E',
  yellow: '#FFD530',
  pink: '#EF60A2',
  blue: '#00AEEF',
  liteBlue: '#2693e6',
  violet: '#5448A9',
  bgGrey: '#f2f2f3',
  line: '#A7A9AC',

  levelResult: {
    Low: '#F664C5',
    Moderate: '#FBB040',
    High: '#10D83C',
  },
};

export type TLevelResult = keyof typeof COLORS.levelResult;
