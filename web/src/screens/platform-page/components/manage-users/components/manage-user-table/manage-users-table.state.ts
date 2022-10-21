import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { ROLES } from '@constants/user-roles';
import { PROMISES_AREA } from '@constants/promises-area';
import {
  downloadMessage,
  errorMessage,
  selectGroup,
} from '@constants/pop-up-messages';

import { useAppSelector } from '@services/hooks/redux';
import { getAllUsers, getAllUsersCsv } from '@services/super-admin.service';
import {
  changeGroupForUser,
  getAllStudentsByTrainerCsv,
  getGroupsByTrainer,
  getUsersByTrainer,
} from '@services/trainer.service';

export const useManageUsersTableState = () => {
  const { user } = useAppSelector((state) => state);
  const [allUsers, setAllUsers] = useState<IUserExistingAndInvited[]>([]);
  const [isAllSelected, setAllSelected] = useState(false);
  const [showSortByModal, setShowSortByModal] = useState(false);
  const [chosenFilter, setChosenFilter] = useState('');

  const [trainerGroups, setTrainerGroups] = useState<IGroup[]>([]);

  const sortByModalRef = useRef<HTMLDivElement>(null);

  const { push } = useHistory();
  const { url } = useRouteMatch();

  const assignUserToGroup = async () => {
    const userIds = allUsers
      .filter(
        (user) =>
          user.isSelected === true &&
          !['Pending', 'Registration Pending'].includes(user?.status as string)
      )
      .map((user) => user.id);

    const obj = trainerGroups.reduce((acc, item) => {
      return { ...acc, [item.id]: item.name };
    }, {});

    const { value: newGroupId } = await selectGroup(obj);
    if (newGroupId) {
      await changeGroup({ userIds, newGroupId, trainerId: user.id });
      getStudents();
    }
  };

  useEffect(() => {
    if (allUsers.filter((user) => user.isSelected).length === allUsers.length) {
      setAllSelected(true);
    }
    if (!allUsers.filter((user) => user.isSelected).length) {
      setAllSelected(false);
    }
  }, [allUsers]);

  useEffect(() => {
    setAllUsers((prev) =>
      prev.map((user) => ({ ...user, isSelected: isAllSelected }))
    );
  }, [isAllSelected]);

  const onBackdropClick = (event: MouseEvent): void => {
    if (!sortByModalRef.current?.contains(event.target as HTMLDivElement)) {
      setShowSortByModal(false);
    }
  };

  const getUsers = useCallback(async () => {
    try {
      const { data } = await trackPromise(
        getAllUsers(),
        PROMISES_AREA.getAllUsers
      );

      setAllUsers(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  }, []);

  const getStudents = useCallback(async () => {
    try {
      const { data } = await trackPromise(
        getUsersByTrainer({ trainerId: user.id }),
        PROMISES_AREA.getAllUsers
      );
      setAllUsers(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  }, []);

  const getGroupsTrainer = useCallback(async () => {
    try {
      const { data } = await trackPromise(
        getGroupsByTrainer({ trainerId: user.id })
      );
      setTrainerGroups((state) => [...state, ...data]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  }, []);

  const changeGroup = useCallback(async (params: IChangeGroupBody) => {
    try {
      await trackPromise(changeGroupForUser(params), PROMISES_AREA.getAllUsers);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  }, []);

  useEffect(() => {
    if (user.role === ROLES.superAdmin) {
      getUsers();
    }
    if (user.role === ROLES.trainerAdmin) {
      getStudents();
    }
  }, []);

  const onSelectAll = () => {
    setAllSelected((prev) => !prev);
  };

  const onSelectUser = (selectedUser: IUserExistingAndInvited) => () => {
    setAllUsers((prev) =>
      prev!.map((user) =>
        user.id === selectedUser.id
          ? { ...user, isSelected: !user.isSelected }
          : user
      )
    );
  };

  const handleToggleModal = () => {
    setShowSortByModal((prev) => !prev);
  };

  const sortUsers = (option: string, direction: string) => {
    if (option === 'Name') {
      setAllUsers((prevAllUsers) => [
        ...prevAllUsers.sort(function (prev, next) {
          const fullNamePrev =
            prev.name || `${prev.firstName} ${prev.lastName}`;
          const fullNameNext =
            next.name || `${next.firstName} ${next.lastName}`;

          if (fullNamePrev > fullNameNext) {
            return direction === 'asc' ? 1 : -1;
          }
          if (fullNamePrev < fullNameNext) {
            return direction === 'asc' ? -1 : 1;
          }
          return 0;
        }),
      ]);
    }

    if (option === 'Group name') {
      setAllUsers((prevAllUsers) => [
        ...prevAllUsers.sort(function (prev, next) {
          const prevGroupName = prev?.groups?.length
            ? `${prev.groups[0]?.name} (${prev.groups[0]?.trainerName})`
            : prev.group
            ? `${prev.group.name} (${prev.group.trainerName})`
            : '';
          const nextGroupName = next?.groups?.length
            ? `${next.groups[0]?.name} (${next.groups[0]?.trainerName})`
            : next.group
            ? `${next.group.name} (${next.group.trainerName})`
            : '';

          if (prevGroupName > nextGroupName) {
            return direction === 'asc' ? 1 : -1;
          }
          if (prevGroupName < nextGroupName) {
            return direction === 'asc' ? -1 : 1;
          }
          return 0;
        }),
      ]);
    }

    if (option === 'Registered on') {
      setAllUsers((prevAllUsers) => [
        ...prevAllUsers.sort(function (prev, next) {
          const prevCreated = prev?.created
            ? prev.created
            : prev?.status
            ? prev.status
            : '';
          const nextCreated = next?.created
            ? next.created
            : next?.status
            ? next.status
            : '';
          if (prevCreated > nextCreated) {
            return direction === 'asc' ? 1 : -1;
          }
          if (prevCreated < nextCreated) {
            return direction === 'asc' ? -1 : 1;
          }
          return 0;
        }),
      ]);
    }

    if (option === 'Email') {
      setAllUsers((prevAllUsers) => [
        ...prevAllUsers.sort(function (prev, next) {
          const prevEmail = prev?.email
            ? prev?.email
            : prev?.to
            ? prev?.to
            : '';
          const nextEmail = next?.email
            ? next?.email
            : next?.to
            ? next?.to
            : '';
          if (prevEmail > nextEmail) {
            return direction === 'asc' ? 1 : -1;
          }
          if (prevEmail < nextEmail) {
            return direction === 'asc' ? -1 : 1;
          }
          return 0;
        }),
      ]);
    }

    if (option === 'Career flex') {
      setAllUsers((prevAllUsers) => [
        ...prevAllUsers.sort(function (prev, next) {
          const prevQuiz = prev?.results?.find(
            (result) => result.quiz.title === 'caas-quiz'
          );
          const prevCareerFlexResult = prevQuiz
            ? `${prevQuiz.status} on ${prevQuiz.created}`
            : '';
          const nextQuiz = next?.results?.find(
            (result) => result.quiz.title === 'caas-quiz'
          );
          const nextCareerFlexResult = nextQuiz
            ? `${nextQuiz.status} on ${nextQuiz.created}`
            : '';

          if (prevCareerFlexResult > nextCareerFlexResult) {
            return direction === 'asc' ? 1 : -1;
          }
          if (prevCareerFlexResult < nextCareerFlexResult) {
            return direction === 'asc' ? -1 : 1;
          }
          return 0;
        }),
      ]);
    }

    if (option === 'Career flex cooperation') {
      setAllUsers((prevAllUsers) => [
        ...prevAllUsers.sort(function (prev, next) {
          const prevQuiz = prev?.results?.find(
            (result) => result.quiz.title === 'caas-cooperation-quiz'
          );
          const prevCareerFlexCooperationResult = prevQuiz
            ? `${prevQuiz.status} on ${prevQuiz.created}`
            : '';
          const nextQuiz = next?.results?.find(
            (result) => result.quiz.title === 'caas-cooperation-quiz'
          );
          const nextCareerFlexCooperationResult = nextQuiz
            ? `${nextQuiz.status} on ${nextQuiz.created}`
            : '';

          if (
            prevCareerFlexCooperationResult > nextCareerFlexCooperationResult
          ) {
            return direction === 'asc' ? 1 : -1;
          }
          if (
            prevCareerFlexCooperationResult < nextCareerFlexCooperationResult
          ) {
            return direction === 'asc' ? -1 : 1;
          }
          return 0;
        }),
      ]);
    }

    if (option === 'Career design canvas') {
      setAllUsers((prevAllUsers) => [
        ...prevAllUsers.sort(function (prev, next) {
          const prevQuiz = prev?.results?.find(
            (result) => result.quiz.title === 'career-canvas'
          );
          const prevCareerCanvasResult = prevQuiz
            ? `${prevQuiz.status} on ${prevQuiz.created}`
            : '';
          const nextQuiz = next?.results?.find(
            (result) => result.quiz.title === 'career-canvas'
          );
          const nextCareerCanvasResult = nextQuiz
            ? `${nextQuiz.status} on ${nextQuiz.created}`
            : '';

          if (prevCareerCanvasResult > nextCareerCanvasResult) {
            return direction === 'asc' ? 1 : -1;
          }
          if (prevCareerCanvasResult < nextCareerCanvasResult) {
            return direction === 'asc' ? -1 : 1;
          }
          return 0;
        }),
      ]);
    }
  };

  const handleChooseSortFilter = (option: string) => () => {
    setChosenFilter(option);
    sortUsers(option, 'asc');
  };
  const handleAscending = () => {
    sortUsers(chosenFilter, 'asc');
  };
  const handleDescending = () => {
    sortUsers(chosenFilter, 'desc');
  };

  const handleCsvDownload = async () => {
    if (user.role === ROLES.superAdmin) {
      try {
        const { data } = await trackPromise(
          getAllUsersCsv(),
          PROMISES_AREA.getAllUsersCsv
        );
        downloadMessage(
          `data:application/csv;base64,${data.file}`,
          'Users.csv'
        ).fire();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return errorMessage(error?.response?.data.message).fire();
        }
      }
    }

    if (user.role === ROLES.trainerAdmin) {
      try {
        const { data } = await trackPromise(
          getAllStudentsByTrainerCsv({ trainerId: user.id }),
          PROMISES_AREA.getAllUsersCsv
        );
        downloadMessage(
          `data:application/csv;base64,${data.file}`,
          'Users.csv'
        ).fire();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return errorMessage(error?.response?.data.message).fire();
        }
      }
    }
  };
  const editHandler = (user: IUserExistingAndInvited) => () =>
    push(`${url}/${user.id}`, user);

  useEffect(() => {
    document.addEventListener('click', onBackdropClick);
    getGroupsTrainer();

    return () => {
      document.removeEventListener('click', onBackdropClick);
    };
  }, []);
  return {
    allUsers,
    onSelectAll,
    isAllSelected,
    user,
    onSelectUser,
    showSortByModal,
    handleToggleModal,
    handleChooseSortFilter,
    chosenFilter,
    setChosenFilter,
    handleAscending,
    handleDescending,
    setAllUsers,
    handleCsvDownload,
    sortByModalRef,
    editHandler,
    assignUserToGroup,
  };
};
