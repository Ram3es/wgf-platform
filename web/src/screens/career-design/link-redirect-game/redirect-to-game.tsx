import { FC } from 'react';
import { useAppSelector } from '@services/hooks/redux';

const redirectToGame = (email: string, name: string) => {
  const emailParam = `email=${encodeURIComponent(email)}`;
  const nameParam = `&name=${encodeURIComponent(name)}`;
  window.location.replace(
    `${process.env.REACT_APP_GAME}/log-in?${emailParam}${nameParam}`
  );
};
export const RedirectToGame: FC = () => {
  const user = useAppSelector((state) => state.user);
  const fullName = `${user.firstName} ${user.lastName}`;

  redirectToGame(user.email, fullName);

  return null;
};
