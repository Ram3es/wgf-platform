import styled, { css } from 'styled-components';

import { FONTS } from '@styles/fonts';
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
    font-size: ${FONTS.sizes[16]};

    ${Media.mobile(css`
      font-size: ${FONTS.sizes[12]};
      margin-bottom: 20px;
    `)}
  `,
  List: styled.ol`
    font-size: ${FONTS.sizes[16]};
    margin-left: 20px;
  `,
  ListItem: styled.li`
    padding: 10px 0;
  `,
};
