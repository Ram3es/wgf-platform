import { useHistory } from 'react-router-dom';
import { downloadMessage, errorMessage } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROLES } from '@constants/user-roles';
import { useAppSelector } from '@services/hooks/redux';
import {
  getAllTrainers,
  getAllTrainersCsv,
} from '@services/super-admin.service';
import axios from 'axios';
import { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import { trackPromise } from 'react-promise-tracker';
import orderBy from 'lodash.orderby';
import { useRouteMatch } from 'react-router';
import { DATE_OPTIONS } from '@constants/date';

export const useManageTrainersTableState = () => {
  const { user } = useAppSelector((state) => state);
  const [allTrainers, setAllTrainers] = useState<ITrainerExisiting[]>([]);
  const [showSortByModal, setShowSortByModal] = useState(false);
  const [isAllSelected, setAllSelected] = useState(false);
  const [chosenFilter, setChosenFilter] = useState('');
  const sortByModalRef = useRef<HTMLDivElement>(null);

  const { push } = useHistory();
  const { url } = useRouteMatch();

  const getTrainers = useCallback(async () => {
    try {
      const { data } = await trackPromise(
        getAllTrainers(),
        PROMISES_AREA.getAllTrainers
      );
      setAllTrainers(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  }, []);

  useEffect(() => {
    if (user.role === ROLES.superAdmin) {
      getTrainers();
    }
  }, [getTrainers]);

  useEffect(() => {
    setAllTrainers((prev) =>
      prev.map((trainer) => ({ ...trainer, isSelected: isAllSelected }))
    );
  }, [isAllSelected]);

  const selectedTrainers = useMemo(
    () => allTrainers.filter((trainer) => trainer.isSelected).length,
    [allTrainers]
  );

  useEffect(() => {
    if (selectedTrainers === allTrainers.length) {
      setAllSelected(true);
    }
    if (!selectedTrainers) {
      setAllSelected(false);
    }
  }, [allTrainers]);

  useEffect(() => {
    document.addEventListener('click', onBackdropClick);
    return () => {
      document.removeEventListener('click', onBackdropClick);
    };
  }, []);

  const toggleModal = () => setShowSortByModal((prev) => !prev);
  const toggleCheckedAll = () => setAllSelected((prev) => !prev);

  const handleChooseSortFilter = (option: string) => {
    setChosenFilter(option);
    sortTrainers(option);
  };
  const handleAscending = () => {
    sortTrainers(chosenFilter, 'asc');
  };
  const handleDescending = () => {
    sortTrainers(chosenFilter, 'desc');
  };
  const sortTrainers = (option: string, direction?: 'asc' | 'desc') => {
    const sortedTrainers = orderBy(allTrainers, option, direction);
    setAllTrainers(sortedTrainers);
  };

  const onSelectTrainer = (selectedTraniers: ITrainerExisiting) => () => {
    setAllTrainers((prev) =>
      prev!.map((user) =>
        user.id === selectedTraniers.id
          ? { ...user, isSelected: !user.isSelected }
          : user
      )
    );
  };
  const onBackdropClick = (event: MouseEvent): void => {
    if (!sortByModalRef.current?.contains(event.target as HTMLDivElement)) {
      setShowSortByModal(false);
    }
  };

  const handleCsvDownload = async () => {
    try {
      const { data } = await trackPromise(
        getAllTrainersCsv(),
        PROMISES_AREA.getAllTrainersCsv
      );
      downloadMessage(
        `data:application/csv;base64,${data.file}`,
        'Trainers.csv'
      ).fire();
    } catch (error) {
      if (axios.isAxiosError(error))
        return errorMessage(error?.response?.data.message).fire();
    }
  };
  const renderTrainer = (item: ITrainerExisiting) => {
    const fullName = item.name || `${item.firstName} ${item.lastName}`;
    const email = item.to || item.email;
    const organization = item.organizationName || '-';
    const gap = '-';

    const registerDate = item?.created
      ? new Date(item.created).toLocaleString('en-US', DATE_OPTIONS)
      : item?.status
      ? item.status.toLowerCase()
      : '';
    return { fullName, email, organization, registerDate, gap };
  };

  const editHandler = (id: string) => () => push(`${url}/${id}`);

  return {
    allTrainers,
    showSortByModal,
    sortByModalRef,
    toggleModal,
    toggleCheckedAll,
    handleChooseSortFilter,
    chosenFilter,
    handleAscending,
    handleDescending,
    isAllSelected,
    selectedTrainers,
    onSelectTrainer,
    handleCsvDownload,
    editHandler,
    renderTrainer,
  };
};
