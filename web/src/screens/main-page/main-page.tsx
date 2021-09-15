import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { Button } from '@components/button';
import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';

import { storageService } from '@services/storage/storage';

import { IMAGES } from '@constants/images';
import { ROUTES } from '@constants/routes';
import { STRINGS } from '@constants/strings';
import { Toast } from '@constants/toasts';

import { TitleStyles } from '@styles/components/title-styles';
import { MainPageStyles } from './main-page.styles';

export const MainPage: React.FC = () => {
  const [isLogOut, setIsLogOut] = useState(false);

  useEffect(() => {
    const user = storageService.getUser();
    const token = storageService.getToken();

    if (user && token) {
      setIsLogOut(true);
    }
  }, []);

  const history = useHistory();

  const logOut = () => {
    storageService.clearSessionStorage();
    storageService.clearStorage();

    Toast.fire({
      icon: 'success',
      title: 'Log Out successfully',
    });

    setIsLogOut(false);
  };

  const redirectToSignIn = () => {
    history.push(ROUTES.signIn);
  };

  const redirectToCaasCooperationQuiz = () => {
    storageService.setQuiz({
      id: 'bd4bc467-78a5-4ea9-975b-16d1eebef55d',
      title: 'caas-cooperation-quiz',
    });
    history.push(ROUTES.quiz);
  };

  const redirectToCaasQuiz = () => {
    storageService.setQuiz({
      id: 'bf4bc167-78a5-4ea9-975b-16d1eebef55d',
      title: 'caas-quiz',
    });
    history.push(ROUTES.quiz);
  };

  return (
    <Container>
      <MainPageStyles.Header>
        <NavLink to={ROUTES.main}>
          <img src={IMAGES.companyLogo} alt={STRINGS.altLogo} />
        </NavLink>
        {isLogOut ? (
          <Button
            onClick={logOut}
            color={COLORS.grey}
            title={STRINGS.button.logOut}
          />
        ) : (
          <Button
            onClick={redirectToSignIn}
            color={COLORS.grey}
            title={STRINGS.button.logIn}
          />
        )}
      </MainPageStyles.Header>
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
          <MainPageStyles.ButtonContainer>
            <Button
              title={STRINGS.button.quizCaas}
              image="next"
              onClick={redirectToCaasQuiz}
              color={COLORS.greenLite}
            />
            <Button
              title={STRINGS.button.quizCooperation}
              image="next"
              onClick={redirectToCaasCooperationQuiz}
              color={COLORS.greenLite}
            />
          </MainPageStyles.ButtonContainer>
        </MainPageStyles.BannerDescription>
        <MainPageStyles.BannerImage>
          <img src={IMAGES.mainPage} alt={STRINGS.altLogo} />
        </MainPageStyles.BannerImage>
      </MainPageStyles.Banner>
    </Container>
  );
};
