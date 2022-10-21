import { LogoHeader } from '@styles/components/login-pages';
import { FC } from 'react';

import { SignUpForm } from './components/form';
import { SliderComponent } from './components/slider-carousell';
import { SignUpStyles as Styled } from './home-page.styles';

export const HomePageSlider: FC = () => {
  return (
    <Styled.Container>
      <LogoHeader />
      <Styled.Wrapper>
        <Styled.SliderWrap>
          <SliderComponent />
        </Styled.SliderWrap>
        <Styled.FormWrap>
          <SignUpForm />
        </Styled.FormWrap>
      </Styled.Wrapper>
    </Styled.Container>
  );
};
