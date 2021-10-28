import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

export const Spacer = styled.div<SpaceProps>`
  display: flex;
  justify-content: center;

  ${space}
`;
