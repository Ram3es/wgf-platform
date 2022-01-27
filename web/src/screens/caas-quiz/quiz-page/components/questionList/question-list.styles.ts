import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const QuestionListStyles = {
  Wrapper: styled.div`
    padding: 20px 0;
  `,

  Text: styled.p`
    text-align: center;
    margin-bottom: 40px;

    ${Media.mobile(css`
      font-size: ${FONTS.sizes[15]};
      margin-bottom: 20px;
    `)}
  `,

  Item: styled.div`
    border-bottom: 1px solid ${COLORS.greenLight};
    margin-bottom: 40px;
  `,

  ItemTitle: styled.p<{ isError: boolean }>`
    font-size: ${FONTS.sizes[18]};
    font-weight: 700;
    font-family: ${FONTS.family.frutigerBold};
    color: ${({ isError }) => (isError ? COLORS.red : COLORS.black)};

    ${Media.mobile(css`
      font-size: ${FONTS.sizes[15]};
    `)}
  `,

  ItemRadioWrapper: styled.div`
    display: flex;
    padding-top: 20px;
  `,

  SwitchAnswers: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      margin-bottom: 20px;
      font-size: ${FONTS.sizes[15]};
      color: ${COLORS.grey};
    }
  `,
};
