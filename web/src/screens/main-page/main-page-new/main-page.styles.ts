import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';

export const MainPageStyles = {
  Wrap: styled.div`
    height: 100vh;
    padding: 50px 20px;
    background: ${COLORS.authBg};

    ${Media.mobile`
    flex-direction: column;
    padding-top: 20px;
    height: auto;
    `}
  `,

  Container: styled.div`
    display: flex;
    flex-direction: row;

    ${Media.mobile`
    flex-direction: column;
    padding-top: 20px;
    height: auto;
    `}
  `,
  Content: styled.div``,
  Section: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 33.3%;
    max-height: 500px;
    padding: 0 10px;
    position: relative;

    ${Media.mobile`
    width: 100%;
    margin-bottom:35px;
    height:450px;
    `}
  `,
  Description: styled.p`
    text-align: center;
    font-family: ${FONTS.family.frutigerNormal};
    font-size: ${FONTS.sizes[16]};
    text-indent: 15px;
    color: ${COLORS.grey};
    margin-bottom: 15px;
  `,
  FlexCenter: styled.div`
    display: flex;
    justify-content: center;
  `,
  ButtonWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  ProgressContainer: styled.div<{ position?: boolean }>`
    visibility: ${({ position }) => (position ? 'block' : 'hidden')};
    height: 10px;
    width: 240px;
    background: ${COLORS.white};
    border-radius: 50px;
    margin: 20px 0;

    span {
      color: ${COLORS.grey};
      font-size: ${FONTS.sizes[12]};
      font-family: ${FONTS.family.frutigerNormal};
    }
  `,
  Progres: styled.div<{ completed: number; color: string }>`
    height: 100%;
    width: ${({ completed }) => `${completed}%`};
    background-color: ${({ color }) => color};
    border-radius: inherit;
  `,
  ReportButton: styled.div<{ dark?: boolean }>`
    display: flex;
    width: 120px;
    height: 29px;
    border: 1px solid ${COLORS.grey};
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    color: ${COLORS.grey};
    cursor: pointer;
    font-size: ${FONTS.sizes[14]};
    font-weight: 400;
    padding: 5px 10px;
    margin: 10px auto;
    z-index: ${Z_INDEX.low};
    ${({ dark }) =>
      dark &&
      css`
        background-color: ${COLORS.grey};
        color: ${COLORS.white};
        border: 1px solid ${COLORS.grey};
        cursor: pointer;
      `};

    :hover {
      opacity: 0.7;
      transition: 0.4s;
    }
  `,
};
