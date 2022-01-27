import styled from 'styled-components';

import { COLORS } from '@styles/colors';

export const ManageUsersStyles = {
  Wrapper: styled.div`
    border: 2px solid red;
  `,
  CustomInput: styled.div`
    display: flex;
  `,
  InputWrapper: styled.div`
    margin-left: auto;
    position: relative;
    input {
      padding: 5px;
      border-radius: 5px;
      width: 250px;
      height: 32px;
      border: 2px solid ${COLORS.grey};
    }
    input:focus {
      border: 2px solid ${COLORS.grey};
    }
  `,
  IconWrapper: styled.div`
    position: absolute;
    top: 7px;
    right: 40px;
  `,

  HeaderSectionWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
};
