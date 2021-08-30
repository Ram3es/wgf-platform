import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';

export const QuickSummaryStyles = {
  Wrapper: styled.div`
    padding: 10px;
    overflow-x: auto;
    margin: 0 -10px 20px;

    h1 {
      padding: 20px 0;
    }
  `,
  Heading: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & > * {
      flex: 0 1 16.66%;
    }
  `,
  Content: styled.div`
    min-width: 1100px;
  `,
  HeadingItem: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: ${COLORS.bgGrey};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    padding: 5px;

    :not(:first-child) {
      margin-left: 20px;
    }

    img {
      width: 180px;
      height: 110px;
    }

    h2 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      letter-spacing: -1px;
      text-transform: uppercase;
      font-size: ${FONT_SIZES.title2Mobile};
    }
  `,
  HeadingTitle: styled.div`
    font-weight: 700;
    color: ${COLORS.grey};
  `,
  Row: styled.div`
    display: flex;
    position: relative;
    border-radius: 10px;

    ::after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      top: 10px;
      bottom: 10px;
      background: rgba(255, 255, 255, 0.5);
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }

    :last-child {
      & > div {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }
  `,

  RowItem: styled.div`
    flex: 0 1 16.66%;
    padding: 30px 10px 50px;

    min-height: 90px;

    :not(:first-child) {
      background: ${COLORS.bgGrey};
      margin-left: 20px;
    }

    p {
      position: relative;
      z-index: 5;
    }
  `,
  TitleStrong: styled.strong<{ color?: string }>`
    font-weight: 700;
    position: relative;
    z-index: 5;
    color: ${({ color }) => (color ? color : COLORS.default)};
  `,
};
