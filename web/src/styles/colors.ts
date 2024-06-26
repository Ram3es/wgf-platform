export const COLORS = {
  default: '#333',
  white: '#FFF',
  black: '#000',
  iconBlack: '#0B1836',
  borderGrey: '#fef79d',
  borderGreyLight: '#ccc',
  dark: '#525252',
  grey: '#888281',
  greyLight: '#F2F2F3',
  greyResult: '#f2f1f3',
  greyImportance: '#f5f5f5',
  authBg: '#F2F2F2',
  backdropBg: '#F1F1F2',
  green: '#00A651',
  greenLight: '#8DC63F',
  red: '#FF000E',
  redDark: '#F05',
  yellow: '#FFD530',
  yellowLight: '#fef497',
  pink: '#EF60A2',
  lightBlue: '#00AEEF',
  blue: '#2693e6',
  violet: '#5448A9',
  violetLight: '#7f3f98',
  bgGrey: '#f2f2f3',
  line: '#A7A9AC',
  orange: '#FAB141',
  redLight: '#f16707',
  pinkDark: '#DA1C5C',
  blueDark: '#4B6FAC',
  blueImportance: '#337ab7',
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
