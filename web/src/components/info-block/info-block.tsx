import React, { FC } from 'react';

import { InfoBlockStyled as Styled } from './info-block.styles';

interface IPropsInfoBlock {
  title: string;
  isPositionCenter?: boolean;
}

export const InfoBlock: FC<IPropsInfoBlock> = (props) => (
  <Styled.Title>
    <p>{props.title}</p>
    <Styled.InfoIcon>
      i
      <Styled.InfoBlock isPositionCenter={props.isPositionCenter}>
        {props.children}
      </Styled.InfoBlock>
    </Styled.InfoIcon>
  </Styled.Title>
);
