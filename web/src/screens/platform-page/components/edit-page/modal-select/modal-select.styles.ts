import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import styled from 'styled-components';

export const ModalSelectStyles = {
  SortByDiv: styled.div`
    margin-left: auto;
    display: flex;
    width: 50px;
    justify-content: space-between;
    color: ${COLORS.grey};
    font-size: ${FONTS.sizes[13]};
    font-weight: 700;
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

  SortByTextIcon: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    > p {
      margin-right: 8px;
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
};
