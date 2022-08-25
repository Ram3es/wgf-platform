import { ChangeEvent, RefObject } from 'react';
import { SweetAlertResult } from 'sweetalert2';

export interface IGameLimitsFormProps {
  limitData: IInitialLimitsState;
  limitChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isEditMode: boolean;
  editMode: () => void;
  toggleCalendar?: () => void;
  isShowCalendar?: boolean;
  setLimitSetting: (
    values: IInitialLimitsState
  ) => Promise<SweetAlertResult<string> | undefined>;
  toggleDrop?: (param: Record<string, boolean>) => void;
  isShowSelect?: Record<string, boolean>;
  unlimited?: string;
  unlimitedHandler: (name: string) => void;
  calendarHandler?: (param: string) => void;
  calendarRef: RefObject<HTMLDivElement>;
  returnPrevSettings: (key: keyof IInitialLimitsState) => void;
}

export interface IInitialLimitsState {
  numberOfGames: string;
  playersPerGame: string;
  remainingGames: string;
  gamesUsed: string | number;
  gameDuration: string;
  expirationDate: string;
  userId?: string;
}

export interface ITrainerId {
  userId: string;
}
