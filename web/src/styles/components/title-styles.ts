import styled, { css } from 'styled-components';

import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
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
    font-family: ${FONTS.frutigerBold};
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-size: ${FONT_SIZES.title1};
    color: ${({ color }) => (color ? color : COLORS.default)};
    margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};

    ${Media.mobile(css`
      font-size: ${FONT_SIZES.title1Mobile};
    `)}

    ${Media.xsMobile(css`
      font-size: ${FONT_SIZES.title1XsMobile};
    `)}

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  `,
  h2: styled.h2<TitleProps>`
    font-weight: 700;
    font-family: ${FONTS.frutigerBold};
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-size: ${FONT_SIZES.title2};
    color: ${({ color }) => (color ? color : COLORS.default)};
    margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};

    ${Media.mobile(css`
      font-size: ${FONT_SIZES.title2Mobile};
    `)}

    ${Media.xsMobile(css`
      font-size: ${FONT_SIZES.title2XsMobile};
    `)}

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  `,
  h3: styled.h3<TitleProps>`
    font-weight: 700;
    font-family: ${FONTS.frutigerBold};
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-size: ${FONT_SIZES.title3};
    color: ${({ color }) => (color ? color : COLORS.default)};
    margin-bottom: ${({ mb }) => (mb ? `${mb}px` : '0')};

    ${Media.mobile(css`
      font-size: ${FONT_SIZES.title3Mobile};
    `)}

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  `,
};
