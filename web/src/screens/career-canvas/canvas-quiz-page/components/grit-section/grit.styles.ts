import styled, { css } from 'styled-components';

import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const GritStyled = {
  DescriptionWrapper: styled.div`
    strong {
      font-family: ${FONTS.family.frutigerBold};
      ${Media.mobile(css`
        font-size: ${FONTS.sizes[14]};
      `)}
    }

    p {
      margin-bottom: 20px;
      ${Media.mobile(css`
        font-size: ${FONTS.sizes[14]};
      `)}
    }
  `,
  Title: styled.div`
    h3 {
      font-family: ${FONTS.family.frutigerNormal};
      font-weight: 400;
      text-transform: uppercase;

      ${Media.mobile(css`
        font-size: ${FONTS.sizes[18]};
      `)}
    }
  `,
  Control: styled.div`
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
  `,
};
