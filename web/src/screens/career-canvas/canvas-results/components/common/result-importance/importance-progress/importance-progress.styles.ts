import styled from 'styled-components';

import { COLORS } from '@styles/colors';

export const ImportanceProgressStyled = {
  Root: styled.div`
    position: relative;
    margin: 8px 0;
  `,
  Bar: styled.div`
    height: 6px;
    background-color: ${COLORS.greyImportance};
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  `,
  Progress: styled.div<{ widthPercent: number }>`
    height: 100%;
    width: ${({ widthPercent }) => `${widthPercent}%`};
    background-color: ${COLORS.blueImportance};
  `,
  Thumb: styled.div<{ leftPercent: number; color: string }>`
    position: absolute;
    top: -3.5px;
    width: 3px;
    height: 14px;
    left: ${({ leftPercent }) => `${leftPercent}%`};
    background-color: ${({ color }) => color};
  `,
};
