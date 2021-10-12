import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import { Z_INDEX } from '@constants/z-indexes';

export const ModalStyles = {
  Wrapper: styled.div<{ width?: number }>`
    position: absolute;
    top: 110%;
    left: 50%;
    z-index: ${Z_INDEX.high};
    transform: translateX(-50%);
    padding: 50px;
    background: ${COLORS.white};
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    width: ${({ width }) => (width ? `${width}px` : 'auto')};
    max-width: ${({ width }) => (width ? `${width}px` : 'none')};

    p {
      font-size: ${FONTS.sizes[14]};
      color: ${COLORS.default};

      :first-of-type {
        margin-bottom: 10px;
      }
    }

    ${Media.sMobile`
      padding: 30px;
      width: 100%;
      max-width: none;
    `}
  `,
  BackDrop: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${Z_INDEX.medium};
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.5);
  `,
  CloseIcon: styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
  `,
};
