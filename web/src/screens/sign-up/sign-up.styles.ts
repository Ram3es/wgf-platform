import styled from 'styled-components';

import { FONT_SIZES } from '@styles/font-sizes';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const SignUpStyles = {
  Wrapper: styled.div`
    font-size: ${FONT_SIZES.medium};

    h1 {
      font-family: ${FONTS.absideSmooth};
      font-weight: 400;
    }

    button {
      font-weight: 400;
      font-family: ${FONTS.poppinsRegular};
      font-size: ${FONT_SIZES.medium};
    }
  `,
  FormLabel: styled.p`
    font-size: ${FONT_SIZES.medium};
    margin-bottom: 10px;
  `,
  Footer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;

    ${Media.sMobile`
      flex-wrap: wrap;
    
      & > * {
        flex: 0 1 100%;
      }

      & > :first-child {
        margin-bottom: 15px;
      }
    `}
  `,
};
