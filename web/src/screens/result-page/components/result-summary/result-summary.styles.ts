import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';
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
      width: 210px;
      height: 130px;

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
      text-transform: uppercase;
      font-size: ${FONT_SIZES.resultSummary};

      ${Media.mobile(css`
        font-size: ${FONT_SIZES.resultSummaryMobile};
      `)}
      ${Media.xsMobile(css`
        font-size: ${FONT_SIZES.resultSummaryXsMobile};
      `)}
    }
  `,
  CardBody: styled.div`
    background: ${COLORS.bgGrey};
    border-radius: 10px;
    margin-top: -8%;
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
      padding: 10px;
    `}

    span {
      font-size: ${FONT_SIZES.defaultMobile};

      ${Media.mobile(css`
        font-size: ${FONT_SIZES.small};
      `)}
    }

    & > strong {
      font-size: ${FONT_SIZES.scoreStrong};
      color: ${COLORS.grey};
      display: block;

      ${Media.mobile(css`
        font-size: ${FONT_SIZES.scoreStrongMobile};
      `)}

      ${Media.sMobile(css`
        font-size: ${FONT_SIZES.scoreStrongXsMobile};
      `)}
    }

    & > img {
      height: 150px;
      vertical-align: bottom;
      width: 100%;
      margin-top: -30px;

      ${Media.desktop`
        height: 180px;
      `}

      ${Media.landscape`
        height: auto;
        margin-top: -50px;
      `}

      ${Media.smallLandscape`
        margin-top: -20px;
      `}

      @media print {
        height: 185px;
      }
    }
  `,
  CardBodyFooter: styled.div<{ color?: string }>`
    display: flex;
    justify-content: space-between;
    padding-top: 5px;
    align-items: center;

    strong {
      font-size: ${FONT_SIZES.title2};
      color: ${({ color }) => (color ? color : COLORS.grey)};

      ${Media.mobile(css`
        font-size: ${FONT_SIZES.title2XsMobile};
      `)}

      ${Media.xsMobile(css`
        font-size: ${FONT_SIZES.defaultMobile};
      `)}
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
    font-size: ${FONT_SIZES.text};

    ${Media.mobile(css`
      font-size: ${FONT_SIZES.medium};
    `)}

    p {
      padding: 20px 0;

      ${Media.mobile`
        padding: 10px 0;
      `}
    }
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

  SuperPower: styled.div<{ color?: string }>`
    strong {
      display: block;
      color: ${({ color }) => (color ? color : COLORS.grey)};
    }

    img {
      margin-right: 5px;
    }
  `,

  ArchetypesWrapper: styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  ArchetypesIcon: styled.div`
    display: flex;
    margin-left: 15px;

    svg {
      width: 30px;
      height: 30px;

      :hover {
        path:first-of-type {
          fill: ${COLORS.greenLite};
        }
      }

      path {
        transition: 0.3s;
      }
    }
  `,
};
