import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';

interface IStyledNavLink {
  section: string;
  color: string;
}

export const NavigationBarStyles = {
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
  Section: styled.div`
    margin-bottom: 40px;

    ${Media.tablet`
      margin-bottom: 10px;
    `}
  `,
  SectionTitle: styled.div<{ color: string }>`
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    ${Media.tablet`
      margin-bottom: 5px;
    `}

    span {
      color: ${({ color }) => color};
      text-transform: uppercase;
      margin-left: 5px;

      ${Media.mobile(css`
        font-size: ${FONTS.sizes[15]};
      `)}
    }
  `,
  Item: styled(NavLink)<IStyledNavLink>`
    display: flex;
    align-items: center;
    padding: 7.5px 10px 7.5px 25px;
    cursor: pointer;
    position: relative;

    :hover {
      opacity: 1;

      svg {
        path {
          stroke: ${({ section }) =>
            section === 'assessment' ? 'none' : COLORS.black};
        }
      }

      span {
        color: ${COLORS.black};
      }
    }

    span {
      color: ${COLORS.grey};
      transition: 0.3s;

      ${Media.mobile(css`
        font-size: ${FONTS.sizes[16]};
      `)}
    }

    svg {
      margin-right: 7px;

      path {
        transition: 0.3s;
      }
    }

    img {
      margin-right: 7px;
    }

    &.selected {
      background-color: ${COLORS.white};
      border-radius: 7px 0px 0px 7px;

      ${Media.tablet(css`
        background: linear-gradient(
          to right,
          ${COLORS.white} 80%,
          transparent 20%
        );
      `)}

      ::after {
        content: '';
        display: block;
        position: absolute;
        background: ${({ color }) => color};
        border-radius: 0px 7px 7px 0px;
        top: 0;
        bottom: 0;
        width: 10px;
        right: -10px;

        ${Media.tablet`
            right: calc(20% - 5px);
          `}
      }

      & > svg {
        path {
          stroke: ${({ section }) =>
            section === 'assessment' ? 'none' : COLORS.black};
        }
      }

      span {
        color: ${COLORS.black};
      }
    }
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
    display: none;
    position: relative;
    padding: 10px 10px;
    min-height: 40px;
    z-index: ${Z_INDEX.medium};
    ${Media.tablet`
    display:block;
   padding: 10px 20px;
 `}
  `,
  LineWrapper: styled.div`
    margin-left: auto;
    cursor: pointer;
    width: 20px;
    height: 20px;
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
