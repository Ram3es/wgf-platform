import { FC, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';

import { IMAGES } from '@constants/images';
import { ROUTES } from '@constants/routes';
import { ROLES } from '@constants/user-roles';
import { errorMessage } from '@constants/pop-up-messages';

import { Button } from '@components/button';

import { useAppSelector } from '@services/hooks/redux';
import { getUserById } from '@services/super-admin.service';
import { IResultUser } from '@screens/platform-page/components/edit-page/user-progres-games/user-progres.constants';

import { COLORS } from '@styles/colors';
import { TitleStyles } from '@styles/components/title-styles';

import { MainPageStyles as Styled } from './main-page.styles';
import { IQuizRoutes, MAIN_PAGE, QUIZ_PATH_NAME } from './main-page.constants';

export interface IMainPageProps {
  redirectToFlexCooperationQuiz: () => void;
  redirectToFlexQuiz: () => void;
  redirectToCareerCanvasQuiz: () => void;
}

const getLastQuizResult = (results: IResultUser[], quizName: string) => {
  const filteredByQuiz = results.filter(
    (result) => result.quiz.title === quizName
  );
  const lastResult = filteredByQuiz?.sort((a, b) =>
    a.created < b.created ? 1 : -1
  )?.[0];
  return lastResult;
};

export const MainPageNew: FC<IMainPageProps> = (props) => {
  const { redirectToCareerCanvasQuiz, redirectToFlexCooperationQuiz } = props;

  const [userResults, setResults] = useState<IResultUser[] | []>([]);

  const { push } = useHistory();

  const {
    id: userId,
    lastName: name,
    role,
  } = useAppSelector((state) => state.user);

  const btnFlexHandler = () =>
    role === ROLES.user
      ? redirectToFlexCooperationQuiz()
      : push(ROUTES.careerFlexPlusAdmin);

  const btnCanvasHandler = () =>
    role === ROLES.user
      ? redirectToCareerCanvasQuiz()
      : push(ROUTES.careerCanvasAdmin);

  const btnDesignHandler = () =>
    role === ROLES.user
      ? push(ROUTES.careerDesign)
      : push(ROUTES.careerDesignGame);

  const getUser = useCallback(async () => {
    try {
      const { data } = await trackPromise(getUserById({ userId }));

      setResults([...(data.results as IResultUser[])]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  }, []);

  const redirectToQuizResult = (quizResult: IResultUser) => {
    const url = QUIZ_PATH_NAME[quizResult?.quiz.title as keyof IQuizRoutes];
    const quizId = quizResult?.quiz.id;
    const title = careerFlexResult.quiz.title;
    push(
      `${url}?quizTitle=${title}&quizId=${quizId}&userId=${userId}&userName=${name}`
    );
  };
  const careerFlexResult = getLastQuizResult(
    userResults,
    'caas-cooperation-quiz'
  );
  const careerCanvasResult = getLastQuizResult(userResults, 'career-canvas');
  const canvasCompleted =
    careerCanvasResult?.status !== 'Completed'
      ? +careerCanvasResult?.status.substring(
          0,
          careerCanvasResult?.status.length - 1
        )
      : 100;

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <Styled.Wrap>
      <Styled.Container>
        <Styled.Section>
          <Styled.Content>
            <TitleStyles.h3 color={COLORS.grey} mb={12}>
              {MAIN_PAGE.careerDesign.title}
            </TitleStyles.h3>
            <Styled.Description>
              {MAIN_PAGE.careerDesign.text}
            </Styled.Description>
            <Styled.FlexCenter>
              <img src={IMAGES.phonesMain} />
            </Styled.FlexCenter>
          </Styled.Content>
          <Styled.FlexCenter>
            <Styled.ButtonWrapper>
              <Styled.FlexCenter>
                <Button
                  title="Enter Career Design Game"
                  onClick={btnDesignHandler}
                  color={COLORS.violet}
                  iconType="next"
                  isIconRight
                />
              </Styled.FlexCenter>
              <Styled.ProgressContainer position={false}>
                <Styled.Progres color={COLORS.violet} completed={0} />
                <span>{`Completion: ${canvasCompleted}%`}</span>
                {careerCanvasResult?.status === 'Completed' && (
                  <Styled.ReportButton onClick={() => null} dark>
                    View Report
                  </Styled.ReportButton>
                )}
              </Styled.ProgressContainer>
            </Styled.ButtonWrapper>
          </Styled.FlexCenter>
        </Styled.Section>
        <Styled.Section>
          <Styled.Content>
            <TitleStyles.h3 color={COLORS.grey} mb={12}>
              {MAIN_PAGE.careerCanvas.title}
            </TitleStyles.h3>
            <Styled.Description>
              {MAIN_PAGE.careerCanvas.text}
            </Styled.Description>
            <Styled.FlexCenter>
              <img src={IMAGES.girlMain} />
            </Styled.FlexCenter>
          </Styled.Content>
          <Styled.ButtonWrapper>
            <Styled.FlexCenter>
              <Button
                title="Enter Career Canvas"
                onClick={btnCanvasHandler}
                color={COLORS.yellow}
                textColor={COLORS.black}
                iconType="nextBlack"
                isIconRight
              />
            </Styled.FlexCenter>
            <Styled.ProgressContainer position={!!careerCanvasResult?.status}>
              <Styled.Progres
                color={COLORS.yellow}
                completed={canvasCompleted}
              />
              <span>{`Completion: ${canvasCompleted}%`}</span>
              {careerCanvasResult?.status === 'Completed' && (
                <Styled.ReportButton
                  onClick={() => {
                    redirectToQuizResult(careerCanvasResult);
                  }}
                  dark
                >
                  View Report
                </Styled.ReportButton>
              )}
            </Styled.ProgressContainer>
          </Styled.ButtonWrapper>
        </Styled.Section>
        <Styled.Section>
          <Styled.Content>
            <TitleStyles.h3 color={COLORS.grey} mb={12}>
              {MAIN_PAGE.careerFlex.title}
            </TitleStyles.h3>
            <Styled.Description>{MAIN_PAGE.careerFlex.text}</Styled.Description>
            <Styled.FlexCenter>
              <img src={IMAGES.phoneFlex} />
            </Styled.FlexCenter>
          </Styled.Content>
          <Styled.ButtonWrapper>
            <Styled.FlexCenter>
              <Button
                title="Enter CareerFlex +"
                onClick={btnFlexHandler}
                color={COLORS.greenLight}
                iconType="next"
                isIconRight
              />
            </Styled.FlexCenter>
            <Styled.ProgressContainer
              position={careerFlexResult?.status === 'Completed'}
            >
              <Styled.Progres color={COLORS.greenLight} completed={100} />
              <span>Completion: 100%</span>
              {careerFlexResult?.status === 'Completed' && (
                <Styled.ReportButton
                  onClick={() => {
                    redirectToQuizResult(careerFlexResult);
                  }}
                  dark
                >
                  View Report
                </Styled.ReportButton>
              )}
            </Styled.ProgressContainer>
          </Styled.ButtonWrapper>
        </Styled.Section>
      </Styled.Container>
    </Styled.Wrap>
  );
};
