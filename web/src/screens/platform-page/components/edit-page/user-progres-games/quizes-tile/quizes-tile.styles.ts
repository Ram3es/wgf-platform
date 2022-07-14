import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import styled, { css } from 'styled-components';

export const QuizesTileStyles = {
  WrapperQuiz: styled.div`
    width: 220px;
    background-color: ${COLORS.white};
    border-radius: 20px;
    margin-bottom: 15px;
    ${Media.mobile`
    width: 300px;
    margin-top: 20px
    
    `};
  `,
  QuizShadow: styled.div`
    position: relative;
    height: 100%;

    background: rgba(255, 255, 255, 0.3);
    border: 2px solid ${COLORS.white};
    box-shadow: 0px 20px 70px rgba(86, 89, 146, 0.1);
    border-radius: 20px;
    ${Media.landscapeWreck`
  margin-left: 0;
`}
    img {
      position: absolute;
      top: -25px;
      left: -40px;
      width: 200px;
    }
  `,
  QuizName: styled.div`
    margin-top: 60px;
    font-family: ${FONTS.family.frutigerBold};
    color: ${COLORS.grey};
    padding: 15px;
  `,
  Outlines: styled.div`
    border-top: solid 1px ${COLORS.line};
    border-bottom: solid 1px ${COLORS.line};
    padding: 15px 15px;
    margin-bottom: 30px;
  `,
  BlackText: styled.div`
    color: ${COLORS.iconBlack};
    font-family: ${FONTS.family.frutigerBold};
    font-size: ${FONTS.sizes[16]};
    padding-bottom: 10px;
  `,
  InfoText: styled.div`
    font-family: ${FONTS.family.frutigerNormal};
    font-size: ${FONTS.sizes[14]};
    input[type='range'] {
      overflow: hidden;
      width: 80px;
      -webkit-appearance: none;
      background-color: #ffffff;
      outline: 1px solid ${COLORS.grey};
      border-radius: 20px;
      width: 100%;
      margin-bottom: 20px;
    }
    input[type='range']::-webkit-slider-thumb {
      width: 10px;
      -webkit-appearance: none;
      height: 10px;
      background: ${COLORS.lightBlue};
      box-shadow: -80px 0 0 80px ${COLORS.lightBlue};
    }
  `,
  StatusFlex: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Button: styled.div<{ dark?: boolean }>`
    display: flex;
    width: 100px;
    height: 29px;
    border: 1px solid ${COLORS.grey};
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    color: ${COLORS.grey};
    cursor: pointer;
    font-weight: 700;
    ${({ dark }) =>
      dark &&
      css`
        background-color: ${COLORS.grey};
        color: ${COLORS.white};
        border: 1px solid ${COLORS.grey};
        cursor: pointer;
      `}
  `,
};
