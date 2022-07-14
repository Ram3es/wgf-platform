import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import {
  IDataColumnPropsStyles,
  IDataRowPropsStyles,
  IHeaderColumnPropsStyles,
} from './platform-page.typings';

export const PlatformPageStyles = {
  Wrapper: styled.div`
    display: flex;

    ${Media.tablet`
      display: block;

      & > * {
        width: 100%;
      }
    `}
  `,
};

export const CommonStylesForPages = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    padding: 35px 0;
    border-top-left-radius: 20px;
    overflow: hidden;
    min-height: calc(100vh - 95px);
    margin-left: 10px;

    ${Media.desktop1600`
    padding: 70px 0;
  `}

    ${Media.landscape`
    padding: 20px 0;
  `}

  ${Media.tablet`
    width: 100%;
    min-height: calc(100vh - 135px);
    border-top-left-radius: 0;
    margin-left: 0px;
  `}
  ${Media.sMobile`
    margin-left: 0px;
    `}
  `,
  Content: styled.div`
    position: relative;
    padding: 0 30px;
    width: 100%;
    height: 100%;

    ${Media.desktop1600`
    padding: 0 70px;
  `}

    ${Media.landscape`
    padding: 0 20px;
  `}
  `,
  InnerWrapper: styled.div`
    h2 {
      font-family: ${FONTS.family.absideSmooth};
      font-weight: 400;
    }
  `,
  ArrowWrapper: styled.div`
    display: flex;
    width: 48px;
    height: 48px;
    background-color: ${COLORS.authBg};
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 30px;
    margin-left: auto;
    cursor: pointer;
  `,
};

export const CommonStylesForTables = {
  TableWrapper: styled.div`
    max-width: 1100px;
    padding: 20px 40px;

    ${Media.tablet`
     padding: 20px;
   `}

    ${Media.mobile`
     padding: 20px 0;
   `}
  `,

  TableWrapperUsers: styled.div`
    background-color: ${COLORS.white};
    border-radius: 20px;

    ${Media.tablet`
   padding: 20px;
 `}

    ${Media.mobile`
   padding: 20px 0;
 `};
  `,

  TableShadow: styled.div<{ ml?: number }>`
    padding: 30px;
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid ${COLORS.white};
    box-shadow: 0px 20px 70px rgba(86, 89, 146, 0.1);
    border-radius: 20px;
    margin-left: ${({ ml }) => (ml ? `${ml}px` : '0')};

    ${Media.landscapeWreck`
    margin-left: 0;
  `}
  `,
  InnerWrapper: styled.div`
    max-width: 100%;
    margin-bottom: 20px;
  `,
  CheckboxWrapper: styled.div`
    * {
      font-size: ${FONTS.sizes[13]};
    }
  `,
  InnerTableWrapper: styled.div`
    overflow-x: auto;
  `,
  InnerTableWrapperManageUsers: styled.div`
    max-height: 500px;
    overflow: auto;
  `,
  Table: styled.div`
    min-width: 700px;
    ${Media.smallLandscape`
    min-width: 575px;
  `}
  `,

  HeaderRow: styled.div`
    display: flex;
    border-bottom: 3px solid ${COLORS.lightBlue};
    margin-bottom: 5px;

    > :first-child {
      margin-left: 0;
    }
  `,

  HeaderRowUsersTable: styled.div`
    display: flex;
    width: 2000px;
    border-bottom: 3px solid ${COLORS.lightBlue};
    margin-bottom: 5px;

    > :first-child {
      margin-left: 0;
    }
  `,
  HeaderRowTrainersTable: styled.div`
    display: flex;
    width: 1850px;
    border-bottom: 3px solid ${COLORS.lightBlue};
    margin-bottom: 5px;

    > :first-child {
      margin-left: 0;
    }
  `,
  ControlColumn: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    padding: 5px;
    font-size: ${FONTS.sizes[12]};
    text-align: center;

    ${Media.landscape(css`
      width: 40px;
      padding: 3px;
      font-size: ${FONTS.sizes[10]};
    `)}

    * {
      margin: 0;
    }
  `,
  HeaderColumn: styled.div<IHeaderColumnPropsStyles>`
    display: flex;
    align-items: center;
    height: 40px;
    width: 20%;
    min-width: 160px;
    color: ${({ fontColor }) => fontColor};
    background: rgba(0, 174, 239, 0.2);
    background-color: ${({ color }) => color};
    border-radius: 7px 7px 0px 0px;
    margin-left: 5px;
    padding: 10px 5px 10px 20px;
    text-transform: uppercase;
    font-family: ${FONTS.family.frutigerBold};
    font-size: ${FONTS.sizes[14]};

    ${Media.smallLandscape(css`
      font-size: ${FONTS.sizes[11]};
      min-width: 140px;
      height: 35px;
      padding: 10px 10px 7px;
    `)}
    ${({ isSmallBox }) =>
      isSmallBox &&
      css`
        min-width: 100px;
      `}
    ${({ isMiddleBox }) =>
      isMiddleBox &&
      css`
        min-width: 250px;
      `}
    ${({ isBigBox }) =>
      isBigBox &&
      css`
        flex: 1;
      `}
  `,

  DataWrapper: styled.div`
    overflow-y: auto;
    max-height: 500px;
    min-height: 140px;

    span + div {
      > div > :first-child {
        max-height: 120px;
        box-shadow: 0px 0px 0px 5px rgb(0 174 239 / 20%);
      }
    }

    > :last-child span + div {
      top: -70px;
      transform: translateY(0);

      > div > div {
        top: 100%;
        transform: translateY(-100%);
      }
    }

    > :first-child span + div {
      top: 10px;
      transform: translateY(0);

      > div > div {
        top: 0;
        transform: translateY(0);
      }
    }
  `,
  DataRow: styled.div<IDataRowPropsStyles>`
    display: flex;
    background-color: ${({ isActive, isSelected }) =>
      isActive
        ? 'rgba(0,174,239,0.2)'
        : isSelected
        ? COLORS.authBg
        : COLORS.white};

    > :first-child {
      margin-left: 0;
    }

    ${({ error, isResultsTable, isEditable }) =>
      error &&
      !isResultsTable &&
      css`
        padding-bottom: 10px;

        ${Media.smallLandscape`
        padding-bottom: 15px;
      `}

        ${!isEditable &&
        css`
          color: ${COLORS.red};

          input {
            color: ${COLORS.red};
            ::placeholder {
              color: ${COLORS.red};
            }
          }

          svg {
            path {
              stroke: ${COLORS.red} !important;
            }
          }
        `}
      `}

    ${({ error, isResultsTable }) =>
      error &&
      isResultsTable &&
      css`
        color: ${COLORS.red};
      `}
  `,
  DataRowUsersTable: styled.div<IDataRowPropsStyles>`
    display: flex;
    width: 2000px;
    background-color: ${({ isActive, isSelected }) =>
      isActive
        ? 'rgba(0,174,239,0.2)'
        : isSelected
        ? COLORS.authBg
        : COLORS.white};

    > :first-child {
      margin-left: 0;
    }

    ${({ error, isResultsTable, isEditable }) =>
      error &&
      !isResultsTable &&
      css`
        padding-bottom: 10px;

        ${Media.smallLandscape`
      padding-bottom: 15px;
    `}

        ${!isEditable &&
        css`
          color: ${COLORS.red};

          input {
            color: ${COLORS.red};
            ::placeholder {
              color: ${COLORS.red};
            }
          }

          svg {
            path {
              stroke: ${COLORS.red} !important;
            }
          }
        `}
      `}

    ${({ error, isResultsTable }) =>
      error &&
      isResultsTable &&
      css`
        color: ${COLORS.red};
      `}
  `,

  DataColumn: styled.div<IDataColumnPropsStyles>`
    display: flex;
    position: relative;
    align-items: center;
    width: 20%;
    min-width: 160px;
    font-family: ${FONTS.family.frutigerNormal};
    font-size: ${FONTS.sizes[14]};
    padding: 22px 5px 22px 25px;
    word-break: break-word;
    margin-left: 5px;
    ${({ isWarning }) =>
      isWarning &&
      css`
        color: ${COLORS.red};
      `}
    ${({ isSmallBox }) =>
      isSmallBox &&
      css`
        min-width: 100px;
      `}
    ${({ isMiddleBox }) =>
      isMiddleBox &&
      css`
        min-width: 250px;
      `}
      ${({ isBigBox }) =>
      isBigBox &&
      css`
        flex: 1;
      `}
    ${({ isCapitalized }) =>
      isCapitalized &&
      css`
        text-transform: capitalize;
      `}

  ${Media.smallLandscape(css`
      font-size: ${FONTS.sizes[12]};
      min-width: 140px;
    `)}


  ${({ isEditable }) =>
      isEditable
        ? css`
            padding: 0;
          `
        : css`
            ${Media.smallLandscape(css`
              padding: 2px 10px;
            `)}
          `}

  ${({ isErrorColumn, isError }) =>
      isErrorColumn &&
      isError &&
      css`
        & {
          font-size: ${FONTS.sizes[12]};

          ${Media.smallLandscape(css`
            font-size: ${FONTS.sizes[10]};
            min-width: 140px;
          `)}
        }
      `}
  `,
  ControlWrapper: styled.div`
    transition: 0.3s;
    cursor: pointer;

    :hover {
      opacity: 0.5;
    }

    svg {
      path {
        stroke: ${COLORS.iconBlack};
      }
    }
  `,
  InputWrapper: styled.div`
    width: 100%;

    * {
      margin: 0;
    }

    input {
      font-size: inherit;
    }
  `,
};
