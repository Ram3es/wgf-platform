import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const MyHollandCodeStyled = {
  Wrapper: styled.div`
    margin-bottom: 40px;
  `,
  QuestionWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${Media.tablet`
      flex-wrap: wrap;
    `}
  `,
  RangeWrapper: styled.div`
    flex: 0 1 75%;

    ${Media.tablet`
      flex: 0 1 100%;
    `}
  `,
  Title: styled.div`
    padding-top: 20px;
  `,
  LabelWrapper: styled.div`
    display: flex;
    flex: 0 1 20%;
    padding-top: 40px;

    ${Media.tablet`
      flex: 0 1 auto;
      padding-top: 0;
    `}

    span {
      font-size: ${FONTS.sizes[18]};
      color: ${COLORS.grey};
      font-family: ${FONTS.family.frutigerBold};

      ${Media.mobile(css`
        font-size: ${FONTS.sizes[16]};
      `)}
    }
  `,
};
