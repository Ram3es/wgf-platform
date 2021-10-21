import styled from 'styled-components';

import { Media } from '@styles/media';

export const InvitationStyles = {
  Wrapper: styled.div`
    position: relative;
    width: calc(100% - 260px);
    padding: 35px 0;
    border-top-left-radius: 20px;
    overflow: hidden;
    min-height: calc(100vh - 95px);

    ${Media.desktop1600`
      padding: 70px 0;
    `}

    ${Media.landscape`
      padding: 20px 0;
    `}
  `,
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
