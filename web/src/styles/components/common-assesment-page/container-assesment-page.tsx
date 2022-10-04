import React, { FC } from 'react';
import { Backdrop } from '@components/backdrop';
import { COMMON_ASSESSMENT_PAGE as Styled } from './common.styles';
import { BreadCrumb } from '@components/bread-crumb';

export const ContainerPage: FC = (props) => {
  const { children } = props;
  return (
    <Styled.Wrapper>
      <Backdrop />
      <Styled.WrapContent>
        <BreadCrumb />
        {children}
      </Styled.WrapContent>
    </Styled.Wrapper>
  );
};
