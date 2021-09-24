import styled from 'styled-components';

import { FONT_SIZES } from '@styles/font-sizes';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const QuizStyles = {
  Wrapper: styled.div`
    h2 {
      padding-top: 40px;
    }
  `,
  Label: styled.p`
    flex: 0 1 100%;
    padding: 0 12px;
    font-size: ${FONT_SIZES.medium};
    font-weight: 700;
    margin-bottom: 10px;
    font-family: ${FONTS.frutigerBold};

    ${Media.mobile`
      text-align: center;
    `}
  `,

  Item: styled.div`
    flex: 0 1 33.33%;
    padding: 5px 12px;
  `,

  ControlPanel: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  `,

  DownloadButton: styled.div`
    display: flex;
    justify-content: center;
  `,
};
