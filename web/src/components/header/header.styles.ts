import styled from 'styled-components';

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
};
