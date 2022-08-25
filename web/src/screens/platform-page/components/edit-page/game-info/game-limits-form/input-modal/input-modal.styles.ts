import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import styled from 'styled-components';

export const InputModalStyles = {
  Select: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 28px;
    position: absolute;
    background-color: ${COLORS.white};
    border-radius: 5px;
    top: 60px;
    z-index: -1;

    ${Media.mobile`
    top: 70px;

    span{
      display: flex;
      align-items: center;
      
    }
    `}
  `,
  CheckboxWrapper: styled.div`
    width: 100%;
    padding: 2px 14px;
    span {
      font: ${FONTS.family.frutigerNormal};
      font-size: ${FONTS.sizes[14]};
      color: ${COLORS.grey};
    }
  `,
};
