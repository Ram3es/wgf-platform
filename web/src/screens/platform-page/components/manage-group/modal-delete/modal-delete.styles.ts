import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

export const MoidalDeleteStyles = {
  Header: styled.div`
    display: flex;
    justify-content: center;
    /* margin-bottom: 20px; */

    svg {
      margin-right: 16px;
    }
  `,
  Description: styled.div`
    text-align: center;
    margin-bottom: 30px;

    p {
      color: ${COLORS.grey};
      font-size: ${FONTS.sizes[16]};
    }
  `,
  WrapBtn: styled.div`
    display: flex;
    justify-content: space-between;
  `,
};
