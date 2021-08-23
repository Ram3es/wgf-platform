import styled, { css } from 'styled-components';

import { Media } from '@styles/media';
import { COLORS } from '../colors';
import { FONT_SIZES } from '../font-sizes';

type TTextAlign = 'left' | 'right' | 'center';

export interface TitleProps {
  textAlign?: TTextAlign;
  paddingX?: string;
  paddingY?: string;
  color?: string;
}

export const TitleStyles = {
  h1: styled.h1<TitleProps>`
    font-weight: 700;
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-size: ${FONT_SIZES.title1};
    padding: ${({ paddingX }) => (paddingX ? `0 ${paddingX}` : '0 40px')};
    padding: ${({ paddingY }) => (paddingY ? `${paddingY} 0` : '40px 0')};
    color: ${({ color }) => (color ? color : COLORS.default)};

    ${Media.smallLandscape(css<TitleProps>`
      padding: ${({ paddingX }) => (paddingX ? `0 ${paddingX}` : '0 20px')};
      padding: ${({ paddingY }) => (paddingY ? `${paddingY} 0` : '20px 0')};
    `)}

    ${Media.mobile(css<TitleProps>`
      font-size: ${FONT_SIZES.title1Mobile};
      padding: ${({ paddingX }) => (paddingX ? `0 ${paddingX}` : '0 15px')};
      padding: ${({ paddingY }) => (paddingY ? `${paddingY} 0` : '15px 0')};
    `)}

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  `,
  h2: styled.h2<TitleProps>`
    font-weight: 700;
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-size: ${FONT_SIZES.title2};
    padding: ${({ paddingX }) => (paddingX ? `0 ${paddingX}` : '0 40px')};
    padding: ${({ paddingY }) => (paddingY ? `${paddingY} 0` : '40px 0')};
    color: ${({ color }) => (color ? color : COLORS.default)};

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    ${Media.smallLandscape(css<TitleProps>`
      padding: ${({ paddingX }) => (paddingX ? `0 ${paddingX}` : '0 20px')};
      padding: ${({ paddingY }) => (paddingY ? `${paddingY} 0` : '20px 0')};
    `)}

    ${Media.mobile(css<TitleProps>`
      font-size: ${FONT_SIZES.title2Mobile};
      padding: ${({ paddingX }) => (paddingX ? `0 ${paddingX}` : '0 15px')};
      padding: ${({ paddingY }) => (paddingY ? `${paddingY} 0` : '15px 0')};
    `)}
  `,
  h3: styled.h3<TitleProps>`
    font-weight: 700;
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-size: ${FONT_SIZES.title3};
    padding: ${({ paddingX }) => (paddingX ? `0 ${paddingX}` : '0 40px')};
    padding: ${({ paddingY }) => (paddingY ? `${paddingY} 0` : '40px 0')};
    color: ${({ color }) => (color ? color : COLORS.default)};

    ${Media.smallLandscape(css<TitleProps>`
      padding: ${({ paddingX }) => (paddingX ? `0 ${paddingX}` : '0 20px')};
      padding: ${({ paddingY }) => (paddingY ? `${paddingY} 0` : '20px 0')};
    `)}

    ${Media.mobile(css<TitleProps>`
      font-size: ${FONT_SIZES.title3Mobile};
      padding: ${({ paddingX }) => (paddingX ? `0 ${paddingX}` : '0 15px')};
      padding: ${({ paddingY }) => (paddingY ? `${paddingY} 0` : '15px 0')};
    `)}

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  `,
};
