import { writeToBuffer } from '@fast-csv/format';
import { DATE_OPTIONS } from 'src/constants/date';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { UserEntity } from 'src/user/entities/user.entity';

const baseHeaders = [
  'User Account ID',
  'User Name',
  'Email',
  'Report date and time',
  'Is Latest Version',
  'Job Status',
  'Is Email Subscriber',
];

interface IUsersData {
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
  users: IUsersData[],
  questions: QuestionEntity[]
) => {
  const questionHeaders = questions
    .sort((a, b) => a.order - b.order)
    .map((item) => `Q${item.order}`);

  const categorieHeaders = users.map((item) => [
    ...Object.keys(item.resultCategories),
  ]);

  const headers = [...baseHeaders, ...questionHeaders, ...categorieHeaders[0]];
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
