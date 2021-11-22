import styled from 'styled-components';

import { COLORS } from '@styles/colors';

import { Z_INDEX } from '@constants/z-indexes';

export const DropDownStyled = {
  Wrapper: styled.div<{ isFullWidth?: boolean; maxWidth?: string }>`
    width: ${({ isFullWidth, maxWidth }) =>
      isFullWidth ? '100%' : maxWidth || '400px'};
    position: relative;
    min-width: 140px;
  `,
  Content: styled.div<{ maxHeight?: string }>`
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    z-index: ${Z_INDEX.medium};
    transform: translateY(-50%);
    background-color: ${COLORS.white};
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.15);
    font-weight: 500;
    color: ${COLORS.grey};
    max-height: ${({ maxHeight }) => maxHeight || '400px'};
    overflow: auto;
    border-radius: 8px;
  `,
  Item: styled.div`
    position: relative;
    padding: 5px 10px;
    cursor: pointer;
    transition: 0.3s;

    & > svg {
      width: 12px;
      height: 12px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 10px;
      path {
        transition: 0.3s;
      }
    }

    :hover {
      background-color: ${COLORS.grey};
      color: ${COLORS.white};

      svg {
        path {
          stroke: ${COLORS.white};
        }
      }
    }
  `,
  Label: styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;

    & > svg {
      margin-right: 5px;

      path {
        transition: 0.3s;
      }
    }
  `,
  BackDrop: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${Z_INDEX.low};
  `,
};
