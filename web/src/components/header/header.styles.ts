import styled from 'styled-components';

import { COLORS } from '@styles/colors';

import { Z_INDEX } from '@constants/z-indexes';

export const HeaderStyles = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${COLORS.white};
    padding: 25px 30px;
    position: relative;
    z-index: ${Z_INDEX.medium};

    button {
      padding: 1px 3px;
      color: ${COLORS.white};
      min-width: auto;
      min-height: auto;
      height: 28px;
      border-radius: 15px;
    }
  `,
};
