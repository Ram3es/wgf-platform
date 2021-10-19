import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

export const TrainerRequestStyled = {
  Wrapper: styled.div`
    flex: 1 1 auto;
    display: flex;
    align-items: center;

    h2 {
      font-family: ${FONTS.family.absideSmooth};
      font-weight: 400;
      margin-bottom: 25px;
    }
  `,
  FormWrapper: styled.div`
    padding: 20px;
  `,
  FormLabelWrapper: styled.div`
    display: flex;
    align-items: center;
    min-width: 450px;

    & > * {
      flex: 1 1 auto;
    }
  `,
  Label: styled.span`
    flex: 0 1 20%;
    margin-right: 20px;
    margin-bottom: 15px;
    font-size: ${FONTS.sizes[15]};
    color: ${COLORS.grey};
    margin-bottom: 30px;
  `,
  FormControl: styled.div`
    display: flex;
    justify-content: center;
    padding-top: 20px;
  `,
};
