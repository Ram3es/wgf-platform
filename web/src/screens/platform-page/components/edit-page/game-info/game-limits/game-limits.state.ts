import { storageService } from '@services/storage/storage';
import {
  IInitialLimitsState,
  ITrainerId,
} from './../game-limits-form/game-limits-form.typing';
import { ChangeEvent, useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { trackPromise } from 'react-promise-tracker';
import { getLimitTrainer, setLimitTrainer } from '@services/quiz.service';
import { PROMISES_AREA } from '@constants/promises-area';
import axios from 'axios';
import { errorMessage } from '@constants/pop-up-messages';
import { Toast } from '@constants/toasts';
import {
  convertToDayHourMinutes,
  parseTimeInputValue,
} from '@services/utils/date-time.utils';
import { initialLimitsState } from '../game-limits-form';

export const useGameLimitsState = () => {
  const [limitData, setlimitData] =
    useState<IInitialLimitsState>(initialLimitsState);
  const [isEditMode, setIsEditMode] = useState<boolean>(true);
  const [isShowCalendar, onChange] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);

  const { userId }: ITrainerId = useParams();

  const unlimitedHandler = (name: string) =>
    setlimitData((state) => ({ ...state, [name]: 'unlimited' }));

  const returnPrevSettings = (key: keyof IInitialLimitsState) => {
    let settings = storageService.getTrainerLimits();

    if (!settings) {
      settings = initialLimitsState;
    }

    settings &&
      settings[key] === 'unlimited' &&
      (settings[key] = initialLimitsState[key]);


    setlimitData((prev) => ({ ...prev, [key]: settings[key] }));
  };

  const calendarHandler = (date: string) =>
    setlimitData((state) => ({ ...state, expirationDate: date }));

  const toggleCalendar = (e?: MouseEvent) => {
    e?.stopPropagation();
    onChange((state) => !state);
  };

  const toggleEditMode = (value?: boolean) =>
    setIsEditMode((state) => (value ? value : !state));

  const changeLimit = (event: ChangeEvent<HTMLInputElement>) => {
    setlimitData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const getLimitSetting = useCallback(async () => {
    try {
      const { data } = await trackPromise(
        getLimitTrainer(userId),
        PROMISES_AREA.getLimitSetting
      );
      let formatedData = data;
      if (data.gameDuration !== 'unlimited') {
        formatedData = {
          ...data,
          gameDuration: convertToDayHourMinutes(data.gameDuration),
        };
      }

      if (data) {
        setlimitData((prev) => ({ ...prev, ...formatedData }));
        let key: keyof IInitialLimitsState;
        for (key in formatedData) {
          if (formatedData[key] === 'unlimited') {
            formatedData[key] = initialLimitsState[key] as typeof key;
          }
        }

        storageService.setTrainerLimits(formatedData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  }, [userId]);

  const setLimitSetting = async (values: IInitialLimitsState) => {
    const { remainingGames, ...rest } = values;

    let formatValues = rest;
    if (rest.gameDuration !== 'unlimited') {
      formatValues = {
        ...rest,
        gameDuration: parseTimeInputValue(values.gameDuration)
          .split(':')
          .reduce((acc, time) => String(60 * +acc + +time)),
      };
    }

    try {
      await trackPromise(
        setLimitTrainer({ ...formatValues, userId }),
        PROMISES_AREA.setLimitsTrainer
      );
      Toast.fire({
        icon: 'success',
        title: 'Game Limits updated successfully',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  const onBackdropClick = (event: MouseEvent): void => {
    if (!calendarRef.current?.contains(event.target as HTMLDivElement)) {
      onChange(false);
    }
  };
  useEffect(() => {
    getLimitSetting();
  }, [getLimitSetting]);

  useEffect(() => {
    document.addEventListener('click', onBackdropClick);
    return () => {
      document.removeEventListener('click', onBackdropClick);
    };
  }, []);

  return {
    limitData,
    toggleEditMode,
    changeLimit,
    isEditMode,
    setLimitSetting,
    unlimitedHandler,
    toggleCalendar,
    isShowCalendar,
    calendarHandler,
    calendarRef,
    returnPrevSettings,
  };
};
