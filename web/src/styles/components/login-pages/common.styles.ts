import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { Media } from '@styles/media';

export const CommonStylesAuthPages = {
  Section: styled.div`
    position: relative;
    min-height: 100vh;
    background: ${COLORS.authBg};
    padding: 15px;

    ${Media.mobile`
    padding: 15px 8px;

     `}
  `,
  WrapContent: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    ${Media.mobile`
    margin-top:20px;
    `}
  `,
  Logo: styled.div`
    width: fit-content;
    cursor: pointer;

    ${Media.mobile`
    width:100%;
    text-align:center;
   `}
  `,
};
