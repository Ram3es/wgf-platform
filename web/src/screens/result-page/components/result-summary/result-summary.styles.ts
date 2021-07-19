import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { Media } from '@styles/media';

export const ResultSummaryStyles = {
  CardWrapper: styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 0 -10px;

    break-before: always;

    @media print {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    ${Media.desktop`
    margin: 0 -25px;
    `}

    ${Media.landscape`
    margin: 0 -20px;
    `}

    ${Media.mobile`
      margin: 0 -3px;
    `}

    div:last-child div:nth-child(2) {
      ${Media.landscape`
      margin-top: -6%;
    `}
    }
  `,

  CardItem: styled.div`
    position: relative;
    flex: 0 1 20%;
    padding: 10px;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    page-break-inside: avoid;

    @media print {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;

      flex: 0 1 20%;
      padding: 10px;
    }

    ${Media.desktop`
      flex: 0 1 20%;
    `}
    ${Media.landscape`
      flex: 0 1 50%;
      padding: 20px;
    `}
    ${Media.mobile`
      padding: 3px;
    `}
  `,
  CardHeading: styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 -10px;

    img {
      width: 110%;
      max-width: none;
      vertical-align: bottom;

      ${Media.landscape`
        width: 100%;
        max-width: 100%;
      `}
      ${Media.desktop`
        width: 100%;
        max-width: 100%;
        min-height: 130px;
      `}
    }

    h2 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      letter-spacing: -1px;

      ${Media.mobile`
        font-size: 22px;
      `}
      ${Media.xsMobile`
        font-size: 20px;
      `}
    }
  `,
  CardBody: styled.div`
    background: ${COLORS.bgGrey};
    border-radius: 10px;
    margin-top: -25%;
    padding: 25px 10px;
    margin-bottom: 15px;

    &:last-child {
      margin-top: -6%;
    }

    ${Media.desktop`
      padding: 25px 30px;
    `}

    ${Media.landscape`
      padding: 25px 30px;
      margin-top: -20%;

      &:last-child {
      margin-top: -6% !important;
    }
    `}
    ${Media.mobile`
      padding: 15px;
    `}

    span {
      font-size: 16px;

      ${Media.mobile`
        font-size: 13px;
      `}
    }

    img {
      width: 100%;
    }

    & > strong {
      font-size: 50px;
      color: ${COLORS.grey};
      display: block;

      ${Media.mobile`
        font-size: 40px;
      `}
    }

    & > img {
      margin-top: -20px;
      min-height: 130px;
      vertical-align: bottom;

      ${Media.desktop`
        min-height: 180px;
      `}

      @media print {
        min-height: 170px;
      }
    }
  `,
  CardBodyFooter: styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 5px;
    align-items: center;

    strong {
      font-size: 26px;
      color: ${COLORS.grey};

      ${Media.mobile`
        font-size: 20px;
      `}
    }

    img {
      ${Media.mobile`
      width: 20px;
      height: 20px;
    `}

      ${Media.xsMobile`
      width: 15px;
      height: 15px;
    `}
    }
  `,
  CardDescriprion: styled.div`
    font-size: 16px;
  `,
  StarWrapper: styled.div`
    display: flex;
  `,

  CooperationImage: styled.div`
    img {
      ${Media.landscape`
        max-width: 100%;
        margin-left: 0;
      `}
    }
  `,
};
