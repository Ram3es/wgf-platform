import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { Media } from '@styles/media';

export const CanvasQuizPageStyled = {
  Container: styled.div`
    position: relative;
    max-width: 1250px;
    padding: 0 25px;
    margin: 0 auto;

    ${Media.landscape`
      max-width: 970px;
    `}

    ${Media.smallLandscape`
      max-width: 800px;
    `}

    ${Media.mobile`
      padding: 0;
    `}
  `,
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;

    ${Media.smallLandscape`
      flex-wrap: wrap;
    `}
  `,
  SectionWrapper: styled.div<{ color: string }>`
    flex: 0 1 75%;
    border-style: solid;
    border-width: 9px 0 9px 0;
    border-color: ${({ color }) => color};
    background-color: ${COLORS.sectionBg};
    padding: 30px;
    margin-left: 15px;
    margin-bottom: 20px;

    ${Media.smallLandscape`
      flex: 0 1 100%;
      margin-left: 0;
    `}

    ${Media.mobile`
      padding: 20px;
    `}
  `,
  CsvButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  `,
};
