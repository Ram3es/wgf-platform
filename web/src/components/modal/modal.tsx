import React from 'react';



import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';

import { IModalProps } from './modal.typings';

import { ModalStyles } from './modal.styles';

export const Modal: React.FC<IModalProps> = ({
  withBackdrop,
  setIsOpen,
  width,
  children,
}) => {
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <ModalStyles.Wrapper width={width}>
        <ModalStyles.CloseIcon onClick={closeModal}>
          <img src={IMAGES.close} alt={STRINGS.altLogo} />
        </ModalStyles.CloseIcon>
        {children}
      </ModalStyles.Wrapper>
      {withBackdrop && <ModalStyles.BackDrop onClick={closeModal} />}
    </>
  );
};
