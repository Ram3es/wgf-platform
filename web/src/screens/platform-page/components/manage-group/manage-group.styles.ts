import styled from 'styled-components';

import { FONTS } from '@styles/fonts';
import { COLORS } from '@styles/colors';
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
    margin: 40px 0;
  `,
  IconWrap: styled.div`
    display: flex;
    align-items: center;
    padding-right: 20px;
  `,
  GroupButtonWrap: styled.div`
    display: flex;
    max-width: 725px;
    overflow-x: hidden;
    align-items: center;
    height: 50px;

    ${Media.mobile`
    max-width: 300px;
    `}
  `,
  GroupButton: styled.div<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 38px;
    min-width: 130px;
    border-radius: 7px;
    border: ${({ isActive }) =>
      isActive ? 'none' : `1px solid ${COLORS.lightBlue}`};
    font-size: 14px;
    color: ${({ isActive }) =>
      isActive ? `${COLORS.default}` : `${COLORS.grey}`};
    margin-right: 15px;
    padding: 0 10px;
    background: ${({ isActive }) => isActive && `${COLORS.white}`};
    cursor: pointer;
    transition: 0.3s;

    :hover {
      box-shadow: ${({ isActive }) =>
        !isActive && '0px 2px 5px rgba(0, 0, 0, 0.4)'};
    }
  `,
  ArrowWrap: styled.div<{ isHide: boolean; left?: boolean }>`
    height: 15px;
    width: 10px;
    display: ${({ isHide }) => !isHide && 'none'};
    align-items: center;
    padding-left: 10px;
    cursor: pointer;
    transform: ${({ left }) => left && 'rotate(180deg)'};

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
