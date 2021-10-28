import styled from 'styled-components';

import { Media } from '@styles/media';

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;

  padding: 40px 0;

  ${Media.mobile`
    padding: 20px 0;
  `}
`;
