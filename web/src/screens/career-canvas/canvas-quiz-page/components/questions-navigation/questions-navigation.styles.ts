import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import { IQuestionsNavigationStylesProps } from './questions-navigation.typings';

export const QuestionNavigationStyled = {
  Wrapper: styled.div`
    flex: 0 1 25%;
    background: ${COLORS.sectionBg};
    height: fit-content;

    ${Media.smallLandscape`
      flex: 0 1 100%;
      margin-bottom: 20px;
    `}
  `,
  SectionItem: styled.div<IQuestionsNavigationStylesProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;

    ${Media.smallLandscape`
      padding: 5px 25px;
    `}

    :hover {
      span {
        color: ${({ isActive, color }) =>
          isActive
            ? COLORS.white
            : color === COLORS.default
            ? COLORS.grey
            : color};
      }
    }

    ${({ isActive, color }) =>
      isActive &&
      css`
        background-color: ${color};

        span {
          color: ${COLORS.white};
        }
      `}

    span {
      font-family: ${FONTS.family.frutigerBold};
      font-size: ${FONTS.sizes[20]};
      transition: 0.3s;
    }

    i {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: ${COLORS.white};

      svg {
        width: 18px;
        height: 20px;
        path {
          stroke: ${({ color }) => color};
          stroke-width: 2px;
        }
      }
    }
  `,
};
