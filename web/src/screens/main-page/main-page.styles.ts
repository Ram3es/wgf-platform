import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
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

    h1 {
      font-family: ${FONTS.family.absideSmooth};
      font-weight: 400;
    }
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
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 50px 0;

    button {
      padding: 1px 3px;
      color: ${COLORS.white};
      min-width: auto;
      min-height: auto;
      height: 28px;
      border-radius: 15px;
    }
  `,
  ButtonContainer: styled.div`
    display: flex;
    flex-wrap: wrap;

    justify-content: space-between;

    & > * {
      margin: 0 auto 10px;
    }
  `,
};
