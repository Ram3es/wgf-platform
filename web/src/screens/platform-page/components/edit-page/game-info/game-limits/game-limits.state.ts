import { ITrainerId } from './../game-limits-form/game-limits-form.typing';
import { ChangeEvent, useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  IInitialLimitsState,
  InitialLimitsState,
  SelectState,
} from '../game-limits-form';
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

export const useGameLimitsState = () => {
  const [limitData, setlimitData] =
    useState<IInitialLimitsState>(InitialLimitsState);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showDrop, setShowDrop] =
    useState<Record<string, boolean>>(SelectState);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const [isShowCalendar, onChange] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const { userId }: ITrainerId = useParams();

  const unlimitedHandler = (name: string) =>
    setlimitData((state) => ({ ...state, [name]: 'unlimited' }));

  const calendarHandler = (date: string) =>
    setlimitData((state) => ({ ...state, expirationDate: date }));

  const toggleCalendar = (e?: MouseEvent) => {
    e?.stopPropagation();
    onChange((state) => !state);
  };

  const toggleEditMode = () => setIsEditMode((state) => !state);

  const toggleDrop = (param: Record<string, boolean>) =>
    setShowDrop((state) => ({ ...state, ...param }));

  const changeLimit = (event: ChangeEvent<HTMLInputElement>) => {
    setlimitData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const testChecked = (name: string) => {
    const item = name as keyof IInitialLimitsState;
    setIsChecked((state) => (limitData[item] === 'unlimited' ? !state : state));
  };

  const getLimitSetting = useCallback(async () => {
    try {
      const { data } = await trackPromise(
        getLimitTrainer(userId),
        PROMISES_AREA.getLimitSetting
      );

      const formatedData = {
        ...data,
        gameDuration: convertToDayHourMinutes(data.gameDuration),
      };
      data && setlimitData((prev) => ({ ...prev, ...formatedData }));
      data && setIsShowForm(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  }, [userId]);

  const setLimitSetting = async (values: IInitialLimitsState) => {
    const { remainingGames, ...rest } = values;

    const formatValues: Partial<IInitialLimitsState> = {
      ...rest,
      gameDuration: parseTimeInputValue(values.gameDuration)
        .split(':')
        .reduce((acc, time) => String(60 * +acc + +time)),
    };

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

  const handleShowForm = () => setIsShowForm((state) => !state);

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
    toggleDrop,
    showDrop,
    unlimitedHandler,
    testChecked,
    isChecked,
    isShowForm,
    handleShowForm,
    toggleCalendar,
    isShowCalendar,
    calendarHandler,
    calendarRef,
  };
};
