import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const NextStepsStyles = {
  Wrapper: styled.div`
    @media print {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    h1 {
      padding: 20px 0;
    }
  `,
  CardWrapper: styled.div`
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

    ${Media.tablet`
      display: block;
    `}
  `,
  CardHeading: styled.div<{ color?: string }>`
    padding: 20px 15px;
    background: ${COLORS.bgGrey};
    border-radius: 10px;
    min-width: 280px;

    @media print {
      min-width: 300px;
    }

    ${Media.mobile`
        padding: 10px;
      `}

    & > div {
      display: flex;
      align-items: baseline;
    }

    span {
      margin-right: 5px;
      font-size: ${FONTS.sizes[16]};
      white-space: nowrap;

      ${Media.mobile(css`
        font-size: ${FONTS.sizes[12]};
      `)}

      @media print {
        margin-right: 15px;
      }
    }

    strong {
      font-size: ${FONTS.sizes[26]};
      padding: 5px 0;
      color: ${({ color }) => (color ? color : COLORS.grey)};

      ${Media.mobile(css`
        font-size: ${FONTS.sizes[20]};
      `)}
    }

    h2 {
      text-transform: uppercase;
    }
  `,
  CardText: styled.div`
    padding: 25px;

    p {
      font-size: ${FONTS.sizes[16]};
      white-space: break-spaces;
      line-height: 19px;

      ${Media.mobile(css`
        font-size: ${FONTS.sizes[14]};
      `)}

      :first-of-type {
        margin-bottom: 15px;
      }
    }

    strong {
      display: block;
      font-size: ${FONTS.sizes[16]};
      font-weight: 700;
      font-family: ${FONTS.family.frutigerBold};
      margin-bottom: 15px;
    }
  `,
};
