import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const WitStyled = {
  DescriptionWrapper: styled.div`
    margin-bottom: 20px;
  `,
  Title: styled.div`
    display: flex;
    align-items: center;

    p {
      font-family: ${FONTS.family.frutigerBold};
    }
  `,
  InfoIcon: styled.div`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background: ${COLORS.red};
    text-align: center;
    line-height: 23px;
    color: ${COLORS.white};
    cursor: pointer;
    font-size: 15px;
    position: relative;
    margin-left: 5px;

    :hover {
      > div {
        display: block;
      }
    }
  `,
  InfoBlock: styled.div`
    display: none;
    position: absolute;
    top: -75px;
    left: 50%;
    transform: translateX(-50%);
    width: 220px;
    border-radius: 10px;
    background: ${COLORS.white};
    color: ${COLORS.grey};
    padding: 10px;
    cursor: default;
    box-shadow: 0 0 10px 2px rgb(0 0 0 / 10%);

    ${Media.mobile`
      transform: translateX(-100%);
      left: 30px;
    `}

    ::after {
      content: '';
      display: block;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid ${COLORS.white};
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 100%;

      ${Media.mobile`
        transform: translateX(-100%);
        left: 95%;
    `}
    }

    & a {
      font-family: ${FONTS.family.frutigerBold};
      font-weight: 700;
    }
  `,
  QuestionWrapper: styled.div`
    display: flex;
    align-items: center;
  `,
  Label: styled.div`
    span {
      color: ${COLORS.grey};
      font-size: ${FONTS.sizes[16]};
    }
  `,
  Visual: styled.div`
    display: flex;
    margin-right: 15px;
    width: 50px;
  `,
  Control: styled.div`
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
  `,
};
