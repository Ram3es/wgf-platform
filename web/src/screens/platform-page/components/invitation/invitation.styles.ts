import styled from 'styled-components';

import { Media } from '@styles/media';

export const InvitationStyles = {
  Content: styled.div`
    position: relative;
    padding: 0 30px;
    width: 100%;
    height: 100%;

    ${Media.desktop1600`
      padding: 0 70px;
    `}

    ${Media.landscape`
      padding: 0 20px;
    `}
  `,
};
