import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '@components/button';
import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';

import { images } from '@constants/images';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';

import { TitleStyles } from '@styles/components/title-styles';
import { MainPageStyles } from './main-page.styles';

export const MainPage: React.FC = () => {
  const history = useHistory();

  const redirectToQuiz = () => {
    history.push(ROUTES.quiz);
  };

  return (
    <Container>
      <MainPageStyles.LogoWrapper>
        <img src={images.companyLogo} alt={STRINGS.altLogo} />
      </MainPageStyles.LogoWrapper>
      <MainPageStyles.Banner>
        <MainPageStyles.BannerDescription>
          <TitleStyles.h1 color={COLORS.grey} textAlign="left">
            {STRINGS.mainPage.title}
          </TitleStyles.h1>
          <MainPageStyles.BannerText>
            <div>
              {STRINGS.mainPage.bannerText.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </MainPageStyles.BannerText>
          <div>
            <Button
              title={STRINGS.button.quiz}
              image="next"
              onClick={redirectToQuiz}
              color={COLORS.greenLite}
            />
          </div>
        </MainPageStyles.BannerDescription>
        <MainPageStyles.BannerImage>
          <img src={images.mainPage} alt={STRINGS.altLogo} />
        </MainPageStyles.BannerImage>
      </MainPageStyles.Banner>
    </Container>
  );
};
