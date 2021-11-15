import React from 'react';

import { Icon } from '@components/icon';

import { IButtonProps } from './button.typings';

import { ButtonStyles as Styled } from './button.styles';

export const Button: React.FC<IButtonProps> = (props) => {
  const { title, iconType, isIconRight } = props;

  return (
    <Styled {...props} isIconRight={isIconRight}>
      {iconType && <Icon type={iconType} />}
      <span>{title}</span>
    </Styled>
  );
};
