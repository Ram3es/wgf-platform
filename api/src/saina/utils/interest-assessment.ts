import { AnswerEntity } from 'src/answer/entities/answer.entity';
import { IState } from '../constants';
import { SubjectEntity } from './../entities/subject.entity';

interface IUniqueScoring {
  [key: string]: [string];
}

export const interestReducer = (
  answers: AnswerEntity[],
  subjects: SubjectEntity[]
) => {
  const state: IState = {
    PCM: 0,
    PCB: 0,
    HUM: 0,
    CWM: 0,
    CWOM: 0,
  };

  const actions = answers[0].value.split(',');

  const uniqueScoring: IUniqueScoring = subjects.reduce((acc, item) => {
    const { title } = item;
    const value = item.streamIds.map((value) => value.stream);
    acc[title.trim()] = value;
    return acc;
  }, {});

  actions.forEach((subject) => {
    uniqueScoring[subject].forEach((stream) => {
      state[stream]++;
    });
  });
  return [state, actions];
};
