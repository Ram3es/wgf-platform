import React from 'react';

import { storageService } from '@services/storage/storage';

import { STRINGS } from '@constants/strings';

import { BannerStyles as Styled } from './banner.styles';

export const Banner: React.FC = () => {
  const quiz = storageService.getQuiz();
  return (
    <Styled.Wrapper>
      <Styled.Title>
        {quiz?.title === 'caas-quiz' ? STRINGS.banner.title : 'CareerFlex+'}
      </Styled.Title>
      <Styled.Text>
        {STRINGS.banner.text.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </Styled.Text>
    </Styled.Wrapper>
  );
};
