import styled from 'styled-components';

import { Media } from '@styles/media';

export const DashboardPageStyles = {
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
