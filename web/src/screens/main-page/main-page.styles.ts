import styled from 'styled-components';

import { Media } from '@styles/media';

export const MainPageStyles = {
  Banner: styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 100px 0;
    margin: 0 -5px;

    ${Media.smallLandscape`
      padding: 0 0 20px;
    `}

    & > * {
      flex: 0 1 50%;

      ${Media.tablet`
        flex: 0 1 100%;
      `}
    }
  `,
  BannerDescription: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  `,
  BannerText: styled.div`
    display: flex;
    align-items: center;
    flex: 1;

    p {
      margin-bottom: 20px;
    }
  `,
  BannerImage: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
  `,
  LogoWrapper: styled.div`
    padding: 50px 0;
  `,
};
