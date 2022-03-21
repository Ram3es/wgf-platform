import { FC } from 'react';

import { Backdrop } from '@components/backdrop';
import { Button } from '@components/button';
import { COLORS } from '@styles/colors';

import { CareerDesignStyles as Styled } from './career-design.styles';

export const CareerDesignGame: FC = () => {
  const handleRedirect = () => {
    window.open(
      'https://witgritfit.com/career-design-life-simulation-digital',
      '_blank',
      'toolbar=0,location=0,menubar=0'
    );
  };
  return (
    <Styled.Wrapper>
      <Backdrop />
      <Styled.Content>
        <p>Career Design Game</p>
      </Styled.Content>
      <Styled.Text>
        Our Career Design Workshop is suitable for both students and working
        professionals. Built on the foundation of our WITGRITFIT framework
        backed by decades of scientific research, the workshop is intended to
        provide career guidance and help participants discover their career
        goals.
      </Styled.Text>
      <Button
        title="Find Out More"
        color={COLORS.blue}
        onClick={handleRedirect}
      />
    </Styled.Wrapper>
  );
};
