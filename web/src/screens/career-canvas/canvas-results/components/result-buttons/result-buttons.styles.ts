import styled from 'styled-components';

import { Button } from '@components/button';
import { Media } from '@styles/media';

export const ResultButtonsStyled = {
  Root: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;

    > * + * {
      margin-left: 20px;
    }

    ${Media.smallLandscape`
      margin-top: 30px;
      flex-direction: column;
      align-items: center;

      > * + * {
        margin-left: 0;
        margin-top: 20px;
      }
    `}
  `,
  Button: styled(Button)`
    width: 250px;
    height: 54px;
  `,
};
