import styled from 'styled-components';

import { FONT_SIZES } from '@styles/font-sizes';
import { Media } from '@styles/media';

export const FormStyles = {
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
    font-family: 'FrutigerLTStd-Bold';
    font-weight: 700;
    margin-bottom: 10px;

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
