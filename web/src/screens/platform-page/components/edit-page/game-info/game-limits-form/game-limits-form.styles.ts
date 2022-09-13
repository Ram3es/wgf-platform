import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import styled from 'styled-components';

export const FormStyles = {
  Container: styled.div`
    position: relative;

    ${Media.mobile`
   display: block;
    `}
  `,
  FormWrapper: styled.div`
    width: 75%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 5em 5em 5em;
    gap: 0 150px;

    margin: 25px 75px 20px 75px;
    align-content: center;
    justify-content: center;

    ${Media.mobile`
    width: 90%;
    margin:auto;
    grid-gap: 15px;

  span {
    height:28px
  }

  `};
  `,
  TextLabel: styled.div`
    display: flex;
    align-items: center;
    border-radius: 12px;
    font-size: 16px;
    color: ${COLORS.violet};
  `,

  InputStyled: styled.div`
    display: block;
    position: relative;
    z-index: 1;
    label {
      margin: 0;
    }
  `,
  Select: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 28px;
    position: absolute;
    background-color: ${COLORS.white};
    border-radius: 5px;
    top: 60px;
    z-index: -1;
  `,
  CheckboxWrapper: styled.div`
    width: 100%;
    padding: 2px 14px;
    span {
      font: ${FONTS.family.frutigerNormal};
      font-size: ${FONTS.sizes[14]};
      color: ${COLORS.grey};
    }
  `,

  SelectWrapper: styled.div`
    border: 1px solid blue;
    position: absolute;
    width: 70%;
    top: 74px;

    ${Media.mobile`
     width: 100%;
     top: 120%
   `};
  `,
  ButtonWraper: styled.div`
    margin: 0 0 25px 75px;

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
