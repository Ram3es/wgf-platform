import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';

export const NavBarStyles = {
  Wrapper: styled.div<{ isActiveMenu: boolean }>`
    width: 250px;
    background: ${COLORS.white};
    border-top-right-radius: 20px;
    min-height: calc(100vh - 95px);
    transition: 0.5s;

    ${Media.tablet`
position: absolute;
transform: translateY(-150%);
width: 100%;
border-top-right-radius: 0;
min-height: auto;

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
  NavBarWrapper: styled.div`
    display: none;
    margin-bottom: 20px;
    background-color: ${COLORS.greyImportance};

    ${Media.tablet`
display: flex;
flex-direction:column;
`}
    ${Media.mobile`
display: flex;
`};
  `,

  NavLink: styled.a`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding-left: 10px;
    padding-right: 20px;
    text-decoration: none;
    color: ${COLORS.black} !important;
    font-family: ${FONTS.family.frutigerNormal};
    font-size: ${FONTS.sizes[18]};
    font-weight: 500;
    cursor: pointer;
    border-bottom: 1px solid ${COLORS.borderGreyLight};
    svg {
      path {
        stroke: ${COLORS.black};
      }
    }

    :hover {
      opacity: 1;
      color: ${COLORS.grey} !important;
    }
  `,

  AboutModal: styled.div`
    font-size: ${FONTS.sizes[16]};
    padding-left: 20px;
    background-color: ${COLORS.white};
  `,

  AboutOptions: styled.div`
    display: flex;
    padding-left: 15px;
    align-items: center;
    line-height: 1.5;
    color: ${COLORS.black};
    cursor: pointer;
    height: 30px;
    :hover {
      color: ${COLORS.grey};
    }
    ${Media.smallLandscape(css`
      font-size: ${FONTS.sizes[14]};
    `)}
    a {
      text-decoration: none;
      font-family: ${FONTS.family.frutigerNormal};
      font-weight: 500;
      cursor: pointer;
      color: ${COLORS.black};
      :hover {
        opacity: 1;
        color: ${COLORS.grey} !important;
      }
      ${Media.smallLandscape(css`
        font-size: ${FONTS.sizes[14]};
      `)}
    }
    svg {
      margin-left: 20px;
      path {
        stroke: ${COLORS.black};
      }
    }
  `,
  ModalWGF: styled.div`
    margin-left: 40px;

    a {
      font-size: ${FONTS.sizes[13]};
      cursor: pointer;
      height: 30px;
      line-height: 1;
      display: flex;
      align-items: center;
    }
  `,
};
