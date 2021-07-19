import styled from 'styled-components';

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
    font-size: ${FONT_SIZES.h1};
    padding: ${({ paddingX }) => (paddingX ? `0 ${paddingX}` : '0 40px')};
    padding: ${({ paddingY }) => (paddingY ? `${paddingY} 0` : '40px 0')};
    color: ${({ color }) => (color ? color : COLORS.default)};

    ${Media.mobile`
    font-size: 30px;
  `}

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  `,
  h2: styled.h2<TitleProps>`
    font-weight: 700;
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-size: ${FONT_SIZES.h2};
    padding: ${({ paddingX }) => (paddingX ? `0 ${paddingX}` : '0 40px')};
    padding: ${({ paddingY }) => (paddingY ? `${paddingY} 0` : '40px 0')};
    color: ${({ color }) => (color ? color : COLORS.default)};

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    ${Media.mobile`
    font-size: 24px;
  `}
  `,
  h3: styled.h3<TitleProps>`
    font-weight: 700;
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-size: ${FONT_SIZES.h3};
    padding: ${({ paddingX }) => (paddingX ? `0 ${paddingX}` : '0 40px')};
    padding: ${({ paddingY }) => (paddingY ? `${paddingY} 0` : '40px 0')};
    color: ${({ color }) => (color ? color : COLORS.default)};

    ${Media.mobile`
    font-size: 20px;
  `}

    @media print {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
  `,
};
