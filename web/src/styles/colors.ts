export const COLORS = {
  default: '#333',
  white: '#FFF',
  black: '#000',
  borderGrey: '#fef79d',
  borderGreyLite: '#ccc',
  grey: '#888281',
  greyLite: '#F2F2F3',
  authBg: '#F2F2F2',
  backdropBg: '#F1F1F2',
  green: '#00A651',
  greenLite: '#8DC63F',
  red: '#FF000E',
  yellow: '#FFD530',
  pink: '#EF60A2',
  liteBlue: '#00AEEF',
  blue: '#2693e6',
  violet: '#5448A9',
  violetLite: '#7f3f98',
  bgGrey: '#f2f2f3',
  line: '#A7A9AC',
  orange: '#FAB141',
  redLite: '#f16707',
  pinkDark: '#DA1C5C',
  blueDark: '#4B6FAC',
  ocean: '#00ACC5',
  sectionBg: '#F6F6F6',
  inputRange: '#e2e6de',

  levelResult: {
    Low: '#F664C5',
    Moderate: '#FBB040',
    High: '#10D83C',
  },
};

export type TLevelResult = keyof typeof COLORS.levelResult;
