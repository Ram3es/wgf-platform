import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router';

import { requestTrainer } from '@services/student.service';

import {
    trainerRequestErrorMessage, trainerRequestSuccessMessage, unAutorizedError
} from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';

export const useTrainerRequestState = () => {
  const [trainerEmail, setTrainerEmail] = useState('');

  const { push } = useHistory();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTrainerEmail(event.target.value);
  };

  const sendRequest = async () => {
    try {
      await trackPromise(
        requestTrainer({
          to: trainerEmail,
          type: 'requestTrainer',
        }),
        PROMISES_AREA.requestTrainer
      );

      trainerRequestSuccessMessage.fire();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return unAutorizedError()
            .fire()
            .finally(() => push('/sign-in'));
        }

        return trainerRequestErrorMessage(error?.response?.data.message).fire();
      }
    }
  };
  return {
    trainerEmail,
    push,
    handleEmailChange,
    sendRequest,
  };
};
