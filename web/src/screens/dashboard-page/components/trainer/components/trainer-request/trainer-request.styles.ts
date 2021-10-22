import styled from 'styled-components';

import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const TrainerRequestStyled = {
  Wrapper: styled.div`
    flex: 1 1 auto;
    display: flex;
    align-items: center;

    ${Media.mobile`
      width: 100%;
    `}

    h2 {
      font-family: ${FONTS.family.absideSmooth};
      font-weight: 400;
      margin-bottom: 25px;
    }
  `,
  Content: styled.div`
    ${Media.mobile`
      width: 100%;
    `}
  `,
  FormWrapper: styled.div`
    padding: 20px;

    ${Media.mobile`
      padding: 0;
    `}
  `,
  FormLabelWrapper: styled.div`
    display: flex;
    align-items: center;
    min-width: 450px;

    & > * {
      flex: 1 1 auto;
    }

    ${Media.mobile`
      min-width: 100%;
    `}
  `,
  FormControl: styled.div`
    display: flex;
    justify-content: center;
    padding-top: 20px;
  `,
};
