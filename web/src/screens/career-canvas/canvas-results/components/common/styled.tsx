import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

export const CanvasResultsStyled = {
  PageSubtitle: styled.p`
    padding: 10px 0;
    box-sizing: border-box;
    font-family: ${FONTS.family.poppinsRegular};
    font-size: ${FONTS.sizes[12]};
    font-weight: 400;
    color: ${COLORS.grey};

    @media print {
      font-family: ${FONTS.family.poppinsBold};
      color: ${COLORS.default};
    }
  `,
  PageTitle: styled.h3<{ paddingLeft?: string }>`
    ${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft}`};
    font-family: ${FONTS.family.absideSmooth};
    font-size: ${FONTS.sizes[16]};
    color: ${COLORS.grey};
    font-weight: 400;
  `,
  RangesGrid: styled.div<{ columnGap?: string }>`
    display: grid;
    grid-template-columns: auto 1fr;
    row-gap: 12px;
    column-gap: ${({ columnGap }) => (columnGap ? columnGap : '14px')};
  `,
};
