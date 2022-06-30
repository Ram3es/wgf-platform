import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import styled from 'styled-components';

export const EditTableInfoStyles = {
  TableWrapper: styled.div`
    max-width: 462px;
    /* margin-left: 12px; */

    ${Media.tablet`
 padding: 20px;
`}

    ${Media.mobile`
 padding: 20px 0;
`}
  `,

  TableShadow: styled.div<{ ml?: number }>`
    padding: 45px 5px 20px 25px;
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid ${COLORS.white};
    box-shadow: 0px 20px 70px rgba(86, 89, 146, 0.1);
    border-radius: 20px;
    margin-left: ${({ ml }) => (ml ? `${ml}px` : '0')};
    margin-bottom: 50px;
    ${Media.landscapeWreck`
  margin-left: 0;
`}
  `,
  RowWrapper: styled.div`
    display: flex;
  `,

  Text: styled.div`
    width: 116px;
    color: ${COLORS.grey};
    font-family: ${FONTS.family.frutigerNormal};
    font-size: ${FONTS.sizes[16]};
    padding: 5px 5px 26px 0px;
  `,

  TextBold: styled.div`
    width: 250px;
    color: ${COLORS.grey};
    font-family: ${FONTS.family.frutigerBold};
    font-size: ${FONTS.sizes[16]};
    padding: 5px 5px 26px 5px;
    word-wrap: break-word;
  `,
  IconWrapper: styled.div`
    margin-right: 10px;
  `,
};
