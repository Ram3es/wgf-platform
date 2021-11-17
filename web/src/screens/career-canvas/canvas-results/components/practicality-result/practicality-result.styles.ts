import styled from 'styled-components';

import { COLORS } from '@styles/colors';

export const PracticalityResultStyled = {
  AnswersContainer: styled.div`
    margin-top: 4px;

    > * + * {
      margin-top: 15px;
    }
  `,
  LogoContainer: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    padding: 20px 0;
    background-color: ${COLORS.white};
  `,
};
