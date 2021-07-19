import React from 'react';

import { images } from '@constants/images';

import { IButtonProps } from './button.typings';

import { ButtonStyles } from './button.styles';

export const Button: React.FC<IButtonProps> = ({
  title,
  onClick,
  isDisabled,
  variant,
  isFullWidth,
  type,
  color,
  image,
}) => (
  <ButtonStyles
    isFullWidth={isFullWidth}
    variant={variant}
    onClick={onClick}
    isDisabled={isDisabled}
    disabled={isDisabled}
    type={type}
    color={color}
    image={image}
  >
    {image === 'back' && <img src={images.back} />}
    <span>{title}</span>
    {image === 'next' && <img src={images.next} />}
  </ButtonStyles>
);
