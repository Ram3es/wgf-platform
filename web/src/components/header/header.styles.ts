import styled from 'styled-components';

import { Media } from '@styles/media';

export const HeaderStyles = {
  Wrapper: styled.div`
    padding: 40px 60px;
    display: flex;
    justify-content: space-between;

    ${Media.landscapeWreck`
      padding: 60px 60px 40px;
    `}

    ${Media.landscape`
      padding: 60px 25px 40px;
    `}

    ${Media.smallLandscape`
      flex-direction: column-reverse;
      align-items: center;
      padding: 40px 0 0;
    `}
  `,

  CompanyLogo: styled.div`
    position: relative;
    z-index: 1;

    ${Media.smallLandscape`
      margin-bottom: 60px;
    `}
    ${Media.mobile`
      margin-bottom: 80px;
    `}
  `,

  ProductLogo: styled.div`
    position: relative;
    z-index: 1;

    ${Media.mobile`
      max-width: 150px;
  `}
  `,
};
