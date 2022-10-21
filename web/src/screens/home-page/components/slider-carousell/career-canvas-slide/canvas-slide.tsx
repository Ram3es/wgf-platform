import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';

import { Button } from '@components/button';

import { COLORS } from '@styles/colors';
import { TitleStyles } from '@styles/components/title-styles';

import { CareerCanvasStyles as Styled } from './career-canvas.style';
import { ROUTES } from '@constants/routes';

export const CanvasSlide: FC = () => {
  const { push } = useHistory();
  const handleClick = () => {
    push(ROUTES.signIn, { from: { pathname: ROUTES.careerDesignCanvas } });
  };
  return (
    <Styled.Container>
      <TitleStyles.h1 textAlign="center" color={COLORS.grey} mb={25}>
        {STRINGS.sliderCanvas.title}
      </TitleStyles.h1>
      <Styled.BtnWrapper>
        <Button
          title="Career Canvas "
          onClick={handleClick}
          textColor={COLORS.black}
          color={COLORS.yellow}
        />
      </Styled.BtnWrapper>
      <Styled.ImageWrapper>
        <img src={IMAGES.canvasGif} />
      </Styled.ImageWrapper>
    </Styled.Container>
  );
};
