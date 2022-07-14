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
      { 'Email User': () => console.log('skdnvjsndv') },
      { 'Delete Account': deleteAccount },
      { 'Request Payment': () => console.log('skdnvjsndv') },
    ],
    trainerAdmin: [
      { 'Email Trainer': () => console.log('skdnvjsndv') },
      { 'Delete Account': deleteAccount },
      { 'Request Payment': () => console.log('skdnvjsndv') },
    ],
  };
};
