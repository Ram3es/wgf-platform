import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import styled from 'styled-components';

export const UserProgresStyles = {
  QuizFlex: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    ${Media.mobile`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between
    `};
  `,
  QuizName: styled.div`
    margin: 60px 0 25px;
    font-family: ${FONTS.family.frutigerBold};
    color: ${COLORS.grey};
    padding: 15px;

    ${Media.mobile`
    margin: 15px 0 ;
    `}
  `,
};
