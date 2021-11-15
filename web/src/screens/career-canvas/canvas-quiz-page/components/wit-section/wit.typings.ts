import { TUpdateStateData } from '@services/hooks/useUpdateState';

import { IInitialQuestionsState } from '../../canvas-quiz-page.typings';

export interface IWitProps {
  questionListForSection: IQuestionListItem[];
  updateState: (data: TUpdateStateData<IInitialQuestionsState>) => void;
  onSubmitSection: () => void;
}
