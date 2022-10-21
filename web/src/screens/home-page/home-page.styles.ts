import styled from 'styled-components';

import { Media } from '@styles/media';
import { COLORS } from '@styles/colors';

export const SignUpStyles = {
  Container: styled.div`
    box-sizing: content-box;
    min-height: 100vh;
    background: ${COLORS.authBg};
    padding: 15px;

    ${Media.mobile`
    padding: 15px 8px;

     `}
  `,
  Logo: styled.div`
    width: fit-content;
    cursor: pointer;

    ${Media.mobile`
   text-align:center;
   `}
  `,
  Wrapper: styled.div`
    display: flex;
    margin-top: 20px;
    width: 100%;
    height: auto;

    ${Media.mobile`
    flex-direction:column-reverse;
    width:100%;
     `}
  `,
  SliderWrap: styled.div`
    display: flex;
    width: 50%;
    height: 100%;
    justify-content: end;

    ${Media.mobile`
    justify-content: center;
    padding-top:40px;
    width: 100%;
     `}
  `,

  FormWrap: styled.div`
    display: flex;
    justify-content: center;
    width: 50%;
    height: 100%;

    ${Media.mobile`
    width: 100%;
     `}
  `,
};
