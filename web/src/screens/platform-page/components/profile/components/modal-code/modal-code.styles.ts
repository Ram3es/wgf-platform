import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';

export const ModalStyles = {
  Modal: styled.div`
    position: absolute;
    width: 300px;
    top: 50%;
    left: 40%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    padding: 20px 20px;
    background-color: ${COLORS.white};
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
    z-index: ${Z_INDEX.low};
    border-radius: 20px;
    align-items: center;
    text-align: center;
    ${Media.tablet`
    left: 50%;
    `}
    svg {
      position: absolute;
      right: 0px;
      top: -6px;
      transform: rotate(45deg);
    }
  `,

  ModalText: styled.div`
    color: ${COLORS.grey};
    margin-bottom: 24px;
  `,

  Timer: styled.h3`
    margin-bottom: 15px;
  `,

  ButtonWrapper: styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    width: 300px;
    height: 150px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    padding: 20px 20px;
    background-color: ${COLORS.white};
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
    z-index: ${Z_INDEX.low};
    border-radius: 20px;
    align-items: center;
    text-align: center;

    svg {
      position: absolute;
      right: 0px;
      top: -6px;
      transform: rotate(45deg);
    }
  `,
  FormControl: styled.div`
    display: flex;
    justify-content: center;
    padding-top: 20px;
  `,
};
