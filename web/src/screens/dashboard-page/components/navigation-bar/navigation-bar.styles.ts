import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

import { Z_INDEX } from '@constants/z-indexes';

interface IStyledNavLink {
  section: string;
  color: string;
}

export const NavigationBarStyles = {
  Wrapper: styled.div<{ isActiveMenu: boolean }>`
    position: fixed;
    left: 0;
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
  BurgerMenu: styled.div`
    position: relative;
    display: none;
    padding: 10px 30px;
    min-height: 40px;
    z-index: ${Z_INDEX.medium};

    ${Media.tablet`
        display: block;
    `}

    ${Media.mobile`
      padding: 10px 20px;
    `}
  `,
  LineWrapper: styled.div`
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
        left: 20px;
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
        left: 20px;
        top: 16px;
        transform: rotate(-45deg);
        border-radius: 5px;
      `}
  `,
};
