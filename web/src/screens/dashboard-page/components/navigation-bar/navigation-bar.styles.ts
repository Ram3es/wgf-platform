import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { Media } from '@styles/media';

export const NavigationBarStyles = {
  Wrapper: styled.div`
    width: 300px;
    background: ${COLORS.authBg};
    border-top-right-radius: 20px;
    height: calc(100vh - 95px);
    min-height: 700px;
    padding: 45px 0 45px 35px;

    ${Media.landscapeWreck`
      width: 250px;
      padding: 45px 10px 45px 20px;
    `}
  `,
  Section: styled.div`
    margin-bottom: 40px;
  `,
  SectionTitle: styled.div<{ color: string }>`
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    span {
      color: ${({ color }) => color};
      text-transform: uppercase;
      margin-left: 5px;
    }
  `,
  Item: styled.div<{ isActive: boolean; section: string; color: string }>`
    display: flex;
    align-items: center;
    padding: 7.5px 0 7.5px 25px;
    cursor: pointer;
    position: relative;

    :hover {
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

    ${({ isActive, section, color }) =>
      isActive &&
      css`
        background: ${COLORS.white};
        border-radius: 7px 0px 0px 7px;

        ::after {
          content: '';
          display: block;
          position: absolute;
          background: ${color};
          border-radius: 0px 7px 7px 0px;
          top: 0;
          bottom: 0;
          width: 10px;
          right: -10px;
        }

        & > svg {
          path {
            stroke: ${section === 'assessment' ? 'none' : COLORS.black};
          }
        }

        span {
          color: ${COLORS.black};
        }
      `}
  `,
};
