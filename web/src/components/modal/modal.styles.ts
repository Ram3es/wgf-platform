import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import { Z_INDEX } from '@constants/z-indexes';

export const ModalStyles = {
  Wrapper: styled.div<{ width?: number }>`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: ${Z_INDEX.high};
    transform: translate(-50%, -50%);
    max-width: ${({ width }) => (width ? `${width}px` : 'none')};
    width: 100%;

    ${Media.mobile`
      max-width: none;
    `}
  `,
  Content: styled.div`
    width: 100%;
    position: relative;
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    background-color: ${COLORS.authBg};
    padding: 50px;
    p {
      font-size: ${FONTS.sizes[14]};
      color: ${COLORS.default};

      :first-of-type {
        margin-bottom: 10px;
      }
    }

    ${Media.mobile`
      padding: 25px;
    `}
  `,
  BackDrop: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${Z_INDEX.backDrop};
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.5);
  `,
  CloseIcon: styled.div`
    position: absolute;
    cursor: pointer;
    top: 20px;
    right: 20px;

    ${Media.mobile`
      top: 10px;
      right: 10px;
    `}
  `,
};
