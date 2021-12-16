import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { Z_INDEX } from '@styles/z-indexes';

export const BackdropStyles = {
  Wrapper: styled.div`
    position: absolute;
    background: ${COLORS.backdropBg};
    box-shadow: inset 0px -13.5px 13.5px rgba(136, 130, 129, 0.1),
      inset 0px 13.5px 27px rgba(255, 255, 255, 0.15);
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    z-index: ${Z_INDEX.negative};
  `,
  Circle: styled.div`
    position: absolute;
    z-index: ${Z_INDEX.low};
    right: 0;
    top: 0;
  `,
  StarTop: styled.div`
    position: absolute;
    z-index: ${Z_INDEX.low};
    left: 0;
    top: 0;
  `,
  Oval: styled.div`
    position: absolute;
    z-index: ${Z_INDEX.low};
    left: 0;
    bottom: 0;
  `,
  StarBottom: styled.div`
    position: absolute;
    z-index: ${Z_INDEX.low};
    right: 0;
    bottom: 0;
  `,
};
