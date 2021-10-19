import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

import { Z_INDEX } from '@constants/z-indexes';

export const DashboardStyles = {
  Wrapper: styled.div`
    position: relative;
    display: flex;
    width: calc(100% - 260px);
    min-height: calc(100vh - 95px);
    padding: 35px 0;
    border-top-left-radius: 20px;
    overflow: hidden;
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
