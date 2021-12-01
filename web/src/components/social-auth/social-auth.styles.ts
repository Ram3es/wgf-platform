import styled from 'styled-components';

import { COLORS } from '@styles/colors';

export const StyledSocialAuth = {
  Wrapper: styled.div`
    padding: 40px 0 0;
  `,
  Title: styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    border-bottom: 2px solid ${COLORS.grey};
    margin-bottom: 20px;

    span {
      position: absolute;
      bottom: -10px;
      padding: 0 10px;
      background-color: ${COLORS.authBg};
    }
  `,
  WrapperButtons: styled.div`
    display: flex;
    justify-content: center;
  `,
};

export const StyledIcon = styled.div`
  width: max-content;
  margin: 0 10px;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
`;
