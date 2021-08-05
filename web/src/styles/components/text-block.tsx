import styled, { css } from 'styled-components';

import { FONT_SIZES } from '@styles/font-sizes';
import { Media } from '@styles/media';

export const TextBlockStyles = styled.div`
  padding: 20px 15px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  min-height: 150px;
  margin-bottom: 40px;
  font-size: ${FONT_SIZES.defaultMobile};

  ${Media.mobile(css`
    font-size: ${FONT_SIZES.small};
    margin-bottom: 20px;
  `)}
`;
