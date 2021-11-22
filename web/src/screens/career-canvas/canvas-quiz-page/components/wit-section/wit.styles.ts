import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const WitStyled = {
  DescriptionWrapper: styled.div`
    margin-bottom: 20px;

    ${Media.mobile(css`
      font-size: ${FONTS.sizes[14]};
    `)}
  `,
  QuestionWrapper: styled.div`
    display: flex;
    align-items: center;
  `,
  Label: styled.div`
    h3 {
      font-family: ${FONTS.family.frutigerNormal};
      font-weight: 400;
      text-transform: uppercase;

      ${Media.mobile(css`
        font-size: ${FONTS.sizes[18]};
      `)}
    }

    span {
      color: ${COLORS.grey};
      font-size: ${FONTS.sizes[16]};

      ${Media.mobile(css`
        font-size: ${FONTS.sizes[14]};
      `)}
    }
  `,
  Visual: styled.div`
    display: flex;
    margin-right: 15px;
    width: 50px;

    ${Media.mobile(css`
      width: 40px;
    `)}
  `,
  Control: styled.div`
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
  `,
};
