import styled from 'styled-components';

import { COLORS } from '@styles/colors';

export const FitResultStyled = {
  BgContainer: styled.div`
    padding: 25px;
    background-color: ${COLORS.authBg};
  `,
  SectionsContainer: styled.div`
    > * {
      margin-top: 20px;
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
