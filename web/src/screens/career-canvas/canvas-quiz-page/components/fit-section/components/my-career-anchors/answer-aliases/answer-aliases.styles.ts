import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const AnswerAliasesStyled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Label: styled.div`
    text-align: center;
    padding: 0 5px;
    color: ${COLORS.grey};
    font-size: ${FONTS.sizes[14]};

    ${Media.mobile(css`
      font-size: ${FONTS.sizes[12]};
      padding: 0 2px;
    `)}

    ${Media.sMobile(css`
      font-size: ${FONTS.sizes[10]};
      padding: 0 2px;
    `)}
  `,
};
