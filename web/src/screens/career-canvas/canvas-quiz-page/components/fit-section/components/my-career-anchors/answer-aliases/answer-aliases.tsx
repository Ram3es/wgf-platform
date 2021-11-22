import React, { FC } from 'react';

import { AnswerAliasesStyled as Styled } from './answer-aliases.styles';

export const AnswerAliases: FC = () => {
  const aliases = [
    'Not Important',
    'Slightly Important',
    'Moderately Important',
    'Important',
    'Very Important',
  ];
  return (
    <Styled.Wrapper>
      {aliases.map((item) => (
        <Styled.Label key={item}>{item}</Styled.Label>
      ))}
    </Styled.Wrapper>
  );
};
