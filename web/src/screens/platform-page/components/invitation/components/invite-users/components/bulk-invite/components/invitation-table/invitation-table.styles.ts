import styled from 'styled-components';

import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';
import { Z_INDEX } from '@styles/z-indexes';

export const InvitationTableStyled = {
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
};
