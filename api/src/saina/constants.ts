export const SAINA_ROUTES = {
  main: 'saina',
  createStream: 'create-stream',
  createSubject: 'create-subject',
  getSainaResult: 'all-result',
};
export interface ISubcategoryObj {
  [key: string]: { score: number; sub: string };
}
export type ISortedObj = { score: number; sub: string };
export interface IState {
  [key: string]: number;
}

export const uniquePersonality = {
  AC: ['CWM', 'HUM'],
  AE: ['CWOM', 'HUM'],
  AI: ['PCB', 'HUM'],
  AR: ['PCM', 'HUM'],
  AS: ['CWOM', 'HUM'],
  CE: ['CWOM', 'CWM'],
  CI: ['PCB', 'CWM'],
  CR: ['CWM', 'PCM'],
  CS: ['CWM', 'HUM'],
  EI: ['PCB', 'CWM'],
  ER: ['PCM', 'CWM'],
  ES: ['CWOM', 'HUM'],
  IR: ['PCM', 'PCB'],
  IS: ['HUM', 'PCB'],
  RS: ['HUM', 'PCM'],
};
export const uniqueAptitude = {
  'Bodily-Kinesthetic Interpersonal': ['PCM', 'PCB'],
  'Bodily-Kinesthetic Intrapersonal': ['PCB'],
  'Bodily-Kinesthetic Linguistic': ['PCB'],
  'Bodily-Kinesthetic Logical-Math': ['CWM'],
  'Bodily-Kinesthetic Spatial-Visual': ['HUM'],
  'Interpersonal Intrapersonal': ['HUM', 'CWOM'],
  'Interpersonal Linguistic': ['CWOM', 'HUM'],
  'Interpersonal Logical-Math': ['CWM'],
  'Interpersonal Spatial-Visual': ['HUM'],
  'Intrapersonal Linguistic': ['CWOM'],
  'Intrapersonal Logical-Math': ['PCM'],
  'Intrapersonal Spatial-Visual': ['PCM'],
  'Linguistic Logical-Math': ['CWM'],
  'Linguistic Spatial-Visual': ['PCM', 'HUM'],
  'Logical-Math Spatial-Visual': ['PCM'],
};
