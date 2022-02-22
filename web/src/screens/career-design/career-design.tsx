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
        People learn best through experiential learning. This is what makes the
        game enjoyable and the career design message so sticky. While playing
        through a simulation of life, participants will learn the career design
        <a
          href="https://witgritfit.com/career-design/wit/"
          target="_blank"
          rel="noreferrer"
        >
          {' '}
          WIT
        </a>
        ,
        <a
          href="https://witgritfit.com/career-design/grit/"
          target="_blank"
          rel="noreferrer"
        >
          {' '}
          GRIT
        </a>{' '}
        and
        <a
          href="https://witgritfit.com/index.php/career-design/fit/"
          target="_blank"
          rel="noreferrer"
        >
          {' '}
          FIT
        </a>{' '}
        message through game elements and facilitated discussions. All jobs and
        skills are based on Singapore’s{' '}
        <a
          href="https://www.skillsfuture.gov.sg/skills-framework"
          target="_blank"
          rel="noreferrer"
        >
          {' '}
          Skills Framework
        </a>
        , which was co-created by industry leaders, education institutions and
        the government for the Singapore workforce.
      </Styled.Text>
      <Button
        title="Findout More"
        color={COLORS.blue}
        onClick={handleRedirect}
      />
    </Styled.Wrapper>
  );
};
