import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';
import { FLEX_QUIZ } from '@constants/flex-quiz';

import { storageService } from '@services/storage/storage';

import { Button } from '@components/button';
import { COLORS } from '@styles/colors';
import { TitleStyles } from '@styles/components/title-styles';

import { CareerFlexSlideStyles as Styled } from './career-flex-slide.styles';

export const CareerFlexSlide: FC = () => {
  const { push } = useHistory();

  const handleClick = () => {
    storageService.setQuiz(FLEX_QUIZ.careerFlexPlus);
    push(ROUTES.signIn, { from: { pathname: ROUTES.careerFlex } });
  };

  return (
    <Styled.Container>
      <TitleStyles.h1 textAlign="center" color={COLORS.grey} mb={45}>
        {STRINGS.sliderCareerFlex.title}
      </TitleStyles.h1>
      <Styled.BtnWrapper>
        <Button
          title="CareerFlex + "
          color={COLORS.greenLight}
          onClick={handleClick}
        />
      </Styled.BtnWrapper>
      <Styled.ImageWrapper>
        <img src={IMAGES.careerFlexSlide} />
      </Styled.ImageWrapper>
    </Styled.Container>
  );
};
