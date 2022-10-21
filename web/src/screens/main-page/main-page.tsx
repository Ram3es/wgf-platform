import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { FLEX_QUIZ } from '@constants/flex-quiz';

import { Header } from '@components/header';
import { Footer } from '@components/footer';
import { BurgerNavbar } from '@components/burger-navbar/burger-navbar';

import { storageService } from '@services/storage/storage';

import { MainPageStyles as Styled } from './components/main-page/main-page.styles';
import { MainPageNew } from './main-page-new';

export const MainPage: React.FC = () => {
  const { push } = useHistory();
  const [isActiveBurger, setisActiveBurger] = useState<boolean>(false);

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
  const toogleActive = () => setisActiveBurger((prev) => !prev);

  const props = {
    redirectToFlexCooperationQuiz,
    redirectToFlexQuiz,
    redirectToCareerCanvasQuiz,
  };

  return (
    <>
      <Header />
      <Styled.BurgerMenuWrapper>
        <Styled.BurgerMenu>
          <Styled.LineWrapper onClick={toogleActive}>
            <Styled.LineTop isActiveMenu={isActiveBurger} />
            <Styled.LineMiddle isActiveMenu={isActiveBurger} />
            <Styled.LineBottom isActiveMenu={isActiveBurger} />
          </Styled.LineWrapper>
        </Styled.BurgerMenu>
        <Styled.Wrapper isActiveMenu={isActiveBurger}>
          <BurgerNavbar isActiveMenu={isActiveBurger} />
        </Styled.Wrapper>
      </Styled.BurgerMenuWrapper>
      <MainPageNew {...props} />
      <Footer />
    </>
  );
};
