import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { IMAGES } from '@constants/images';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';
import { FLEX_QUIZ } from '@constants/flex-quiz';

import { Button } from '@components/button';
import { storageService } from '@services/storage/storage';

import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';
import { TitleStyles } from '@styles/components/title-styles';

import { GameButton } from '../game-button';
import { MainPageStyles as Styled } from './main-page.styles';

export const MainPage: FC = () => {
  const { push } = useHistory();

  const redirectToFlexCooperationQuiz = () => {
    storageService.setQuiz(FLEX_QUIZ.careerFlexPlus);
    push(ROUTES.careerFlex);
  };

  const redirectToFlexQuiz = () => {
    storageService.setQuiz(FLEX_QUIZ.careerFlex);
    push(ROUTES.careerFlex);
  };

  const redirectToCareerCanvasQuiz = () => {
    push(ROUTES.careerDesignCanvas);
  };

  return (
    <Container>
      <Styled.Banner>
        <Styled.BannerDescription>
          <TitleStyles.h1 color={COLORS.grey} textAlign="left">
            {STRINGS.mainPage.title}
          </TitleStyles.h1>
          <Styled.BannerText>
            <div>
              {STRINGS.mainPage.bannerText.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </Styled.BannerText>
          <Styled.ButtonContainer>
            <Button
              title={STRINGS.button.quizCaas}
              isIconRight
              iconType="next"
              onClick={redirectToFlexQuiz}
              color={COLORS.greenLight}
            />
            <Button
              title={STRINGS.button.quizCooperation}
              iconType="next"
              isIconRight
              onClick={redirectToFlexCooperationQuiz}
              color={COLORS.greenLight}
            />
            <Button
              title={'Career Canvas'}
              iconType="next"
              isIconRight
              onClick={redirectToCareerCanvasQuiz}
              color={COLORS.yellow}
            />
            <GameButton />
          </Styled.ButtonContainer>
        </Styled.BannerDescription>
        <Styled.BannerImage>
          <img src={IMAGES.mainPage} alt={STRINGS.altLogo} />
        </Styled.BannerImage>
      </Styled.Banner>
    </Container>
  );
};
