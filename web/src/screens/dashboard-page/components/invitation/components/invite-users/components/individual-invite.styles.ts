import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

export const IndividualInviteStyled = {
  Wrapper: styled.div`
    flex: 0 1 55%;
    padding: 20px 60px 20px 40px;
  `,
  Title: styled.h3`
    color: ${COLORS.blue};
    font-weight: 900;
    font-size: ${FONTS.sizes[14]};
    margin-bottom: 20px;
  `,
  FormWrapper: styled.div`
    position: relative;
  `,
  SelectWrapper: styled.div`
    position: absolute;
    right: 0;
    top: 50%;
    width: calc(70% - 10px);
  `,
};
