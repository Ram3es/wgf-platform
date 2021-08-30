import styled from 'styled-components';

import { FONT_SIZES } from '@styles/font-sizes';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const FormStyles = {
  Wrapper: styled.div`
    h2 {
      padding-top: 40px;
    }
  `,
  Form: styled.form`
    display: flex;
    flex-wrap: wrap;
    padding-top: 30px;
    margin: 0 -12px;

    ${Media.mobile`
      display: block;
    `}
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
};
