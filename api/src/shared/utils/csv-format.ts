import { writeToBuffer } from '@fast-csv/format';
import { baseHeaders, CareerCanvasQuestionsHeaders } from 'src/constants/csv-headers';
import { DATE_OPTIONS } from 'src/constants/date';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { UserEntity } from 'src/user/entities/user.entity';

interface IUsersCareerCanvasCsvData {
  user: UserEntity;
  reportCreated: Date;
  questions: QuestionEntity[];
  isLastResult: boolean;
}

interface IUsersCaasCsvData {
  user: UserEntity;
  reportCreated: Date;
  questions: QuestionEntity[];
  resultCategories: {
    [key: string]: {
      level: string;
      score: number;
    };
  };
  isLastResult: boolean;
}

export const createCsvCaasQuiz = async (
  users: IUsersCaasCsvData[],
  questions: QuestionEntity[]
) => {
  const questionHeaders = questions
    .sort((a, b) => a.order - b.order)
    .map((item) => `Q${item.order}`);

  const categorieHeaders = users.map((item) => [
    ...Object.keys(item.resultCategories),
  ]);

  const headers = [
    ...baseHeaders,
    'Job Status',
    'Is Email Subscriber',
    ...questionHeaders,
    ...categorieHeaders[0],
  ];
  const rows = users.map((item) => {
    const answers = item.questions
      .sort((a, b) => a.order - b.order)
      .map((question) => question.answers[0].value);

    return [
      item.user.id,
      `${item.user.firstName} ${item.user.lastName}`,
      item.user.email,
      item.reportCreated.toLocaleString('en-US', DATE_OPTIONS),
      item.isLastResult,
      item.user.jobStatus,
      item.user.isSubscriber,
      ...answers,
      item.resultCategories.curiosity.level,
      item.resultCategories.control.level,
      item.resultCategories.concern.level,
      item.resultCategories.confidence.level,
      item.resultCategories.cooperation?.level,
    ];
  });

  const data = await writeToBuffer(rows, {
    headers,
  });

  return data.toString('base64');
};

export const createCsvCareerCanvasQuiz = async (
  users: IUsersCareerCanvasCsvData[]
) => {
  const headers = [...baseHeaders, ...CareerCanvasQuestionsHeaders];

  const rows = users.map((item) => {
    const CATEGORY_HASH_MAPS: Record<string, string[]> = {};

    item.questions
      .sort((a, b) => a.order - b.order)
      .forEach((item) => {
        if (!CATEGORY_HASH_MAPS[item.category]) {
          CATEGORY_HASH_MAPS[item.category] = [];
        }
        const answer = item.answers[0]?.value || '-';

        if (item.title === 'My top 4 values:') {
          const splitValues = answer.split('/');

          if (splitValues.length !== 4) {
            const prevLength = splitValues.length;
            splitValues.length = 4;
            const newAnswers = splitValues.fill('-', prevLength);
            return CATEGORY_HASH_MAPS[item.category].push(...newAnswers);
          }

          return CATEGORY_HASH_MAPS[item.category].push(...splitValues);
        }
        CATEGORY_HASH_MAPS[item.category].push(answer);
      });

    return [
      item.user.id,
      `${item.user.firstName} ${item.user.lastName}`,
      item.user.email,
      item.reportCreated.toLocaleString('en-US', DATE_OPTIONS),
      item.isLastResult,
      ...CATEGORY_HASH_MAPS.mySmarts,
      ...CATEGORY_HASH_MAPS.myPerformanceCharacter,
      ...CATEGORY_HASH_MAPS.myValues,
      ...CATEGORY_HASH_MAPS.myCareerAnchors,
      ...CATEGORY_HASH_MAPS.myMBTI,
      ...CATEGORY_HASH_MAPS.myHollandCode,
      ...CATEGORY_HASH_MAPS.myIdealEnvironment,
      ...CATEGORY_HASH_MAPS.coreCriticalSkills,
      ...CATEGORY_HASH_MAPS.technicalSkills,
      ...CATEGORY_HASH_MAPS.practicalityCheck,
    ];
  });

  const data = await writeToBuffer(rows, {
    headers,
  });

  return data.toString('base64');
};
