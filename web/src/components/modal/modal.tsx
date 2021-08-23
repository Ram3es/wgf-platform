import React from 'react';

import { COLORS } from '@styles/colors';

import { IMAGES } from '@constants/images';
import { STRINGS } from '@constants/strings';

import { IModalProps } from './modal.typings';

import { TitleStyles } from '@styles/components/title-styles';
import { ModalStyles } from './modal.styles';

export const Modal: React.FC<IModalProps> = ({
  title,
  text,
  withBackdrop,
  setIsOpen,
  width,
}) => {
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <ModalStyles.Wrapper width={width}>
        <ModalStyles.CloseIcon onClick={closeModal}>
          <img src={IMAGES.close} alt={STRINGS.altLogo} />
        </ModalStyles.CloseIcon>
        <ModalStyles.Title>
          <TitleStyles.h2 paddingY="0" textAlign="center" color={COLORS.grey}>
            {title}
          </TitleStyles.h2>
        </ModalStyles.Title>
        <ModalStyles.Text>{text}</ModalStyles.Text>
      </ModalStyles.Wrapper>
      {withBackdrop && <ModalStyles.BackDrop onClick={closeModal} />}
    </>
  );
};
