import { Media } from '@styles/media';
import styled from 'styled-components';

export const FormStyles = {
  FormItem: styled.div`
    flex: 0 1 100%;
    & > * {
      margin: 2px 0 25px;
    }
  `,

  InputStyled: styled.div`
    position: relative;
    margin-bottom: 20px;

    svg {
      left: 62%;
      position: absolute;
      top: 40%;

      ${Media.landscape`
      top: 40%;
      left: 60%;
    `}
      ${Media.smallLandscape`
      top: 40%;
      left: 55%;
    `}

      ${Media.tablet`
      top: 40%;
      left: 55%;
    `}

      ${Media.mobile`
      top: 50%;
      left: 70%;
    `}
    }
  `,
  SelectWrapper: styled.div`
    position: absolute;
    width: 70%;
    top: 74px;

    ${Media.mobile`
     width: 100%;
     top: 120%
   `};
  `,
  ButtonWraper: styled.div`
    margin-top: 5px;

    ${Media.mobile`
  margin-left: calc(50% - 65px);
  `}
  `,
  SelectUnlmtd: styled.div`
    flex: 1 1 70%;
    height: 32px;
    background-color: white;
    border-radius: 5px;
  `,
  CheckboxDiv: styled.div`
    display: flex;
    align-items: center;
    padding-left: 22px;
    div {
      margin-top: auto;
      margin-bottom: auto;
    }
  `,
};
