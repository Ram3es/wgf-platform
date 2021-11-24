import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

export const FitResultStyled = {
  BgContainer: styled.div`
    padding: 25px;
    background-color: ${COLORS.authBg};
  `,
  SectionsContainer: styled.div`
    > * {
      margin-top: 20px;
    }

    p {
      @media print {
        font-family: ${FONTS.family.frutigerBold};
        color: ${COLORS.default};
      }
    }
  `,
  MBTIContainer: styled.div`
    display: flex;
    margin-top: 11px;

    > * {
      flex: 1;

      :not(:first-child) {
        margin-left: 6px;
      }
    }
  `,
  RangesContainer: styled.div`
    margin-top: 25px;
  `,
};
