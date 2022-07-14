import { Z_INDEX } from './../../../../../../../styles/z-indexes';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import styled from 'styled-components';

export const CheckboxFormStyles = {
  Wraper: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    height: 26px;
    background-color: white;
    border-radius: 5px;
    padding: 2px 10px;
    font-size: ${FONTS.sizes[12]};
    ${Media.mobile`
    span{
      height: 15px;
    }
    `}
  `,
  CheckboxDiv: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    position: relative;
    div {
      display: flex;
      align-items: center;
      margin: 0 5px 0 0 !important;
    }
    svg {
      position: absolute;
      top: 8px !important;
      left: 3px !important;
      z-index: ${Z_INDEX.high}!important;
    }
    span {
      margin: 0 !important;
      align-items: center;
      text-align: center;
    }
  `,
};
