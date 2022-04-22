import React from 'react';

import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';

import { IModalProps } from './modal.typings';

import { ModalStyles as Styled } from './modal.styles';

export const Modal: React.FC<IModalProps> = ({
  withBackdrop,
  width,
  children,
  onClose,
}) => {
  return (
    <>
      <Styled.Wrapper width={width}>
        <Styled.Content>
          <Styled.CloseIcon onClick={onClose}>
            <img src={IMAGES.close} alt={STRINGS.altLogo} />
          </Styled.CloseIcon>
          {children}
        </Styled.Content>
      </Styled.Wrapper>
      {withBackdrop && <Styled.BackDrop onClick={onClose} />}
    </>
  );
};
