import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const ResultSummaryStyles = {
  CardWrapper: styled.div<{ quiz: string }>`
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

      margin: ${({ quiz }) => (quiz === 'caas-quiz' ? '0 -25px' : '0 -15px')};
    }

    ${({ quiz }) =>
      Media.desktop(css`
        margin: ${quiz === 'caas-quiz' ? '0 -25px' : '0 -15px'};
      `)};

    ${({ quiz }) =>
      Media.landscape(css`
        margin: ${quiz === 'caas-quiz' ? '0 -10px' : '0 -20px'};
      `)};

    ${Media.smallLandscape`
      margin: 0 -20px;
    `}

    ${Media.mobile`
      margin: 0 -3px;
    `}
  `,

  CardItem: styled.div<{ quiz: string }>`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    position: relative;
    padding: 10px;
    flex: 0 1 ${({ quiz }) => (quiz === 'caas-quiz' ? '25%' : '20%')};

    page-break-inside: avoid;

    @media print {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;

      flex: 0 1 ${({ quiz }) => (quiz === 'caas-quiz' ? '25%' : '20%')};
      padding: ${({ quiz }) => (quiz === 'caas-quiz' ? '10px 30px' : '10px')};
    }
    ${({ quiz }) =>
      Media.desktop(css`
        padding: ${quiz === 'caas-quiz' ? '15px 30px' : '15px'};
      `)}
    ${({ quiz }) =>
      Media.landscape(css`
        flex: 0 1 ${quiz === 'caas-quiz' ? '25%' : '33.33%'};
        padding: ${quiz === 'caas-quiz' ? '20px 10px' : '20px'};
      `)}

    ${Media.smallLandscape`
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
  CardBody: styled.div<{ quiz: string }>`
    display: flex;
    flex-direction: column;
    flex: 1;
    background: ${COLORS.bgGrey};
    border-radius: 10px;
    margin-top: -8%;
    padding: ${({ quiz }) =>
      quiz === 'caas-quiz' ? '25px 20px' : '25px 10px'};
    margin-bottom: 15px;

    @media print {
      padding: ${({ quiz }) =>
        quiz === 'caas-quiz' ? '25px 35px' : '25px 15px'};
    }

    ${({ quiz }) =>
      Media.desktop(css`
        padding: ${quiz === 'caas-quiz' ? '25px 35px' : '25px 15px'};
      `)}

    ${({ quiz }) =>
      Media.landscape(css`
        padding: ${quiz === 'caas-quiz' ? '25px 10px' : '25px 30px'};
      `)}

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
        height: 190px;
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
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
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

  SuperPower: styled.div`
    display: flex;
    flex-wrap: wrap;

    strong {
      flex: 0 1 100%;
      font-weight: 700;
      font-family: ${FONTS.frutigerBold};
      color: ${COLORS.default};
      margin-left: 3px;

      ${Media.landscape`
        flex: 0 1 auto;
      `}
      ${Media.desktop`
        flex: 0 1 auto;
      `}
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

    h1 {
      @media print {
        margin-bottom: 15px;
      }
    }
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
