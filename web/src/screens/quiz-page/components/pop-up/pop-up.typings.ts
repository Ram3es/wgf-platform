import { TUpdateStateData } from '@services/hooks/useUpdateState';

import { IFormState, IUserValues } from '../form/form.typings';

export interface IPopUpProps {
  user: IUserValues;
  setState(data: TUpdateStateData<IFormState>): void;
}

export interface IUserRadioList {
  label: string;
  value: string;
}
