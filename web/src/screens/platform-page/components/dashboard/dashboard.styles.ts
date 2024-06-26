import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';

export const DashboardStyles = {
  Wrapper: styled.div`
    position: relative;
    display: flex;
    width: 100%;
    min-height: calc(100vh - 95px);
    padding: 35px 0;
    border-top-left-radius: 20px;
    overflow: hidden;
    margin-left: 10px;

    ${Media.tablet`
      border-top-left-radius: 0;
      width: 100%;
      min-height: calc(100vh - 135px);
      margin-left: 0px;
    `}
    ${Media.sMobile`
      margin-left: 0px;
      `}
  `,
  Content: styled.div`
    position: relative;
    z-index: ${Z_INDEX.medium};
    padding: 0 40px;
    width: 100%;
    text-align: center;

    p {
      padding-top: 50px;
      font-size: ${FONTS.sizes[35]};
      color: ${COLORS.grey};
      font-family: ${FONTS.family.absideSmooth};
    }
  `,
};
