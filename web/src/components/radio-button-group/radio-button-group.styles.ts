import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import { IRadioButtonPropsStyles } from './radio-button-group.typings';

export const RadioButtonGroupStyled = {
  Wrapper: styled.div<IRadioButtonPropsStyles>`
    display: flex;
    flex-direction: ${({ isVariantQuiz }) =>
      isVariantQuiz ? 'column' : 'row'};
    align-items: center;
    width: ${({ containerWidth }) => containerWidth || 'auto'};
    text-align: center;
    margin-bottom: 20px;
  `,

  RadioItem: styled.div<IRadioButtonPropsStyles>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ radioWidth }) => radioWidth || '38px'};
    height: ${({ radioHeight }) => radioHeight || '38px'};
    cursor: pointer;
    ${({ isVariantQuiz, color, checked }) =>
      isVariantQuiz
        ? `border-radius: 8px; border: 3px solid ${color};margin-bottom: 15px;`
        : `border-radius: 4px; border: 1px solid ${
            checked ? COLORS.greenLight : COLORS.default
          };margin-right: 10px;`}

    ${({ checked, color, isVariantQuiz }) =>
      checked &&
      ` background-color: ${isVariantQuiz ? color : COLORS.greenLight};`}

      ${Media.mobile(css<IRadioButtonPropsStyles>`
      width: ${({ radioWidth }) => radioWidth || '28px'};
      height: ${({ radioHeight }) => radioHeight || '28px'};
    `)}
  `,

  Label: styled.span<IRadioButtonPropsStyles>`
    cursor: pointer;
    font-size: ${FONTS.sizes[18]};
    ${({ isVariantQuiz, color }) =>
      isVariantQuiz ? `color: ${color};` : `color: ${COLORS.default}`}

    ${Media.mobile(css`
      font-size: ${FONTS.sizes[10]};
    `)}
  `,
};
