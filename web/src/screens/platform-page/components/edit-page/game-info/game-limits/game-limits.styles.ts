import { Media } from '@styles/media';
import styled from 'styled-components';

export const GameLimitsStyles = {
  FormWrapper: styled.div`
    display: grid;
    position: relative;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 5em;

    margin: 25px 75px 40px 75px;
    align-content: center;
    justify-content: center;

    ${Media.mobile`
    margin: 25px 25px;
    grid-gap: 15px;

    span {
      height:28px
    }


    `};
  `,
};
