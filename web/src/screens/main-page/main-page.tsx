import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@components/button';
import { Header } from '@components/header';
import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';

import { storageService } from '@services/storage/storage';

import { IMAGES } from '@constants/images';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';

import { TitleStyles } from '@styles/components/title-styles';
import { MainPageStyles as Styled } from './main-page.styles';

export const MainPage: React.FC = () => {
  const { push } = useHistory();

  const redirectToCaasCooperationQuiz = () => {
    storageService.setQuiz({
      id: 'bd4bc467-78a5-4ea9-975b-16d1eebef55d',
      title: 'caas-cooperation-quiz',
    });
    push(ROUTES.quiz);
  };

  const redirectToCaasQuiz = () => {
    storageService.setQuiz({
      id: 'bf4bc167-78a5-4ea9-975b-16d1eebef55d',
      title: 'caas-quiz',
    });
    push(ROUTES.quiz);
  };

  const redirectToCareerCanvasQuiz = () => {
    push(ROUTES.careerDesignCanvas);
  };

  return (
    <>
      <Header />
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
                onClick={redirectToCaasQuiz}
                color={COLORS.greenLight}
              />
              <Button
                title={STRINGS.button.quizCooperation}
                iconType="next"
                isIconRight
                onClick={redirectToCaasCooperationQuiz}
                color={COLORS.greenLight}
              />
              <Button
                title={'Go to Career Canvas'}
                iconType="next"
                isIconRight
                onClick={redirectToCareerCanvasQuiz}
                color={COLORS.yellow}
              />
            </Styled.ButtonContainer>
          </Styled.BannerDescription>
          <Styled.BannerImage>
            <img src={IMAGES.mainPage} alt={STRINGS.altLogo} />
          </Styled.BannerImage>
        </Styled.Banner>
      </Container>
    </>
  );
};
