import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

export const BulkInviteStyled = {
  Wrapper: styled.div`
    flex: 0 1 45%;
    padding: 20px 40px 20px 60px;
  `,
  Title: styled.h3`
    color: ${COLORS.blue};
    font-weight: 900;
    font-size: ${FONTS.sizes[14]};
    margin-bottom: 20px;
  `,
  Content: styled.div`
    padding: 30px;
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid ${COLORS.white};
    box-shadow: 0px 20px 70px rgba(86, 89, 146, 0.1);
    border-radius: 20px;
  `,
  FileName: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    span {
      margin-left: 10px;
      font-size: ${FONTS.sizes[14]};
    }
  `,
  FileSuccess: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 30px;

    span {
      margin-left: 5px;
      color: ${COLORS.greenLite};
      font-size: ${FONTS.sizes[14]};
    }

    svg {
      width: 14px;
      height: 10px;

      path {
        stroke: ${COLORS.greenLite};
        stroke-width: 2px;
      }
    }
  `,
  Progress: styled.div`
    position: relative;
    height: 20px;
    background: ${COLORS.white};
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 30px;

    ::after {
      content: '';
      position: absolute;
      background-color: ${COLORS.blue};
      height: 100%;
      animation: progres 3s infinite linear;
    }
    @keyframes progres {
      0% {
        width: 0%;
      }
      25% {
        width: 50%;
      }
      50% {
        width: 75%;
      }
      75% {
        width: 85%;
      }
      100% {
        width: 100%;
      }
    } ;
  `,
};
