import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { Media } from '@styles/media';

export const ResultSummaryStyles = {
  CardWrapper: styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: center;
    margin: 0 -10px;

    break-before: always;

    @media print {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;

      margin: 0 -25px;
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
  `,

  CardItem: styled.div`
    position: relative;
    flex: 0 1 20%;
    padding: 10px;

    page-break-inside: avoid;

    @media print {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;

      flex: 0 1 20%;
      padding: 20px;
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
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 -10px;

    @media print {
      padding: 0 20px;
    }

    img {
      width: 180px;
      height: 120px;

      ${Media.landscape`
        width: 220px;
        height: 150px;
      `}
      ${Media.mobile`
        width: 150px;
        height: 100px;
      `}
      ${Media.xsMobile`
        width: 140px;
        height: 100px;
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
    margin-top: -10%;
    padding: 25px 10px;
    margin-bottom: 15px;

    @media print {
      padding: 25px 20px;
    }

    ${Media.desktop`
      padding: 25px 30px;
    `}

    ${Media.landscape`
      padding: 25px 30px;
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

      ${Media.mobile`
        min-height: auto;
      `}

      @media print {
        margin-top: -50px;
        min-height: 185px;
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

      ${Media.xsMobile`
        font-size: 16px;
      `}
    }

    img {
      ${Media.mobile`
        width: 20px;
        height: 20px;
      `}

      ${Media.sMobile`
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
