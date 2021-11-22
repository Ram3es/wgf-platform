import styled from 'styled-components';

import { Media } from '@styles/media';

export const SelectQuestionStyled = {
  FormWrapper: styled.div`
    position: relative;
  `,
  SelectWrapper: styled.div`
    position: absolute;
    right: 0;
    top: 50%;
    width: calc(100% - 20px);

    ${Media.tablet`
      width: 100%;
    `}
  `,
};
