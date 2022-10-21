import { FC } from 'react';

import { CanvasSlide } from './career-canvas-slide';
import { CareerFlexSlide } from './career-flex-slide';
import { GameDesignSlide } from './game-design-slide';
import { StyledSlyder, SliderPageStyles as Styled } from './slider.styles';

export const SliderComponent: FC = () => {
  const settings = {
    dots: true,
    fade: true,
    autoplay: true,
    infinite: true,
    speed: 800,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    userSelect: true,
    arrows: false,
    cssEase: 'ease-in',
  };
  return (
    <Styled.Container>
      <StyledSlyder {...settings}>
        <div>
          <CanvasSlide />
        </div>
        <div>
          <GameDesignSlide />
        </div>
        <div>
          <CareerFlexSlide />
        </div>
      </StyledSlyder>
    </Styled.Container>
  );
};
