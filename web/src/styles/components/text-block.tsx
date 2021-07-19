import styled from 'styled-components';

import { Media } from '@styles/media';

export const TextBlockStyles = styled.div`
  padding: 20px 15px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  min-height: 150px;
  margin-bottom: 40px;
  font-size: 16px;

  ${Media.mobile`
    font-size: 13px;
    margin-bottom: 20px;
  `}
`;
