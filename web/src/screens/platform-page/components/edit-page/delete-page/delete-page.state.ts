import { deleteAccount, errorMessage } from '@constants/pop-up-messages';
import { ROUTES } from '@constants/routes';
import { Toast } from '@constants/toasts';
import { ROLES } from '@constants/user-roles';
import { deleteUserById } from '@services/super-admin.service';
import axios from 'axios';
import { useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';
import { useEditUserState } from '../edit-page.state';
import { IEditUserProps } from '../edit-table-info';

export const useDeletePages = () => {
  const [isActive, setActive] = useState({ delete: true, archive: false });
  const { breadCrumbTitle, userState } = useEditUserState();
  const {
    push,
    location: { pathname },
  } = useHistory();

  const handleCancel = () => push(pathname.slice(0, -7));

  const handleDelete = async () => {
    const { value } = await deleteAccount.fire();
    if (value) {
      const { id: userId } = userState as IEditUserProps;
      try {
        await trackPromise(deleteUserById({ userId }));
        Toast.fire({
          icon: 'success',
          text: 'User has been deleted',
        });
        push(
          userState?.role === ROLES.trainerAdmin
            ? ROUTES.manageTrainers
            : ROUTES.manageUser
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return errorMessage(error?.response?.data.message).fire();
        }
      }
    }
    return;
  };
  const handleClick = (name: string) => {
    setActive((state) => {
      type k = keyof typeof state;
      for (const key of Object.keys(state)) {
        if (key === name) {
          state[key as k] = true;
          continue;
        }
        state[key as k] = false;
      }

      return { ...state };
    });
  };
  return {
    breadCrumbTitle,
    userState,
    isActive,
    push,
    pathname,
    handleClick,
    handleDelete,
    handleCancel,
  };
};
