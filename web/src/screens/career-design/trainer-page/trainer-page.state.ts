import { useEffect, useState } from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

import { errorMessage } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';

import { getLimitTrainer } from '@services/quiz.service';
import { convertToDayHourMinutes } from '@services/utils/date-time.utils';
import { IInitialLimitsState } from '@screens/platform-page/components/edit-page/game-info/game-limits-form';

export const useTrainerPageState = (trainerId: string) => {
  const [isShowShevron, setShowShevron] = useState(false);
  const [fieldsValue, setValue] = useState<IInitialLimitsState | null>(null);

  const toggleShevron = () => {
    setShowShevron((boolean) => !boolean);
  };

  const getLimit = async () => {
    try {
      const { data } = await trackPromise(
        getLimitTrainer(trainerId),
        PROMISES_AREA.getLimitSetting
      );

      data && setValue(formateData(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  useEffect(() => {
    getLimit();
  }, []);

  function formateData(data: IInitialLimitsState) {
    const formatedData = {
      ...data,
      gameDuration:
        data.gameDuration !== 'unlimited'
          ? convertToDayHourMinutes(data.gameDuration)
          : 'unlimited',
      remainingGames: String(
        +data.numberOfGames - +data.gamesUsed || 'unlimited'
      ),
    };
    return formatedData;
  }

  return { fieldsValue, isShowShevron, toggleShevron };
};
