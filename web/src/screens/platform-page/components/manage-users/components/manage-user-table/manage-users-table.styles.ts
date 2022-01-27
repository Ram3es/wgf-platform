import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const ManageUsersTableStyles = {
  FlexDiv: styled.div`
    display: flex;
  `,

  TableHeaderWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  Text: styled.span`
    margin-left: 10px;
    color: ${COLORS.grey};
    font-family: ${FONTS.family.frutigerNormal};
    font-size: ${FONTS.sizes[16]};
    ${Media.mobile(css`
      padding-right: 15px;
    `)}
  `,

  IconTextWrapper: styled.div`
    display: flex;
    align-items: center;
  `,

  Flex: styled.div`
    display: flex;
    align-items: center;
  `,

  Rectangle: styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.authBg};
    font-family: ${FONTS.family.frutigerNormal};
    font-size: ${FONTS.sizes[16]};
    color: ${COLORS.grey};
    width: 140px;
    height: 32px;
    z-index: 0;
    ${Media.mobile(css`
      font-size: ${FONTS.sizes[12]};
      width: 80px;
    `)}
    ${Media.sMobile(css`
      font-size: ${FONTS.sizes[12]};
      width: 60px;
      height: 40px;
      padding-left: 10px;
    `)}
  `,

  Arrow: styled.div`
    display: block;
    right: -12px;
    width: 23px;
    height: 23px;
    background-color: ${COLORS.authBg};
    position: absolute;
    transform: rotate(45deg);
    z-index: -1;
    ${Media.sMobile(css`
      width: 29px;
      height: 29px;
    `)}
  `,

  NumberOfUsers: styled.div`
    margin-left: 40px;
    color: ${COLORS.lightBlue};
    font-family: ${FONTS.family.frutigerBold};
    font-size: ${FONTS.sizes[40]};
    ${Media.mobile(css`
      margin-left: 23px;
    `)}
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

  OptionsDiv: styled.div`
    display: flex;
    margin-bottom: 20px;
    svg {
      display: block;
      margin: auto;
    }
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

  OptionsToLeft: styled.div`
    display: flex;
  `,

  ReminderDiv: styled.div`
    display: flex;
  `,

  TextTable: styled.p`
    color: ${COLORS.iconBlack};
    font-size: ${FONTS.sizes[13]};
    margin-right: 20px;
  `,
  TextIcon: styled.div`
    width: 60px;
    color: ${COLORS.iconBlack};
    font-size: ${FONTS.sizes[9]};
  `,

  SortByDiv: styled.div`
    margin-left: auto;
    display: flex;
    width: 100px;
    justify-content: space-between;
    color: ${COLORS.grey};
    font-size: ${FONTS.sizes[13]};
    font-weight: 700;
  `,

  SortByTextIcon: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    > p {
      margin-right: 8px;
    }
  `,
  ModalSortBy: styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 20px;
    right: 0;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
    background-color: ${COLORS.white};
    width: 175px;
    z-index: 5;
    > ul {
      font-weight: 400;
    }
    li {
      display: flex;
      list-style-type: none;
      padding: 5px 10px;
    }
    li:hover {
      background-color: ${COLORS.grey};
      color: white;
    }
  `,

  RadioItem: styled.div`
    display: flex;
    width: 10px;
    height: 10px;
    margin-right: 10px;
    svg {
      path {
        fill: ${COLORS.grey};
      }
    }
    svg:hover {
      path {
        fill: ${COLORS.grey};
      }
    }
  `,

  ArrowSortByDiv: styled.div`
    display: flex;
    flex-direction: column;
    height: 20px;
    justify-content: space-between;
    cursor: pointer;
  `,

  GameResultDataColumn: styled.div`
    display: flex;
    position: relative;
    align-items: center;
    width: 20%;
    min-width: 160px;
    font-family: ${FONTS.family.frutigerNormal};
    font-size: ${FONTS.sizes[12]};
    padding: 22px 5px 22px 25px;
    margin-left: 5px;
  `,
  DataColumn: styled.div<{ isError: boolean }>`
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
    ${({ isError }) =>
      isError
        ? css`
            color: red;
          `
        : css`
            color: inherit;
          `}

    ${Media.smallLandscape(css`
      font-size: ${FONTS.sizes[12]};
      min-width: 140px;
    `)}
  `,
  ArrowsForSort: styled.div`
    :hover {
      svg {
        path {
          stroke: ${COLORS.blue};
        }
      }
    }
  `,
};
