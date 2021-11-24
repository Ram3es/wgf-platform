import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { Media } from '@styles/media';

export interface IBgContainerProps {
  isGreyBg?: boolean;
  isFullHeight?: boolean;
  isWithPadding?: boolean;
}

export const ResultPageStyled = {
  Root: styled.div<{ width?: string }>`
    display: flex;
    flex-direction: column;
    flex: 1 0 33.33%;
    max-width: ${({ width }) => (width ? width : '333px')};

    ${Media.smallLandscape`
      max-width: 100%;
    `}
  `,
  LogoContainer: styled.div<{ paddingLeft?: string }>`
    ${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft}`};
  `,
  BgContainer: styled.div<IBgContainerProps>`
    display: flex;
    flex-direction: column;

    ${({ isWithPadding = true }) => isWithPadding && 'padding: 8px 16px'};
    ${({ isFullHeight }) => isFullHeight && 'flex: 1'};
    ${({ isGreyBg }) => isGreyBg && `background-color:${COLORS.greyResult}`}
  `,
};
