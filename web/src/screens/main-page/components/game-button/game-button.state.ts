import { getLimitTrainer, setLimitTrainer } from '@services/quiz.service';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';

import { errorMessage, unAutorizedError } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { authGameAdmin } from '@services/trainer.service';
import { useAppSelector } from '@services/hooks/redux';
import { IInitialLimitsState } from '@screens/platform-page/components/edit-page/game-info/game-limits-form';
import { ROLES } from '@constants/user-roles';

interface IState {
  isLoading: boolean;
  isModalOpen: boolean;
  isAuthorized: boolean;
}

const INIT_STATE: IState = {
  isLoading: false,
  isModalOpen: false,
  isAuthorized: false,
};

const GAME_LINK = process.env.REACT_APP_GAME;

const unlimitedLimits = {
  numberOfGames: 'unlimited',
  playersPerGame: 'unlimited',
  gameDuration: 'unlimited',
  expirationDate: 'unlimited',
  gamesUsed: 0,
};

export const useGameButton = () => {
  const [state, setState] = useState(INIT_STATE);

  const [limits, setLimits] = useState<Partial<IInitialLimitsState> | null>(
    null
  );

  const user = useAppSelector((state) => state.user);

  const onMessageRef = useRef<(event: MessageEvent) => void>();

  const { push } = useHistory();

  const onClick = async () => {
    if (state.isLoading) {
      return;
    }

    if (user.role === ROLES.superAdmin) {
      try {
        const { data } = await trackPromise(
          getLimitTrainer(user.id),
          PROMISES_AREA.getLimitSetting
        );
        data && setLimits(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return errorMessage(error?.response?.data.message).fire();
        }
      }

      if (!limits) {
        try {
          await trackPromise(
            setLimitTrainer({ ...unlimitedLimits, userId: user.id }),
            PROMISES_AREA.getLimitSetting
          );
          setLimits(unlimitedLimits);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            return errorMessage(error?.response?.data.message).fire();
          }
        }
      }
    }

    setState((prev) => ({ ...prev, isLoading: true, isModalOpen: true }));

    try {
      const { data } = await trackPromise(
        authGameAdmin(),
        PROMISES_AREA.authGameAdmin
      );

      const gameWindow = window.open(`${GAME_LINK}/auth`);

      if (!gameWindow) {
        return;
      }

      if (onMessageRef.current) {
        window.removeEventListener('message', onMessageRef.current);
      }

      onMessageRef.current = (event: MessageEvent) => {
        if (event.origin !== GAME_LINK) {
          return;
        }

        if (event.data.authorized) {
          setState((prev) => ({
            ...prev,
            isAuthorized: true,
            isModalOpen: false,
          }));

          if (onMessageRef.current) {
            window.removeEventListener('message', onMessageRef.current);
          }

          return;
        }

        if (event.data.loaded) {
          gameWindow?.postMessage(data, GAME_LINK);
        }
      };

      window.addEventListener('message', onMessageRef.current);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setState((prev) => ({ ...prev, isModalOpen: false }));

          unAutorizedError()
            .fire()
            .finally(() => push(ROUTES.signIn));
        }

        return errorMessage('Something went wrong').fire();
      }
    } finally {
      setState((prev) => ({ ...prev, isLoading: false, isModalOpen: false }));
    }
  };

  useEffect(() => {
    return () => {
      if (!onMessageRef.current) {
        return;
      }

      window.removeEventListener('message', onMessageRef.current);
    };
  }, []);

  return { ...state, onClick };
};
