import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { Media } from '@styles/media';

export const NextStepsStyles = {
  Wrapper: styled.div`
    padding: 30px 0;

    ${Media.mobile`
        padding: 30px 0 0;
      `}

    @media print {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;

      padding: 0;
    }
  `,
  CardWrapper: styled.div`
    padding: 20px 0;

    ${Media.mobile`
        padding: 20px 0 0;
      `}

    @media print {
      padding: 0;
    }
  `,
  CardItem: styled.div`
    position: relative;
    display: flex;
    border: 1px solid #c4c4c4;
    border-radius: 10px;
    margin-bottom: 20px;

    break-inside: avoid-page;

    ${Media.mobile`
      display: block;
    `}
  `,
  CardHeading: styled.div`
    padding: 20px 15px;
    background: ${COLORS.bgGrey};
    border-radius: 10px;
    min-width: 230px;

    ${Media.mobile`
        padding: 10px;
      `}

    & > div {
      display: flex;
      flex-direction: column;

      ${Media.mobile`
        flex-direction: row;
        align-items: baseline;
      `}

      @media print {
        flex-direction: row;
        align-items: baseline;
        min-width: 260px;
      }
    }

    span {
      margin-right: 5px;
      font-size: 16px;

      ${Media.mobile`
        font-size: 13px;
      `}

      @media print {
        margin-right: 15px;
      }
    }

    strong {
      font-size: 26px;
      padding: 5px 0;
      color: ${COLORS.grey};

      ${Media.mobile`
        font-size: 20px;
      `}
    }
  `,
  CardText: styled.div`
    padding: 25px;

    p {
      font-size: 16px;

      ${Media.mobile`
        font-size: 14px;
      `}
    }
  `,
};
