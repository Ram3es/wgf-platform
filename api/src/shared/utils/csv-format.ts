import { writeToBuffer } from '@fast-csv/format';
import { baseHeaders, CareerCanvasQuestionsHeaders } from 'src/constants/csv-headers';
import { DATE_OPTIONS, DATE_TIME_OPTIONS } from 'src/constants/date';
import { ROLES } from 'src/constants/roles';
import { GroupEntity } from 'src/group/entities/group.entity';
import { QuestionEntity } from 'src/question/entities/question.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { allUsersHeaders } from '../../constants/csv-headers';

import { INVITATION_STATUS, INVITATION_TYPE } from 'src/ invitation/invitation.constants';

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
export interface IUserCsv {
  id: string;
  firstName?: string;
  lastName?: string;
  created?: Date;
  email?: string;
  results?: IUserGamesResults[];
  groups?: IGroupForUser[];
  role?: ROLES;
  from?: string;
  group?: IGroupForUser;
  inviteDate?: Date;
  name?: string;
  status?: INVITATION_STATUS;
  to?: string;
  type?: INVITATION_TYPE;
}

interface IUserGamesResults {
  id: string;
  status: string;
  quiz: { title: string };
  created: Date;
}

interface IGroupForUser extends GroupEntity {
  name: string;
  trainerId: string;
  trainerName: string;
}

export const createCsvUsers = async (users: IUserCsv[]) => {
  const headers = [...allUsersHeaders];

  const rows = users.map((user) => {
    const groups = user.groups?.length
      ? user.groups
          ?.map((group) => {
            if (group.trainerName) {
              return `${group.name}(${group.trainerName})`;
            }
            return `${group.name}`;
          })
          .join(';')
      : user.group
      ? user.group?.trainerName
        ? `${user.group.name}(${user.group.trainerName})`
        : `${user.group.name}`
      : '-';

    const registered = user?.created
      ? new Date(user.created).toLocaleString('en-US', DATE_OPTIONS)
      : user?.status
      ? user.status.toLowerCase()
      : '';

    const careerFlex = user?.results?.find(
      (result) => result.quiz.title === 'caas-quiz'
    );
    const careerFlexResult = careerFlex
      ? `${careerFlex.status} on ${careerFlex.created.toLocaleString(
          'en-US',
          DATE_OPTIONS
        )}`
      : '';

    const careerFlexCooperation = user?.results?.find(
      (result) => result.quiz.title === 'caas-cooperation-quiz'
    );
    const careerFlexCooperationResult = careerFlexCooperation
      ? `${
          careerFlexCooperation.status
        } on ${careerFlexCooperation?.created?.toLocaleString(
          'en-US',
          DATE_OPTIONS
        )}`
      : '';

    const careerDesignCanvas = user?.results?.find(
      (result) => result.quiz.title === 'career-canvas'
    );
    const careerDesignCanvasResult = careerDesignCanvas
      ? `${
          careerDesignCanvas.status
        } on ${careerDesignCanvas.created.toLocaleString(
          'en-US',
          DATE_OPTIONS
        )}`
      : '';

    return [
      user.name || `${user.firstName} ${user.lastName}`,
      groups,
      registered,
      user.to || user.email,
      careerFlexResult,
      careerFlexCooperationResult,
      careerDesignCanvasResult,
    ];
  });

  const data = await writeToBuffer(rows, {
    headers,
  });

  return data.toString('base64');
};

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
      item.reportCreated.toLocaleString('en-US', DATE_TIME_OPTIONS),
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
      item.reportCreated.toLocaleString('en-US', DATE_TIME_OPTIONS),
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
