import styled from 'styled-components';

import { Media } from '../media';

export const Container = styled.div`
  position: relative;
  max-width: 1050px;
  padding: 0 25px;
  margin: 0 auto;

  ${Media.desktop`
    max-width: 1490px;
  `}
  ${Media.landscape`
    max-width: 900px;
  `}

  @media print {
    max-width: 1290px;
  }

  ${Media.smallLandscape`
    max-width: 750px;
  `}
`;
