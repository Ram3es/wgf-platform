import React from 'react';

import { Button } from '@components/button';
import { DropDown } from '@components/drop-down';
import { Icon } from '@components/icon';
import { Loader } from '@components/loader';
import { Modal } from '@components/modal';
import { COLORS } from '@styles/colors';
import { FlexCenter } from '@styles/components/flex-center';

import { useTrainerViewingState } from './trainer-viewing.state';

import { IMAGES } from '@constants/images';
import { PROMISES_AREA } from '@constants/promises-area';
import { STRINGS } from '@constants/strings';
import {
  SELECT_TRAINER_OPTIONS,
  TRAINERS_INFO,
} from './trainer-viewing.constants';

import { TitleStyles } from '@styles/components/title-styles';
import {
  DisconnectPopUpStyled as PopUpStyled,
  TrainerViewingStyled as Styled,
} from './trainer-viewing.styles';

export const TrainerViewing: React.FC = () => {
  const {
    closeDisconnectPopUp,
    handleActiveOptions,
    confirmDisconnectTrainer,
    handleSelect,
    isActiveOptions,
    isActivePopUpDisconnect,
    openOptions,
    trainers,
    selectedTrainer,
  } = useTrainerViewingState();

  return (
    <>
      <Styled.Wrapper>
        <Styled.Title>
          <TitleStyles.h2 color={COLORS.grey} textAlign="left">
            {STRINGS.trainer.trainerTitle}
          </TitleStyles.h2>
        </Styled.Title>
        <Loader area={PROMISES_AREA.getUserTrainers}>
          {trainers?.length ? (
            <Styled.Cards>
              {trainers.map((trainer, index) => (
                <Styled.CardWrapper key={trainer.id}>
                  <Styled.CardItem>
                    <Styled.CardHeader>
                      <TitleStyles.h3 textAlign="left" color={COLORS.grey}>
                        {STRINGS.trainer.trainerTitle} {++index}
                      </TitleStyles.h3>
                      <Styled.Icon onClick={openOptions(trainer.id || '')}>
                        <Icon type="options" />
                      </Styled.Icon>
                      {isActiveOptions && trainer.id === selectedTrainer && (
                        <Styled.OptionsWrapper>
                          <DropDown
                            options={SELECT_TRAINER_OPTIONS}
                            setSelected={handleSelect}
                            setIsActive={handleActiveOptions}
                            isFullWidth
                          />
                        </Styled.OptionsWrapper>
                      )}
                    </Styled.CardHeader>
                    <Styled.CardTrainerName>
                      <Styled.AvatarWrapper>
                        <img src={trainer.avatar || IMAGES.userProfile} />
                      </Styled.AvatarWrapper>
                      <TitleStyles.h3 textAlign="left" color={COLORS.grey}>
                        {trainer.firstName} {trainer.lastName}
                      </TitleStyles.h3>
                    </Styled.CardTrainerName>
                    {TRAINERS_INFO.map((item, index) => {
                      const infoItem = trainer[item as keyof IUser];

                      return (
                        <Styled.CardTrainerInfoItem key={index}>
                          {item === 'groupName'
                            ? `Group: ${infoItem}`
                            : infoItem || STRINGS.trainer.noTrainerInfo}
                        </Styled.CardTrainerInfoItem>
                      );
                    })}
                  </Styled.CardItem>
                </Styled.CardWrapper>
              ))}
            </Styled.Cards>
          ) : (
            <FlexCenter>
              <TitleStyles.h3 color={COLORS.grey}>
                {STRINGS.trainer.noTrainers}
              </TitleStyles.h3>
            </FlexCenter>
          )}
        </Loader>
      </Styled.Wrapper>
      {isActivePopUpDisconnect && (
        <Modal onClose={closeDisconnectPopUp} withBackdrop width={410}>
          <PopUpStyled.Header>
            <Icon type="disconnect" />
            <TitleStyles.h2 color={COLORS.grey}>
              {STRINGS.trainer.disconnect.title}
            </TitleStyles.h2>
          </PopUpStyled.Header>
          <PopUpStyled.Description>
            <p>{STRINGS.trainer.disconnect.discription}</p>
          </PopUpStyled.Description>
          <PopUpStyled.ButtonPanel>
            <Button
              onClick={confirmDisconnectTrainer}
              title={STRINGS.button.confirm}
              color={COLORS.lightBlue}
            />
            <Button
              onClick={closeDisconnectPopUp}
              title={STRINGS.button.cancel}
              variant="cancel"
            />
          </PopUpStyled.ButtonPanel>
        </Modal>
      )}
    </>
  );
};
