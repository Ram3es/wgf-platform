import styled from 'styled-components';

import { FONTS } from '@styles/fonts';

export const Styled = {
  TitleContainer: styled.div`
    display: flex;
    align-items: center;
    font-size: ${FONTS.sizes[12]};

    > * + * {
      margin-left: 16px;
    }
  `,
  Title: styled.b`
    text-transform: capitalize;
    font-weight: 400;
    font-size: ${FONTS.sizes[12]};
  `,
  ImageContainer: styled.div`
    display: flex;
    justify-content: center;
    width: 26px;
    height: 19px;
  `,
  ProgressContainer: styled.div`
    flex: 1;
  `,
};
