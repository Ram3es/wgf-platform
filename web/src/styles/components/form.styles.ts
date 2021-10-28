import styled from 'styled-components';

import { COLORS } from '@styles/colors';
import { Media } from '@styles/media';

import { Z_INDEX } from '@constants/z-indexes';

export const FormStyles = {
  Section: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 95px);
    min-height: 610px;
    padding: 0 20px;
  `,
  Wrapper: styled.div`
    position: relative;
    z-index: ${Z_INDEX.medium};
    max-width: 450px;
    width: 100%;
    padding: 40px;
    background-color: ${COLORS.authBg};
    box-shadow: 0px 75px 50.25px rgba(0, 0, 0, 0.07),
      0px 36.4896px 34.6554px rgba(0, 0, 0, 0.0510297),
      0px 21.953px 19.6061px rgba(0, 0, 0, 0.0432562),
      0px 13.8375px 10.2985px rgba(0, 0, 0, 0.0371871),
      0px 8.24679px 4.88962px rgba(0, 0, 0, 0.0308146),
      0px 3.8312px 1.73586px rgba(0, 0, 0, 0.0219847),
      0px -3px 1.73586px rgba(0, 0, 0, 0.0219847);
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
