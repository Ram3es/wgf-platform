import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';

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
  Wrapper: styled.div<{ isActiveMenu: boolean }>`
    width: 250px;
    background: ${COLORS.authBg};
    border-top-right-radius: 20px;
    min-height: calc(100vh - 95px);
    padding: 45px 0 45px 20px;
    transition: 0.5s;

    ${Media.tablet`
   position: absolute;
   transform: translateY(-150%);
   width: 100%;
   border-top-right-radius: 0;
   min-height: auto;
   padding: 20px;
 `}

    ${({ isActiveMenu }) =>
      isActiveMenu &&
      css`
        & {
          position: relative;
          transform: translateY(0);
        }
      `}
  `,
  BurgerMenuWrapper: styled.div`
    display: none;
    ${Media.tablet`
 display: block;
`}

    ${Media.mobile`
display: block;
`}
  `,
  BurgerMenu: styled.div`
    position: relative;
    padding: 10px 10px;
    min-height: 40px;
    z-index: ${Z_INDEX.medium};
    ${Media.mobile`
padding: 10px 20px;
`}
  `,
  LineWrapper: styled.div`
    margin-left: auto;
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-right: 20px;
  `,

  LineTop: styled.div<{ isActiveMenu: boolean }>`
    width: 20px;
    height: 2px;
    margin-bottom: 4px;
    background-color: ${COLORS.default};
    transition: 0.3s;
    ${({ isActiveMenu }) =>
      isActiveMenu &&
      css`
        position: absolute;
        right: 20px;
        transform: rotate(45deg);
        border-radius: 5px;
        top: 16px;
      `}
  `,

  LineMiddle: styled.div<{ isActiveMenu: boolean }>`
    width: 15px;
    height: 2px;
    margin-bottom: 4px;
    background-color: ${COLORS.default};

    ${({ isActiveMenu }) =>
      isActiveMenu &&
      css`
        display: none;
      `}
  `,

  LineBottom: styled.div<{ isActiveMenu: boolean }>`
    width: 20px;
    height: 2px;
    background-color: ${COLORS.default};
    transition: 0.3s;

    ${({ isActiveMenu }) =>
      isActiveMenu &&
      css`
        position: absolute;
        right: 20px;
        top: 16px;
        transform: rotate(-45deg);
        border-radius: 5px;
      `}
  `,
};
