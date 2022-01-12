import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';

import { Backdrop } from '@components/backdrop';
import { Header } from '@components/header';

import { errorMessage } from '@constants/pop-up-messages';

export const ErrorPage: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const { replace } = useHistory();
  const error = query.get('error');

  useEffect(() => {
    if (!error) {
      replace('/');
    } else {
      errorMessage(error)
        .fire()
        .finally(() => replace('/'));
    }
  }, [query]);

  return (
    <>
      <Header />
      <Backdrop />
    </>
  );
};
