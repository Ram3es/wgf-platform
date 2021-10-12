import styled from 'styled-components';

import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const UpdateResetedPasswordStyles = {
  Wrapper: styled.div`
    font-size: ${FONTS.sizes[14]};

    h1 {
      font-family: ${FONTS.family.absideSmooth};
      font-weight: 400;
    }

    button {
      font-weight: 400;
      font-family: ${FONTS.family.poppinsRegular};
      font-size: ${FONTS.sizes[14]};
    }
  `,
  FormLabel: styled.p`
    font-size: ${FONTS.sizes[14]};
    margin-bottom: 10px;
  `,
  Footer: styled.div`
    display: flex;
    align-items: center;

    & > :first-child {
      margin-right: 30px;
    }

    & > * {
      flex: 0 1 50%;
    }

    ${Media.sMobile`
      flex-wrap: wrap;
    
      & > * {
        flex: 0 1 100%;
      }

      & > :first-child {
        margin-bottom: 25px;
        margin-right: 0;
      }
    `}
  `,
};
