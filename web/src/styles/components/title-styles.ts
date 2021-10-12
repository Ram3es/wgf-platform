import styled, { css } from 'styled-components';

import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import { COLORS } from '../colors';

type TTextAlign = 'left' | 'right' | 'center';

export interface TitleProps {
  textAlign?: TTextAlign;
  color?: string;
  mb?: number;
}

export const TitleStyles = {
  h1: styled.h1<TitleProps>`
    font-weight: 700;
    font-family: ${FONTS.family.frutigerBold};
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-size: ${FONTS.sizes[36]};
    color: ${({ color }) => (color ? color : COLORS.default)};
    margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};

    ${Media.mobile(css`
      font-size: ${FONTS.sizes[30]};
    `)}

    ${Media.xsMobile(css`
      font-size: ${FONTS.sizes[26]};
    `)}

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  `,
  h2: styled.h2<TitleProps>`
    font-weight: 700;
    font-family: ${FONTS.family.frutigerBold};
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-size: ${FONTS.sizes[26]};
    color: ${({ color }) => (color ? color : COLORS.default)};
    margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};

    ${Media.mobile(css`
      font-size: ${FONTS.sizes[22]};
    `)}

    ${Media.xsMobile(css`
      font-size: ${FONTS.sizes[20]};
    `)}

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  `,
  h3: styled.h3<TitleProps>`
    font-weight: 700;
    font-family: ${FONTS.family.frutigerBold};
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-size: ${FONTS.sizes[24]};
    color: ${({ color }) => (color ? color : COLORS.default)};
    margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};

    ${Media.mobile(css`
      font-size: ${FONTS.sizes[20]};
    `)}

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  `,
};
