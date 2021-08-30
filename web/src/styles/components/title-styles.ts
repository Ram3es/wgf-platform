import styled from 'styled-components';

import { COLORS } from '../colors';
import { FONT_SIZES } from '../font-sizes';

type TTextAlign = 'left' | 'right' | 'center';

export interface TitleProps {
  textAlign?: TTextAlign;
  color?: string;
  mb?: number;
}

export const TitleStyles = {
  h1: styled.h1<TitleProps>`
    font-weight: 700;
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-size: ${FONT_SIZES.title1};
    color: ${({ color }) => (color ? color : COLORS.default)};
    margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  `,
  h2: styled.h2<TitleProps>`
    font-weight: 700;
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-size: ${FONT_SIZES.title2};
    color: ${({ color }) => (color ? color : COLORS.default)};
    margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  `,
  h3: styled.h3<TitleProps>`
    font-weight: 700;
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-size: ${FONT_SIZES.title3};
    color: ${({ color }) => (color ? color : COLORS.default)};
    margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  `,
};
