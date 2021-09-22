import styled, { css } from 'styled-components';

import { FONT_SIZES } from '@styles/font-sizes';
import { Media } from '@styles/media';

export const ResourcesStyles = {
  Wrapper: styled.div`
    h1 {
      padding: 20px 0;
    }
  `,
  TextBlock: styled.div`
    padding: 20px 15px;
    border: 1px solid #c4c4c4;
    border-radius: 10px;
    min-height: 150px;
    margin-bottom: 40px;
    font-size: ${FONT_SIZES.text};

    ${Media.mobile(css`
      font-size: ${FONT_SIZES.small};
      margin-bottom: 20px;
    `)}
  `,
  List: styled.ol`
    font-size: ${FONT_SIZES.text};
    margin-left: 20px;
  `,
  ListItem: styled.li`
    padding: 10px 0;
  `,
};
