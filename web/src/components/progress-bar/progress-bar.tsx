import React from 'react';

import { IProgressBarProps } from './progress-bar.typings';

import { ProgressBarStyles } from './progress-bar.styles';

export const ProgressBar: React.FC<IProgressBarProps> = ({ percent }) => (
  <ProgressBarStyles.Wrapper>
    <ProgressBarStyles.Range>
      <ProgressBarStyles.Line percent={percent}>
        <ProgressBarStyles.Indicator percent={percent}>
          <span>{percent}%</span>
        </ProgressBarStyles.Indicator>
      </ProgressBarStyles.Line>
    </ProgressBarStyles.Range>
  </ProgressBarStyles.Wrapper>
);
