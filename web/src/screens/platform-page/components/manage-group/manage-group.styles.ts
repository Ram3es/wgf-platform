import { FONTS } from '@styles/fonts';
import { COLORS } from '@styles/colors';
import styled from 'styled-components';
import { Media } from '@styles/media';

export const ManageGroupStyles = {
  HeaderDescription: styled.p`
    font-family: ${FONTS.family.frutigerNormal};
    font-size: 16px;
    font-weight: 400;
    color: ${COLORS.grey};
    margin-bottom: 5px;
  `,

  ButtonWrap: styled.div`
    display: flex;
    flex-direction: row-reverse;

    ${Media.mobile`
    justify-content:center;
    padding-top:10px;
    `}
  `,
  ContainerButton: styled.div`
    display: flex;
    align-items: center;
    margin-top: 40px;
  `,
  IconWrap: styled.div`
    display: flex;
    align-items: center;
    padding-right: 20px;
  `,
  GroupButtonWrap: styled.div`
    display: flex;
    max-width: 630px;
    overflow-x: hidden;

    ${Media.mobile`
    max-width: 252px;
    `}
  `,
  GroupButton: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    min-width: 111px;
    border-radius: 7px;
    border: 1px solid ${COLORS.lightBlue};
    font-size: 14px;
    color: ${COLORS.grey};
    margin-right: 15px;
    cursor: pointer;
  `,
  ArrowWrap: styled.div<{ isHide: boolean }>`
    height: 15px;
    width: 10px;
    display: ${({ isHide }) => !isHide && 'none'};
    align-items: center;
    padding-left: 10px;
    cursor: pointer;

    :hover {
      svg {
        path {
          stroke: ${COLORS.black};
          transition: 0.3s;
        }
      }
    }
  `,
};
