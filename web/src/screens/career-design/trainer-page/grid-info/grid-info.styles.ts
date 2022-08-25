import { Media } from '@styles/media';
import styled from 'styled-components';
import { FONTS } from '@styles/fonts';
import { COLORS } from '@styles/colors';

export const GridInfoStyles = {
  Grid: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 5em 5em 5em;
    gap: 0 90px;

    ${Media.mobile`
    gap: 0 20px;
    `}
  `,
  FieldWrapper: styled.div`
    display: block;
  `,
  Field: styled.div`
    display: flex;
    height: 40px;
    width: 80%;
    border-radius: 12px;
    background-color: white;
    align-items: center;
    padding-left: 15px;
    font-size: ${FONTS.sizes[14]};
    color: ${COLORS.grey};
    ${Media.mobile`
    width: 100%;
    font-size:16px;
    `}
  `,
  Label: styled.div`
    width: 100%;
    padding-left: 5px;
    margin-bottom: 5px;
    color: ${COLORS.grey};
    font-size: ${FONTS.sizes[14]};
    font-family: ${FONTS.family.frutigerNormal};

    ${Media.mobile`
    display: flex;
    min-height: 32px;
    align-items: center;
`}
  `,
};
