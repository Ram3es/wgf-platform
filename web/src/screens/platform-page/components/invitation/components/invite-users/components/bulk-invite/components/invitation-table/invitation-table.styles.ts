import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';

export const InvitationTableStyled = {
  CheckboxWrapper: styled.div`
    * {
      font-size: ${FONTS.sizes[13]};
    }
  `,

  ControlColumn: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    padding: 5px;
    font-size: ${FONTS.sizes[12]};
    text-align: center;

    ${Media.landscape(css`
      width: 40px;
      padding: 3px;
      font-size: ${FONTS.sizes[10]};
    `)}

    * {
      margin: 0;
    }
  `,

  ControlWrapper: styled.div`
    transition: 0.3s;
    cursor: pointer;

    :hover {
      opacity: 0.5;
    }

    svg {
      path {
        stroke: ${COLORS.iconBlack};
      }
    }
  `,

  SelectedUsersCount: styled.div`
    font-size: ${FONTS.sizes[13]};
    margin: 32px 0;
  `,

  SelectWrapper: styled.div`
    position: absolute;
    right: 0;
    width: 100%;
    height: 120px;
    top: 50%;
    transform: translateY(-50%);
    z-index: ${Z_INDEX.medium};
  `,

  ControlPanel: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${Media.mobile`
      flex-wrap: wrap;

      > * {
        flex: 0 1 100%;
      }

      > :first-child {
        margin-bottom: 20px;
      }
    `}
  `,

  InputWrapper: styled.div`
    width: 100%;

    * {
      margin: 0;
    }

    input {
      font-size: inherit;
    }
  `,
};
