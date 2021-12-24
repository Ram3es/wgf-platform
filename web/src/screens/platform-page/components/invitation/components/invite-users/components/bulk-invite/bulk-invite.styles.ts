import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import { IDataColumnPropsStyles, IDataRowPropsStyles } from './bulk-invite.typings';

export const BulkInviteStyled = {
  Wrapper: styled.div`
    padding: 20px 60px;
    width: 65%;
    min-width: 600px;

    ${Media.landscape`
      width: 100%;
      min-width: auto;
    `}

    ${Media.tablet`
      padding: 20px;
      width: 100%;
    `}

    ${Media.mobile`
      padding: 20px 0;
    `}
  `,
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
  Title: styled.h3`
    color: ${COLORS.lightBlue};
    font-weight: 900;
    font-size: ${FONTS.sizes[14]};
    margin-bottom: 20px;
  `,
  ContentWrapper: styled.div`
    display: flex;
    justify-content: flex-end;

    > * {
      width: 70%;

      ${Media.tablet`
        width: 67%;
      `}

      ${Media.mobile`
        width: 100%;
      `}
    }
  `,
  Content: styled.div`
    padding: 30px;
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid ${COLORS.white};
    box-shadow: 0px 20px 70px rgba(86, 89, 146, 0.1);
    border-radius: 20px;
  `,

  FileName: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    span {
      margin-left: 10px;
      font-size: ${FONTS.sizes[14]};
    }
  `,
  FileSuccess: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 30px;

    span {
      margin-left: 5px;
      color: ${COLORS.greenLite};
      font-size: ${FONTS.sizes[14]};
    }

    svg {
      width: 14px;
      height: 10px;

      path {
        stroke: ${COLORS.greenLite};
        stroke-width: 2px;
      }
    }
  `,
  Progress: styled.div`
    position: relative;
    height: 20px;
    background: ${COLORS.white};
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 30px;

    ::after {
      content: '';
      position: absolute;
      background-color: ${COLORS.lightBlue};
      height: 100%;
      animation: progres 3s infinite linear;
    }
    @keyframes progres {
      0% {
        width: 0%;
      }
      25% {
        width: 50%;
      }
      50% {
        width: 75%;
      }
      75% {
        width: 85%;
      }
      100% {
        width: 100%;
      }
    } ;
  `,

  DownloadSample: styled.div`
    width: max-content;
    margin-left: auto;
    transition: 0.3s;
    margin-bottom: 10px;
    margin-top: -20px;

    a {
      font-size: ${FONTS.sizes[13]};
      color: ${COLORS.grey};
      text-decoration: underline;
    }
  `,
};

export const InvitationTableCommonStyled = {
  Wrapper: styled.div`
    max-width: 100%;
    margin-bottom: 20px;
  `,
  TableShadow: styled.div`
    padding: 30px;
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid ${COLORS.white};
    box-shadow: 0px 20px 70px rgba(86, 89, 146, 0.1);
    border-radius: 20px;
    margin-left: 50px;

    ${Media.landscapeWreck`
      margin-left: 0;
    `}
  `,
  TableWrapper: styled.div`
    overflow-x: auto;
  `,
  Table: styled.div`
    min-width: 700px;

    ${Media.smallLandscape`
      min-width: 570px;
    `}
  `,
  DataWrapper: styled.div`
    overflow-y: auto;
    max-height: 500px;

    span + div {
      > div > :first-child {
        max-height: 120px;
        box-shadow: 0px 0px 0px 5px rgb(0 174 239 / 20%);
        top: 0;
      }
    }

    > :first-child span + div {
      top: 10px;

      > div > :first-child {
        top: 0;
        transform: translateY(0);
      }
    }

    > :last-child span + div {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      top: -85px;

      > div > :first-child {
        position: relative;
        transform: translateY(0);
      }
    }
  `,
  HeaderRow: styled.div`
    display: flex;
    border-bottom: 3px solid ${COLORS.lightBlue};
    margin-bottom: 5px;

    > :first-child {
      margin-left: 0;
    }
  `,
  HeaderColumn: styled.div<{ isBigBox?: boolean }>`
    display: flex;
    align-items: center;
    width: 20%;
    min-width: 160px;
    background: rgba(0, 174, 239, 0.2);
    border-radius: 7px 7px 0px 0px;
    margin-left: 5px;
    padding: 10px 5px 10px 20px;
    text-transform: uppercase;
    font-family: ${FONTS.family.frutigerBold};
    font-size: ${FONTS.sizes[14]};

    ${Media.smallLandscape(css`
      font-size: ${FONTS.sizes[11]};
      min-width: 140px;
      padding: 10px 10px 7px;
    `)}

    ${({ isBigBox }) =>
      isBigBox &&
      css`
        flex: 1;
      `}
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

    ${({ error }) =>
      error &&
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
    padding: ${({ isEditable }) =>
      isEditable ? '0 5px' : '10px 5px 10px 25px'};
    word-break: break-word;
    margin-left: 5px;

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
            ${Media.smallLandscape(css`
              padding: 0px;
            `)}
          `
        : css`
            ${Media.smallLandscape(css`
              padding: 2px 10px;
            `)}
          `}

    * {
      margin: 0;
    }

    input {
      font-size: inherit;
    }
  `,
};
