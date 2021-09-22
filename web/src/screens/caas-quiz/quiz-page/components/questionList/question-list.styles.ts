import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const QuestionListStyles = {
  Wrapper: styled.div`
    padding: 20px 0;
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
    font-family: ${FONTS.frutigerBold};
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
