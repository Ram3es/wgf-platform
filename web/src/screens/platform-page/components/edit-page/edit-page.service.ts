import { useHistory } from 'react-router-dom';
import { ISelectionOption } from './edit-page.types';

export const useServiceEditInfo = (): ISelectionOption => {
  const {
    push,
    location: { pathname },
  } = useHistory();

  const deleteAccount = () => push(`${pathname}/delete`);

  return {
    user: [
      // { 'Email User': () =>{} },
      { 'Delete Account': deleteAccount },
      // { 'Request Payment': () =>{}},
    ],
    trainerAdmin: [
      // { 'Email Trainer': () => {} },
      { 'Delete Account': deleteAccount },
      // { 'Request Payment': () => {} },
    ],
  };
};
