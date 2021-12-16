import styled from 'styled-components';

import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';

export const HeaderStyles = {
  Wrapper: styled.div`
    padding: 40px 60px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

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

    @media print {
      padding-bottom: 20px;
    }
  `,
  ProductLogo: styled.div`
    position: relative;
    z-index: ${Z_INDEX.low};
    padding-left: 5%;

    ${Media.smallLandscape`
      padding-left: 0;

      img {
        width: 275px;
        height: 45px;
      }
    `}
    ${Media.mobile`
      img {
        width: 205px;
        height: 45px;
      }
    `}
  `,
  CompanyLogo: styled.div`
    position: relative;
    z-index: ${Z_INDEX.low};

    ${Media.smallLandscape`
      margin-bottom: 60px;
    `}
    ${Media.mobile`
      margin-bottom: 65px;
    `}
  `,
};
