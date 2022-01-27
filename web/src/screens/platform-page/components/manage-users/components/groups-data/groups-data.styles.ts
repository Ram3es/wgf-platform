import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';
import { Media } from '@styles/media';

export const GroupsDataStyles = {
  GroupsModal: styled.div`
    border-radius: 15px;
    padding: 5px 10px;
    box-shadow: 0px 6px 17px rgba(0, 0, 0, 0.2);
    position: absolute;
    overflow-y: auto;
    top: 0;
    right: 0;
    display: block;
    width: 160px;
    max-height: 60px;
    background-color: ${COLORS.white};
    z-index: 4;

    ${Media.mobile(css`
      width: 120px;
    `)}
  `,
  GroupDataColumnWrapper: styled.div`
    display: flex;
    width: 100%;
  `,
  GroupText: styled.div`
    font-size: ${FONTS.sizes[12]};
    padding-bottom: 3px;
  `,

  GroupsDiv: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
};
