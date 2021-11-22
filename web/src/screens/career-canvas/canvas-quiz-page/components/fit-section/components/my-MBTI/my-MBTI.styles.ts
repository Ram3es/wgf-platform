import styled from 'styled-components';

import { Media } from '@styles/media';

export const MyMBTIStyled = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 -20px;

    ${Media.tablet`
      flex-wrap: wrap;
      margin: 0;
    `}

    > * {
      flex: 0 1 25%;
      padding: 20px 20px 0 20px;

      ${Media.tablet`
        flex: 0 1 100%;
        padding: 0;
      `}
    }
  `,
  Title: styled.div`
    padding-top: 20px;

    ${Media.tablet`
      margin-bottom: 10px;
    `}
  `,
};
