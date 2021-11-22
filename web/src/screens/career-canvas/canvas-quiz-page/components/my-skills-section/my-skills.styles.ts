import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const MySkillsStyled = {
  Content: styled.div`
    padding: 30px 0;

    & > :first-child > div:first-child {
      > :first-child {
        border-top-left-radius: 10px;
      }

      > :last-child {
        border-top-right-radius: 10px;
      }
    }

    & > :last-child > div:last-child {
      > :first-child {
        border-bottom-left-radius: 10px;
      }

      > :last-child {
        border-bottom-right-radius: 10px;
      }
    }
  `,
  Row: styled.div`
    display: flex;
  `,
  HeaderTitle: styled.div`
    flex: 0 1 75%;
    background: ${COLORS.borderGrey};
    border-bottom: 3px solid ${COLORS.black};
    text-transform: uppercase;
    padding: 15px 25px;
    font-size: ${FONTS.sizes[20]};
    font-family: ${FONTS.family.frutigerBold};

    ${Media.mobile(css`
      flex: 0 1 60%;
      font-size: ${FONTS.sizes[16]};
      padding: 10px;
    `)}
  `,
  HeaderRightBlock: styled.div`
    flex: 0 1 35%;
    border-top: 1px solid ${COLORS.borderGreyLite};
    border-right: 1px solid ${COLORS.borderGreyLite};
    border-bottom: 3px solid ${COLORS.black};
    box-shadow: inset 6px 0 4px 0 rgb(0 0 0 / 20%);
    padding: 15px;

    ${Media.mobile(css`
      flex: 0 1 40%;
      padding: 10px;
    `)}
  `,
  Label: styled.div`
    flex: 0 1 75%;
    background: ${COLORS.borderGrey};
    border-bottom: 1px solid ${COLORS.borderGreyLite};
    padding: 10px 25px;
    font-size: ${FONTS.sizes[20]};

    ${Media.mobile(css`
      flex: 0 1 60%;
      font-size: ${FONTS.sizes[16]};
      padding: 10px;
    `)}
  `,
  ValueItem: styled.div`
    flex: 0 1 35%;
    border-bottom: 1px solid ${COLORS.borderGreyLite};
    border-right: 1px solid ${COLORS.borderGreyLite};
    box-shadow: inset 6px 0 4px 0 rgb(0 0 0 / 20%);
    padding: 5px 10px;

    ${Media.mobile(css`
      flex: 0 1 40%;
      padding: 10px;
    `)}

    > div {
      > div {
        margin: 0;
        > * {
          border: 0;
          background-color: transparent;
          box-shadow: none;
          color: ${COLORS.grey};
          font-family: ${FONTS.family.frutigerNormal};
          font-size: ${FONTS.sizes[18]};
          font-weight: 400;

          ${Media.tablet(css`
            font-size: ${FONTS.sizes[16]};
          `)}
        }
      }
    }
  `,
  Control: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};
