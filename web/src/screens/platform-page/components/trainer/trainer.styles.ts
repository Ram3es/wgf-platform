import styled from 'styled-components';

import { Media } from '@styles/media';

export const TrainerStyles = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    padding: 35px 0;
    border-top-left-radius: 20px;
    overflow: hidden;
    min-height: calc(100vh - 95px);
    margin-left: 10px;

    ${Media.desktop1600`
      padding: 70px 0;
    `}

    ${Media.landscape`
      padding: 20px 0;
    `}

    ${Media.tablet`
      width: 100%;
      min-height: calc(100vh - 135px);
      border-top-left-radius: 0;
      margin-left: 0px;
    `}
    ${Media.sMobile`
      margin-left: 0px;
      `}
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
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

    ${Media.tablet`
      min-height: calc(100vh - 175px);
    `}
  `,
};
