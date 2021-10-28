import React from 'react';

import { IProgressBarProps } from './progress-bar.typings';

import { ProgressBarStyled as Styled } from './progress-bar.styles';

export const ProgressBar: React.FC<IProgressBarProps> = ({ percent }) => (
  <Styled.Wrapper>
    <Styled.Range>
      <Styled.Line percent={percent}>
        <Styled.Indicator percent={percent}>
          <span>{percent}%</span>
        </Styled.Indicator>
      </Styled.Line>
    </Styled.Range>
  </Styled.Wrapper>
);
