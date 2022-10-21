import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';

import { Button } from '@components/button';
import { COLORS } from '@styles/colors';
import { TitleStyles } from '@styles/components/title-styles';

import { GameDesignSlideStyles as Styled } from './game-design-slide.styles';
import { ROUTES } from '@constants/routes';

export const GameDesignSlide: FC = () => {
  const { push } = useHistory();
  const handleClick = () => {
    push(ROUTES.signIn, { from: { pathname: ROUTES.careerDesign } });
  };
  return (
    <Styled.Container>
      <TitleStyles.h1 textAlign="center" color={COLORS.grey} mb={20}>
        {STRINGS.sliderSignup.title}
      </TitleStyles.h1>
      <Styled.BtnWrapper>
        <Button
          title="Career Simulation Game"
          minWidth={150}
          color={COLORS.violet}
          onClick={handleClick}
        />
      </Styled.BtnWrapper>
      <img src={IMAGES.backdropDesign} />
      <Styled.ImageWrapper>
        <img src={IMAGES.twoMobiles} />
      </Styled.ImageWrapper>
    </Styled.Container>
  );
};
