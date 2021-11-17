import styled from 'styled-components';

import { FONTS } from '@styles/fonts';

export const ResultImportanceStyled = {
  Root: styled.div`
    display: flex;
    font-size: ${FONTS.sizes[12]};
  `,
  TitleContainer: styled.div`
    display: flex;
    align-items: center;
    width: 180px;

    > * + * {
      margin-left: 5px;
    }
  `,
  Title: styled.b`
    font-weight: 400;
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
