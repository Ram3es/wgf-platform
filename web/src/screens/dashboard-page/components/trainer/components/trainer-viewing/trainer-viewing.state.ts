import axios from 'axios';
import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RootState } from '@store/store';

import { disconnectTrainer, getTrainersByUser } from '@services/student.service';

import { errorMessage, unAutorizedError } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { TRAINER_OPTIONS } from './trainer-viewing.constants';

export const useTrainerViewingState = () => {
  const [trainers, setTrainers] = useState<[] | ITrainer[]>([]);
  const [isActiveOptions, setIsActiveOptions] = useState<boolean>(false);
  const [isActivePopUpDisconnect, setIsActivePopUpDisconnect] =
    useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedTrainer, setSelectedTrainer] = useState<string>('');

  const { user } = useSelector((state: RootState) => state);

  const { push } = useHistory();

  const getTrainers = async () => {
    try {
      const { data } = await trackPromise(
        getTrainersByUser(),
        PROMISES_AREA.getUserTrainers
      );

      setTrainers(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return unAutorizedError()
            .fire()
            .finally(() => push(ROUTES.signIn));
        }

        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  useEffect(() => {
    getTrainers();
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');

    if (isActivePopUpDisconnect) {
      return body?.classList.add('hidden');
    }

    body?.classList.remove('hidden');
  }, [isActivePopUpDisconnect]);

  useEffect(() => {
    if (selectedOption === TRAINER_OPTIONS.disconnectTrainer) {
      setIsActivePopUpDisconnect(true);
    }
  }, [selectedOption]);

  const closeDisconnectPopUp = () => {
    setIsActivePopUpDisconnect(false);
    setSelectedOption('');
  };

  const openOptions = (trainerId: string) => () => {
    setSelectedTrainer(trainerId);
    setIsActiveOptions(true);
  };

  const confirmDisconnectTrainer = async () => {
    try {
      await disconnectTrainer({ trainerId: selectedTrainer, userId: user.id });
      setTrainers((prev) =>
        prev!.filter((trainer) => trainer.id !== selectedTrainer)
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return unAutorizedError()
            .fire()
            .finally(() => push(ROUTES.signIn));
        }

        return errorMessage(error?.response?.data.message).fire();
      }
    } finally {
      closeDisconnectPopUp();
    }
  };

  return {
    trainers,
    isActiveOptions,
    isActivePopUpDisconnect,
    selectedTrainer,
    openOptions,
    handleActiveOptions: setIsActiveOptions,
    handleSelect: setSelectedOption,
    closeDisconnectPopUp,
    confirmDisconnectTrainer,
  };
};
