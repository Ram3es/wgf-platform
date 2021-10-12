import styled from 'styled-components';

import { FONTS } from '@styles/fonts';

export const SignInStyles = {
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
  Settings: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    & > * {
      font-size: ${FONTS.sizes[14]};
      margin: 0;
    }
  `,
  Footer: styled.div`
    display: flex;
    align-items: center;
    padding-top: 20px;

    button {
      margin-left: -10px;
    }
  `,
};
