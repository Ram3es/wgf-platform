import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const CanvasResultsStyled = {
  Root: styled.div`
    max-width: 1200px;
    width: 92%;
    margin: 20px auto;

    ${Media.smallLandscape`
      margin-bottom: 50px;
    `}

    @media print {
      width: 100%;
      margin: 50px auto;
    }
  `,
  ResultsContainer: styled.div`
    display: flex;
    font-size: ${FONTS.sizes[10]};
    color: ${COLORS.grey};
    background-color: ${COLORS.white};
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);

    ${Media.smallLandscape`
      flex-direction: column;
    `}

    @media print {
      box-shadow: none;
    }

    > *:not(:first-child) {
      border-left: 2px solid ${COLORS.black};

      ${Media.smallLandscape`
        border-left: none;
      `}
    }
  `,
  LeftPagesContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  RowContainer: styled.div`
    display: flex;
    flex-grow: 1;

    ${Media.smallLandscape`
      flex-direction: column;
    `}

    :not(:first-child) {
      border-top: 2px solid ${COLORS.black};
      padding-top: 5px;

      ${Media.smallLandscape`
        border-top: none;
      `}
    }
  `,
  TipBlock: styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  TipContainerDesktop: styled.div`
    ${Media.smallLandscape`
      display: none;
    `}
  `,
  TipContainerMobile: styled.div`
    display: none;

    ${Media.smallLandscape`
      display: block;
      margin-top: 25px;
    `}
  `,
  FlexContainer: styled.div`
    display: flex;

    ${Media.smallLandscape`
      flex-direction: column;
    `}
  `,
  ButtonsContainer: styled.div`
    margin-top: 40px;
  `,
};
