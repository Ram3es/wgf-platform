import { FormikProps } from 'formik';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useAppSelector } from '@services/hooks/redux';

import { IBulkInviteData } from '../../bulk-invite.typings';
import { IInvitationTableProps } from './invitation.typings';

export const useInvitationTableState = (props: IInvitationTableProps) => {
  const {
    invitationList,
    setInvitationList,
    groups,
    onSubmit,
    handleCloseTable,
  } = props;
  const { user } = useAppSelector((state) => state);
  const [isSelectedAll, setSelectedAll] = useState(false);

  const formikRef = useRef<FormikProps<{ users: IBulkInviteData[] }>>(null);

  const [isDisabled, setIsDisabled] = useState(false);

  const tableRef = useRef<HTMLDivElement>(null);

  const [isActiveUser, setIsActiveUser] = useState<string>('');

  const handleUserActive = (id: string) => {
    setIsActiveUser(id);
  };

  const onBackdropClick = (event: MouseEvent): void => {
    if (formikRef.current?.values.users.some((user) => user.isEditable)) {
      if (!tableRef.current?.contains(event.target as HTMLDivElement)) {
        cancelEdit();
      }
    }
  };

  const onPressEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      cancelEdit();
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', onPressEnter);
    return () => {
      document.removeEventListener('keypress', onPressEnter);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('click', onBackdropClick);
    return () => {
      document.removeEventListener('click', onBackdropClick);
    };
  }, []);

  const cancelEdit = () => {
    if (!formikRef.current?.isValid) {
      return;
    }

    formikRef.current?.values.users.forEach((item, index) => {
      if (item.isEditable) {
        formikRef.current?.setFieldValue(`users.${index}.isEditable`, false);
      }
    });

    setInvitationList((prev) =>
      prev!.map((user) => ({ ...user, isEditable: false }))
    );
  };

  const onSelectUser = (id: string) => () => {
    formikRef.current?.values.users.forEach((item, index) => {
      if (item.id === id) {
        formikRef.current?.setFieldValue(
          `users.${index}.isSelected`,
          !item.isSelected
        );
      }
    });

    setInvitationList((prev) =>
      prev!.map((user) =>
        user.id === id ? { ...user, isSelected: !user.isSelected } : user
      )
    );
  };

  const onSelectAll = () => {
    setSelectedAll((prev) => !prev);
    formikRef.current?.values.users.forEach((item, index) => {
      formikRef.current?.setFieldValue(
        `users.${index}.isSelected`,
        !isSelectedAll
      );
    });
    setInvitationList((prev) =>
      prev!.map((user) => ({ ...user, isSelected: !isSelectedAll }))
    );
  };

  const onDeleteUser = (id: string) => {
    setInvitationList((prev) => prev!.filter((user) => user.id !== id));
  };

  const onEditUser = (id: string) => () => {
    formikRef.current?.values.users.forEach((item, index) => {
      if (item.isEditable) {
        formikRef.current?.setFieldValue(
          `users.${index}.isEditable`,
          !formikRef.current?.isValid ? item.isEditable : false
        );
      }

      if (item.id === id) {
        formikRef.current?.setFieldValue(
          `users.${index}.isEditable`,
          !formikRef.current?.isValid ? item.isEditable : !item.isEditable
        );
      }

      setInvitationList((prev) =>
        prev!.map((user) =>
          user.id === id
            ? {
                ...user,
                isEditable: !user.isEditable,
              }
            : user
        )
      );
    });
  };

  const selectedUsersCount = invitationList.filter(
    (user) => user.isSelected
  ).length;

  const handleUserChange = (
    id: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInvitationList((prev) =>
      prev!.map((user) =>
        user.id === id
          ? {
              ...user,
              [event.target.dataset.name || '']: event.target.value,
            }
          : user
      )
    );
  };

  return {
    onSelectAll,
    isSelectedAll,
    user,
    invitationList,
    onSelectUser,
    onEditUser,
    onDeleteUser,
    selectedUsersCount,
    formikRef,
    setIsDisabled,
    groups,
    isDisabled,
    setInvitationList,
    onSubmit,
    tableRef,
    isActiveUser,
    handleUserActive,
    handleCloseTable,
    handleUserChange,
  };
};
