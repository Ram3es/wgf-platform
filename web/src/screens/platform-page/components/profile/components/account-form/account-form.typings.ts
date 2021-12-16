import { ChangeEvent } from 'react';

export interface IAccountFormProps {
  accountData: IAccountData;
  accountFormSubmit: () => void;
  accountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  cancelEditAccount: () => void;
}
