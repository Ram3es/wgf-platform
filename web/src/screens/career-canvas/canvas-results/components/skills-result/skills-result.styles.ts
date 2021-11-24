import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

export const SkillsResultStyled = {
  HeightContainer: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    > * {
      margin-top: 8px;
    }
  `,
  List: styled.dl`
    display: grid;
    grid-template-columns: repeat(3, auto);
    height: 100%;
    padding: 10px;
    background-color: ${COLORS.yellowLight};
    font-size: 8.5px;

    dt {
      @media print {
        font-family: ${FONTS.family.frutigerBold};
        color: ${COLORS.default};
      }
    }
  `,
  CriticalSkillsSection: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
  `,
  SkillAnswer: styled.dd`
    font-weight: 700;
    margin-top: 6px;
    color: ${COLORS.black};
  `,
  TechnicalSkillsAnswer: styled.div`
    padding: 10px;
    height: 60px;
    background-color: ${COLORS.yellowLight};
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};
