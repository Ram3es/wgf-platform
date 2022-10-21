import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { animateScroll } from 'react-scroll';
import { trackPromise } from 'react-promise-tracker';
import { useHistory, useParams } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { errorMessage } from '@constants/pop-up-messages';

import { useCapitalLetter } from '@services/hooks/useCapitalLetter';
import { getUserById } from '@services/super-admin.service';

import { IEditUserProps } from './edit-table-info/edit-table-info';

export const useEditUserState = () => {
  const [userState, setUserState] = useState<IEditUserProps | null>(null);
  const {
    push,
    location: { pathname },
  } = useHistory();

  const params: { userId: string } = useParams();

  const getUser = useCallback(async () => {
    try {
      const { data } = await trackPromise(getUserById(params));

      setUserState(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        push(ROUTES.platform);
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  }, [params]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const capitalize = useCapitalLetter();

  const breadCrumbTitle =
    userState &&
    `${capitalize(userState.role as string)} / ${userState.firstName}`;

  useEffect(() => {
    animateScroll.scrollToTop();
  }, []);
  return { userState, breadCrumbTitle, pathname };
};
