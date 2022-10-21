import React, { FC } from 'react';

import { Icon } from '@components/icon';
import { Loader } from '@components/loader';
import { Button } from '@components/button';

import { PROMISES_AREA } from '@constants/promises-area';

import { COLORS } from '@styles/colors';
import { TitleStyles } from '@styles/components/title-styles';

import { MoidalDeleteStyles as Styled } from './modal-delete.styles';

interface IModalProps {
  deleteTrainerGroup: () => void;
  handleDelete: () => void;
}

export const ModalDelete: FC<IModalProps> = (props) => {
  const { deleteTrainerGroup, handleDelete } = props;
  return (
    <>
      <Styled.Header>
        <Icon type="trashBasket" />
        <TitleStyles.h2 mb={30} color={COLORS.grey}>
          Delete Group
        </TitleStyles.h2>
      </Styled.Header>
      <Styled.Description>
        <p>Are you sure you want to delete the group?</p>
      </Styled.Description>
      <Loader area={PROMISES_AREA.deleteGroup}>
        <Styled.WrapBtn>
          <Button
            onClick={handleDelete}
            title="Confirm"
            color={COLORS.lightBlue}
          />
          <Button
            onClick={deleteTrainerGroup}
            title="Cancel"
            variant="cancel"
          />
        </Styled.WrapBtn>
      </Loader>
    </>
  );
};
