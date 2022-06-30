import styled from 'styled-components';
import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';

export const GameInfoStyles = {
  GameInfoWrapper: styled.div`
    height: auto;
    margin: auto;
    border: 2px solid #5448a9;
    border-radius: 20px;
  `,
  Header: styled.div`
    display: flex;
    margin: 35px;
    width: auto;
  `,

  IconWrapper: styled.div`
    display: flex;
    align-items: center;
    margin-right: 15px;
  `,
  TitleWrapper: styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    ${Media.inspector15`
     width: 79%
    `}
  `,
  IconShadow: styled.div`
    width: 40px;
    position: absolute;
    right: 5px;
    z-index: ${Z_INDEX.low};
  `,
  IconShadowDark: styled.div`
    width: 40px;
    position: absolute;
    top: -9.5px;
    right: 19.5px;
    z-index: ${Z_INDEX.low};
  `,
};
