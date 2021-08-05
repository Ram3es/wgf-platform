import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';
import { Media } from '@styles/media';

export const QuestionListStyles = {
  Wrapper: styled.div`
    padding: 35px 0;

    ${Media.mobile`
      padding: 35px 0 0;
    `}
  `,

  Text: styled.p`
    text-align: center;
    margin-bottom: 80px;

    ${Media.mobile(css`
      font-size: ${FONT_SIZES.defaultMobile};
      margin-bottom: 20px;
    `)}
  `,

  Item: styled.div`
    border-bottom: 1px solid ${COLORS.greenLite};
    margin-bottom: 40px;
  `,

  ItemTitle: styled.p<{ isError: boolean }>`
    font-size: ${FONT_SIZES.default};
    font-weight: 700;
    color: ${({ isError }) => (isError ? COLORS.red : COLORS.black)};

    ${Media.mobile(css`
      font-size: ${FONT_SIZES.defaultMobile};
    `)}
  `,

  ItemRadioWrapper: styled.div`
    display: flex;
    padding-top: 20px;
  `,
};
