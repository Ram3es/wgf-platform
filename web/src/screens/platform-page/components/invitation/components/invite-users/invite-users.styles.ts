import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const InviteUsersStyled = {
  Wrapper: styled.div`
    h2 {
      font-family: ${FONTS.family.absideSmooth};
      font-weight: 400;
      margin-bottom: 25px;
    }
  `,
  Content: styled.div`
    display: flex;

    ${Media.tablet`
      display: block;
    `}
  `,
  Separator: styled.div`
    width: 3px;
    background-color: ${COLORS.white};
    box-shadow: 0px 100px 67px rgba(0, 0, 0, 0.07),
      0px 48.6528px 46.2072px rgba(0, 0, 0, 0.0510297),
      0px 29.2707px 26.1414px rgba(0, 0, 0, 0.0432562),
      0px 18.45px 13.7314px rgba(0, 0, 0, 0.0371871),
      0px 10.9957px 6.51949px rgba(0, 0, 0, 0.0308146),
      0px 5.10827px 2.31447px rgba(0, 0, 0, 0.0219847);

    ${Media.tablet`
      display: none;
    `}
  `,
};
