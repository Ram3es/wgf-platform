import { FormikProps } from 'formik';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useAppSelector } from '@services/hooks/redux';

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

  const formikRef = useRef<FormikProps<{ name: string; email: string }>>(null);

  const [isDisabled, setIsDisabled] = useState(false);

  const isEditUser = invitationList.some((user) => user.isEditable);

  const tableRef = useRef<HTMLDivElement>(null);

  const [isActiveUser, setIsActiveUser] = useState<string>('');

  const handleUserActive = (id: string) => setIsActiveUser(id);

  const onBackdropClick = (event: MouseEvent): void => {
    if (isEditUser) {
      if (!tableRef.current?.contains(event.target as HTMLDivElement)) {
        cancelEdit();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', onBackdropClick);
    return () => {
      document.removeEventListener('click', onBackdropClick);
    };
  }, [isEditUser]);

  const cancelEdit = () => {
    if (!formikRef.current?.isValid) {
      return;
    }
    setInvitationList((prev) =>
      prev!.map((user) => ({ ...user, isEditable: false }))
    );
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

  const onSelectUser = (id: string) => () => {
    setInvitationList((prev) =>
      prev!.map((user) =>
        user.id === id ? { ...user, isSelected: !user.isSelected } : user
      )
    );
  };

  const onSelectAll = () => {
    setSelectedAll((prev) => !prev);
    setInvitationList((prev) =>
      prev!.map((user) => ({ ...user, isSelected: !isSelectedAll }))
    );
  };

  const onDeleteUser = (id: string) => () => {
    setInvitationList((prev) => prev!.filter((user) => user.id !== id));
  };

  const onEditUser = (id: string) => () => {
    if (formikRef.current) {
      return setInvitationList((prev) =>
        prev!.map((user) =>
          user.id === id
            ? {
                ...user,
                isEditable: !formikRef.current?.isValid
                  ? user.isEditable
                  : !user.isEditable,
              }
            : {
                ...user,
                isEditable: !formikRef.current?.isValid
                  ? user.isEditable
                  : false,
              }
        )
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
  };

  const handleUserChange = (
    id: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInvitationList((prev) =>
      prev!.map((user) =>
        user.id === id
          ? {
              ...user,
              [event.target.name]:
                event.target.name === 'email'
                  ? event.target.value.trim()
                  : event.target.value,
            }
          : user
      )
    );
  };

  const selectedUsersCount = invitationList.filter(
    (user) => user.isSelected
  ).length;

  return {
    onSelectAll,
    isSelectedAll,
    user,
    invitationList,
    onSelectUser,
    onEditUser,
    onDeleteUser,
    handleUserChange,
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
  };
};
