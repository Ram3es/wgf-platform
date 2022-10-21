import styled from 'styled-components';

import { COLORS } from '@styles/colors';

export const StyledSocialAuth = {
  Wrapper: styled.div``,
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
      background-color: ${COLORS.white};
    }
  `,
  WrapperButtons: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  `,
};

export const StyledIcon = styled.div`
  display: flex;
  position: relative;
  margin: 0 10px;
  cursor: pointer;
  margin-bottom: 20px;

  :hover {
    opacity: 0.7;
  }
`;
