import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const MyCareerAnchorsStyled = {
  LabelWrapper: styled.div`
    display: flex;
    align-items: center;
    flex: 0 1 30%;

    ${Media.tablet`
      flex: 0 1 auto;
    `}

    span {
      font-size: ${FONTS.sizes[16]};
      color: ${COLORS.grey};

      ${Media.mobile(css`
        font-size: ${FONTS.sizes[14]};
      `)}
    }
  `,
  Title: styled.div`
    margin-bottom: 30px;
  `,
  Visual: styled.div`
    margin-right: 10px;
    width: 50px;

    ${Media.mobile(css`
      width: 35px;
    `)}
  `,
  QuestionWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    ${Media.tablet(css`
      flex-wrap: wrap;
      background: ${COLORS.white};
      border-radius: 10px;
      padding: 20px 15px;
      box-shadow: 0 0 10px 2px rgb(0 0 0 / 10%);
    `)}
  `,
  RangeWrapper: styled.div`
    flex: 0 1 65%;

    > div {
      padding-top: 0;
      margin-bottom: 0;
    }

    ${Media.tablet`
      flex: 0 1 100%;
    `}
  `,
  Answers: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;

    ${Media.tablet`
      display: none;
    `}

    > div {
      flex: 0 1 67%;
    }
  `,
  AnswersInQuestionBlock: styled.div`
    display: none;
    padding: 10px 0;
    width: 100%;

    ${Media.tablet`
      display: block;
    `}
  `,
};
