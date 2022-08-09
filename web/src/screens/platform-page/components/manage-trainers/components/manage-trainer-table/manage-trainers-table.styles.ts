import { IDataRowPropsStyles } from '@screens/platform-page/platform-page.typings';
import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import styled, { css } from 'styled-components';

export const ManageTrainersTableStyles = {
  FlexDiv: styled.div`
    display: flex;
  `,

  TableHeaderWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  IconTextWrapper: styled.div`
    display: flex;
    align-items: center;
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
  NumberOfTrainers: styled.div`
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
  TextTable: styled.p`
    color: ${COLORS.iconBlack};
    font-size: ${FONTS.sizes[13]};
    margin-right: 20px;
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
  ArrowsForSort: styled.div`
    :hover {
      svg {
        path {
          stroke: ${COLORS.blue};
        }
      }
    }
  `,
  TextIcon: styled.div`
    width: 60px;
    color: ${COLORS.iconBlack};
    font-size: ${FONTS.sizes[9]};
  `,
  DataRowTrainersTable: styled.div<IDataRowPropsStyles>`
    display: flex;
    min-height: 41px;
    width: 1850px;
    background-color: ${({ isActive, isSelected }) =>
      isActive
        ? 'rgba(0,174,239,0.2)'
        : isSelected
        ? COLORS.authBg
        : COLORS.white};

    > :first-child {
      margin-left: 0;
    }
  `,
};
