import styled from 'styled-components';

import { Button } from '@components/button';
import { Modal } from '@components/modal';
import { COLORS } from '@styles/colors';

import { useGameButton } from './game-button.state';
import { storageService } from '@services/storage/storage';
import { useAppSelector } from '@services/hooks/redux';
import { FC } from 'react';

const ModalText = styled.p`
  text-align: center;
`;
interface IGameButtonProps {
  title?: string;
}

export const GameButtonElement: FC<IGameButtonProps> = ({ title }) => {
  const { isModalOpen, onClick } = useGameButton();

  const ModalElement = isModalOpen && (
    <Modal withBackdrop width={380}>
      <ModalText>
        {"Don't close the browser tab while authorizing..."}
      </ModalText>
    </Modal>
  );

  return (
    <>
      {ModalElement}
      <Button
        title={title || 'Career Game'}
        iconType="next"
        isIconRight
        onClick={onClick}
        color={COLORS.violet}
      />
    </>
  );
};

export const GameButton: FC<IGameButtonProps> = (props) => {
  const token = storageService.getToken();
  const userRole = useAppSelector((state) => state.user.role);

  const isDisplay =
    token && (userRole === 'trainerAdmin' || userRole === 'superAdmin');

  return isDisplay ? <GameButtonElement {...props} /> : null;
};
