import styled from 'styled-components';

import { Media } from '@styles/media';

export const PlatformPageStyles = {
  Wrapper: styled.div`
    display: flex;
    justify-content: flex-end;

    ${Media.tablet`
      display: block;

      & > * {
        width: 100%;
      }
    `}
  `,
};
