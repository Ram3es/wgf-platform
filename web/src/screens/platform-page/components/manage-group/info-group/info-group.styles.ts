import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { Media } from '@styles/media';
import { FONTS } from '@styles/fonts';

export const InfoGroupStyles = {
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: start;

    ${Media.mobile`
    justify-content: center;
   
    `}
  `,

  InfoContainer: styled.div`
    display: flex;
    height: auto;
    border: 2px solid ${COLORS.white};
    border-radius: 20px;
    background-color: ${COLORS.white};
    width: 80%;
    padding: 20px;

    ${Media.mobile`
    
    width: 100%;
    padding: 10px;
    `}
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 100%;
    margin-top: 20px;

    ${Media.mobile`
    width: 90%;
    `}
  `,
  DotsWrapper: styled.div`
    display: flex;
    width: 40%;
    height: fit-content;
    justify-content: end;
    ${Media.mobile`
    
    width: fit-content;
    margin-left:auto;
    `}
  `,
  Dots: styled.div`
    width: 20px;
    display: flex;
    justify-content: center;
    height: fit-content;
    padding: 3px;
    transition: 0.3s;
    cursor: pointer;

    :hover {
      opacity: 0.5;
    }
  `,
  Field: styled.div`
    height: auto;
    margin-bottom: 15px;

    div {
      font-size: ${FONTS.sizes[16]};
      color: ${COLORS.grey};
    }
  `,

  Rectangle: styled.div`
    position: relative;
    display: flex;
    justify-content: start;
    padding-left: 15px;
    border-radius: 7px 0px 0px 7px;
    align-items: center;
    background-color: ${COLORS.authBg};
    font-family: ${FONTS.family.frutigerNormal};

    width: 140px;
    height: 32px;
    z-index: 0;
    ${Media.mobile(css`
      font-size: ${FONTS.sizes[12]};
      width: 80px;
    `)}
    ${Media.sMobile(css`
      font-size: ${FONTS.sizes[12]};
      width: 80px;
      height: 40px;
      padding-left: 10px;
    `)}
  `,

  Arrow: styled.div`
    display: block;
    right: -12px;
    width: 23px;
    height: 23px;
    background-color: ${COLORS.authBg};
    position: absolute;
    transform: rotate(45deg);
    z-index: -1;
    ${Media.sMobile(css`
      width: 29px;
      height: 29px;
    `)}
  `,
  Space: styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
  `,
  Flex: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
  `,
  GroupName: styled.div`
    display: flex;
    align-items: center;
    margin-left: 35px;
    font-family: ${FONTS.family.frutigerBold};
  `,

  ControlWrapper: styled.div`
    transition: 0.3s;
    cursor: pointer;

    :hover {
      opacity: 0.5;
    }

    svg {
      path {
        stroke: ${COLORS.grey};
      }
    }
  `,
  InputWrapper: styled.div`
    position: relative;
    width: 60%;
    margin-left: 35px;

    div {
      margin-bottom: 0;
    }
  `,
  ServisBtn: styled.div`
    position: absolute;
    width: 40px;
    top: 7px;
    right: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      cursor: pointer;
    }
  `,
};
