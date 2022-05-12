import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';

export const HeaderStyles = {
  Wrapper: styled.header`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${COLORS.white};
    padding: 22px 30px;
    z-index: ${Z_INDEX.extraMedium};

    ${Media.tablet`
      position: relative;
    `}

    ${Media.mobile`
      padding: 22px 20px;
    `}

    @media print {
      display: none;
    }

    button {
      padding: 1px 3px;
      color: ${COLORS.white};
      min-width: auto;
      min-height: auto;
      height: 28px;
      border-radius: 15px;
    }
  `,
  LoginedWrapper: styled.div`
    position: relative;
  `,
  LoginedContent: styled.div<{ isActive: boolean }>`
    display: flex;
    align-items: center;
    cursor: pointer;

    :hover {
      opacity: 0.7;

      & > span::after {
        transform: translateY(-50%) rotate(90deg);
      }
    }

    ::after {
      content: '';
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4px 0 4px 6px;
      border-color: transparent transparent transparent ${COLORS.black};
      transition: 0.3s;
      transform: translateY(-50%)
        ${({ isActive }) => isActive && 'rotate(90deg)'};
    }

    & > span {
      position: relative;
      font-size: ${FONTS.sizes[14]};
      font-weight: 700;
      padding-right: 10px;

      ${Media.mobile`
        display: none;
      `}
    }
  `,
  AvatarWrapper: styled.div`
    height: 40px;
    width: 40px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 10px;

    @media print {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  `,

  LoginDropdown: styled.div`
    position: absolute;
    width: 100%;
    bottom: -40px;
    right: -5px;
    min-width: 150px;
    z-index: ${Z_INDEX.extraMedium};

    span {
      font-size: ${FONTS.sizes[16]};
    }
  `,

  NavLinkWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin-left: auto;
    margin-right: 50px;
    ${Media.landscape`
      width:60%;
    `}
    ${Media.smallLandscape(css`
      margin-right: 10px;
    `)}
    ${Media.tablet`
      display: none;
    `}
    ${Media.mobile`
    display: none;
    `}
  `,

  NavLink: styled.a`
    display: flex;
    text-decoration: none;
    color: ${COLORS.grey} !important;
    font-family: ${FONTS.family.absideSmooth};
    font-size: ${FONTS.sizes[16]};
    font-weight: 500;
    cursor: pointer;
    height: 51px;
    align-items: center;
    ${Media.smallLandscape(css`
      font-size: ${FONTS.sizes[13]};
      max-width: 100px;
      margin-left: 10px;
    `)}
    :hover {
      opacity: 0.7;
      color: ${COLORS.grey};
    }
  `,

  About: styled.div`
    display: flex;
    position: relative;
    color: ${COLORS.grey};
    font-family: ${FONTS.family.absideSmooth};
    font-size: ${FONTS.sizes[16]};
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;
    height: 51px;
    align-items: center;
    ${Media.smallLandscape(css`
      font-size: ${FONTS.sizes[14]};
    `)}
    :hover {
      color: ${COLORS.grey};
    }
  `,

  AboutModal: styled.div`
    position: absolute;
    background-color: ${COLORS.white};
    width: 210px;
    top: 40px;
    left: 0px;
    border-radius: 5px;
    font-family: ${FONTS.family.frutigerNormal};
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
  `,
  AboutOptions: styled.div`
    padding: 10px 15px 10px 15px;
    font-size: ${FONTS.sizes[16]};
    align-items: center;
    line-height: 1.5;
    opacity: 1;
    ${Media.smallLandscape(css`
      font-size: ${FONTS.sizes[14]};
    `)}
    :hover {
      opacity: 1;
      background-color: ${COLORS.greyLight};
      color: ${COLORS.black};
      transition: 0.3s;
    }
    a {
      text-decoration: none;
      color: ${COLORS.grey} !important;
      font-family: ${FONTS.family.frutigerNormal};
      font-size: ${FONTS.sizes[16]};
      font-weight: 500;
      cursor: pointer;
      ${Media.smallLandscape(css`
        font-size: ${FONTS.sizes[14]};
      `)}
      :hover {
        opacity: 1;
        color: ${COLORS.black} !important;
      }
    }
  `,
  ModalWGF: styled.div`
    position: absolute;
    background-color: ${COLORS.white};
    width: 210px;
    top: 0px;
    left: 210px;
    border-radius: 5px;
    font-family: ${FONTS.family.frutigerNormal};
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
  `,
};
