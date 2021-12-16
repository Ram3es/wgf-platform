import styled from 'styled-components';

import { COLORS } from '@styles/colors';

export const LinkStyled = styled.a`
  text-decoration: none;
  color: ${COLORS.black};
  font-size: inherit;
  transition: 0.3s;
  font-weight: 500;

  :hover {
    opacity: 0.7;
  }
`;
