import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { Media } from '@styles/media';

export const FormStyles = {
  Section: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    min-height: 600px;
    padding: 0 20px;
  `,
  Wrapper: styled.div`
    max-width: 450px;
    width: 100%;
    padding: 40px;
    background-color: ${COLORS.authBg};
    border-radius: 11.25px;

    ${Media.xsMobile`
      width: 290px;
      padding: 20px;
    `}
  `,
  Form: styled.form`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -12px;

    ${Media.mobile`
      display: block;
    `}
  `,

  Item: styled.div`
    flex: 0 1 100%;
    padding: 5px 12px;
  `,

  ControlPanel: styled.div`
    display: flex;
    justify-content: space-between;
  `,
};
