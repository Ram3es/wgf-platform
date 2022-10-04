import React, { FC } from 'react';
import styled from 'styled-components';

import { Icon } from '@components/icon';

const IconWrapper = styled.div`
  display: flex;

  padding: 0 15px;
  align-items: center;

  svg {
    :hover {
      cursor: pointer;
      path[fill] {
        fill: #393837;
      }
    }
  }
  svg {
    path {
      transition: 0.3s;
    }
  }
`;
interface IShewronProps {
  isShowShevron: boolean;
  onClick: () => void;
}
export const ShevronIcons: FC<IShewronProps> = ({ isShowShevron, onClick }) => {
  return isShowShevron ? (
    <IconWrapper>
      <Icon type="shevronRight" onClick={onClick} />
    </IconWrapper>
  ) : (
    <IconWrapper>
      <Icon type="shevron" onClick={onClick} />
    </IconWrapper>
  );
};
