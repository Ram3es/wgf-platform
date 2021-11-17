import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

export const ValuesResultStyled = {
  PageContainer: styled.div`
    > * {
      margin-top: 6px;
    }
  `,
  RangesContainer: styled.div`
    margin-top: 5px;

    > * + * {
      margin-top: 6px;
    }
  `,
  AnchorsTitleContainer: styled.div`
    display: flex;
  `,
  AnchorsTitleImportance: styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
    font-size: 9px;
  `,
  AnchorsTitle: styled.p`
    width: 150px;
    font-size: ${FONTS.sizes[11]};
    color: ${COLORS.dark};
  `,
};
