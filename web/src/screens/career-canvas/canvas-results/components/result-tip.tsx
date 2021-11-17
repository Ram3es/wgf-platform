import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import styled from 'styled-components';

const Root = styled.p`
  padding: 4px 15px;
  background-color: ${COLORS.dark};
  font-size: ${FONTS.sizes[9]};
  color: ${COLORS.white};
`;

export const ResultTip = () => (
  <Root>
    This Career Design Canvas draws on decades of research from social
    scientists and career development practitioners. It is best complemented
    with the Career Design Simulation and other tools found on
    www.witgritfit.com
  </Root>
);
