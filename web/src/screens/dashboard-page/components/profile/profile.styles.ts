import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const ProfileStyles = {
  Wrapper: styled.div`
    width: calc(100% - 310px);

    ${Media.landscapeWreck`
      width: calc(100% - 260px);
    `}
  `,
  ContentWrapper: styled.div`
    display: flex;
    width: 100%;
    padding: 15px 75px 0;
    max-width: 1400px;

    ${Media.landscapeWreck`
      padding: 0 25px 0;
    `}

    ${Media.smallLandscape`
      flex-wrap: wrap;
    `}
  `,
  AvatarColumn: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 1 20%;
    min-width: 200px;
    margin-right: 50px;

    ${Media.smallLandscape`
      flex: 0 1 100%;
      padding-top: 0;
      margin-right: 0;
    `}
  `,
  AvatarWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 250px;
    width: 100%;
  `,
  Avatar: styled.div`
    width: 130px;
    height: 130px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
    }
  `,
  NameTitle: styled.div`
    margin-bottom: 30px;

    h2 {
      font-family: ${FONTS.family.absideSmooth};
      font-weight: 400;
      font-size: ${FONTS.sizes[28]};

      ${Media.tablet(css`
        font-size: ${FONTS.sizes[24]};
      `)}

      ${Media.mobile(css`
        font-size: ${FONTS.sizes[20]};
      `)}
    }
  `,
  SubmitAvatar: styled.div<{ isDisabled?: boolean }>`
    display: flex;
    cursor: pointer;

    ${({ isDisabled }) =>
      isDisabled &&
      css`
        cursor: not-allowed;
        svg {
          opacity: 0.5;
        }
      `}
  `,
  ProfileColumn: styled.div`
    flex: 1 1 auto;
    padding: 0 50px 25px;

    ${Media.landscapeWreck`
      padding: 0 0 25px;
    `}

    ${Media.smallLandscape`
      flex: 0 1 100%;
    `}
  `,
  SectionProfile: styled.div`
    margin-bottom: 10px;
  `,
  ProfileTitle: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  `,
  EditButton: styled.div`
    display: flex;
    cursor: pointer;

    :hover {
      svg {
        path {
          stroke: ${COLORS.black};
        }
      }
    }

    svg {
      path {
        transition: 0.3s;
      }
    }
  `,
  Line: styled.div`
    height: 1.5px;
    background-color: ${COLORS.line};
    margin-bottom: 20px;
  `,
};

export const ProfileSectionFormStyles = {
  FormLabelWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > div {
      flex: 0 1 80%;
    }
  `,
  Label: styled.span`
    flex: 0 1 30%;
    margin-right: 20px;
    margin-bottom: 15px;
    font-size: ${FONTS.sizes[15]};
    color: ${COLORS.grey};
  `,
  FormItem: styled.div<{ type?: string }>`
    & > * {
      margin-bottom: ${({ type }) => (type === 'password' ? '30px' : '20px')};
    }
  `,
  FormControl: styled.div`
    display: flex;
    justify-content: center;
    padding-top: 15px;

    & > :first-child {
      margin-right: 30px;
    }
  `,
};
