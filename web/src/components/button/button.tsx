import React from 'react';

import { Icon } from '@components/icon';

import { IButtonProps } from './button.typings';

import { ButtonStyles as Styled } from './button.styles';

export const Button: React.FC<IButtonProps> = ({
  title,
  onClick,
  isDisabled,
  variant,
  isFullWidth,
  type,
  color,
  iconType,
  iconLocation = 'left',
  minWidth,
}) => (
  <Styled
    isFullWidth={isFullWidth}
    variant={variant}
    onClick={onClick}
    isDisabled={isDisabled}
    disabled={isDisabled}
    type={type}
    color={color}
    iconType={iconType}
    minWidth={minWidth}
  >
    {iconLocation === 'left' && iconType && <Icon type={iconType} />}
    <span>{title}</span>
    {iconLocation === 'right' && iconType && <Icon type={iconType} />}
  </Styled>
);
