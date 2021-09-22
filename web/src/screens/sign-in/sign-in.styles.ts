import styled from 'styled-components';

import { FONT_SIZES } from '@styles/font-sizes';
import { FONTS } from '@styles/fonts';

export const SignInStyles = {
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
  Settings: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    & > * {
      font-size: ${FONT_SIZES.medium};
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
