export const QUIZ_ROUTES = {
  main: 'quiz',
  getQuestions: 'get-questions-by-quiz',
  getResult: 'get-result-by-quiz',
  getPdf: 'get-pdf',
  getCaasCsv: 'get-caas-csv',
  getCareerCanvasCsv: 'get-career-canvas-csv',
};

export interface ICategoryObj {
  [key: string]: { score: number; count: number };
}

export const categoryLevelPercent = {
  concern: {
    High: 83,
    Moderate: 68.8,
  },
  control: {
    High: 85.1,
    Moderate: 72.1,
  },
  curiosity: {
    High: 81,
    Moderate: 66.9,
  },
  confidence: {
    High: 86,
    Moderate: 71.4,
  },
  cooperation: {
    High: 84.7,
    Moderate: 69,
  },
};
