import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONT_SIZES } from '@styles/font-sizes';
import { Media } from '@styles/media';

export const PopUpStyles = {
  Wrapper: styled.div`
    position: absolute;
    top: -100px;
    left: 50%;
    z-index: 20;
    transform: translateX(-50%);
    padding: 85px 75px 65px;
    background: ${COLORS.white};
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    width: 100%;
    max-width: 1240px;

    p:first-child {
      margin-bottom: 20px;
    }

    ${Media.desktop`
      padding: 100px 170px 80px;
    `}

    ${Media.smallLandscape`
      top: -300px;
    `}

    ${Media.mobile`
      top: -350px;
      padding: 55px 25px;
    `}

    ${Media.sMobile`
      top: -400px;
    `}
    ${Media.xsMobile`
      padding: 20px 15px;
    `}
  `,
  Title: styled.div`
    border-top: 2px solid ${COLORS.greenLite};
    border-bottom: 2px solid ${COLORS.greenLite};
    margin: 40px 0 30px;

    ${Media.xsMobile`
      margin: 10px 0 10px;
    `}

    h2 {
      padding: 20px 0;

      ${Media.mobile`
        text-align: center;
      `}
    }
  `,
  Text: styled.p`
    font-size: ${FONT_SIZES.medium};
    color: ${COLORS.black};
    margin-bottom: 80px;

    ${Media.mobile`
      margin-bottom: 40px;
    `}
  `,
  RadioGroupWrapper: styled.div`
    display: flex;
    flex-wrap: wrap;

    & > * {
      min-width: 33.33%;

      ${Media.mobile`
      width: 100%;
    `}
    }
  `,
  BackDrop: styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.5);
  `,

  ButtonWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};
