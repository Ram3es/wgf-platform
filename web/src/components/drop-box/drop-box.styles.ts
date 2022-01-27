import styled from 'styled-components';

import { COLORS } from '@styles/colors';

interface IDropBoxStyles {
  isDragAccept: boolean;
  isDragReject: boolean;
  isDragActive: boolean;
}

const getColor = (props: IDropBoxStyles) => {
  if (props.isDragAccept) {
    return COLORS.greenLight;
  }
  if (props.isDragReject) {
    return COLORS.red;
  }
  if (props.isDragActive) {
    return COLORS.lightBlue;
  }
  return COLORS.white;
};

export const StyledDropBox = {
  Wrapper: styled.div<IDropBoxStyles>`
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid ${(props) => getColor(props)};
    box-shadow: 0px 20px 70px rgba(86, 89, 146, 0.1);
    border-radius: 20px;
    cursor: pointer;
  `,
  Text: styled.p`
    padding-top: 10px;

    span {
      display: block;
    }

    strong {
      text-align: center;
      font-weight: 400;
      color: ${COLORS.lightBlue};
      text-decoration: underline;
    }
  `,
  ProcessingText: styled.p`
    padding-top: 15px;
  `,
};
