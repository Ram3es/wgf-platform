import { useRef, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { useDraggable } from 'react-use-draggable-scroll';

import { Toast } from '@constants/toasts';
import { errorMessage } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';

import { useAppSelector } from '@services/hooks/redux';
import {
  createGroup,
  deleteGroup,
  getGroupsByTrainer,
  renameTrainerGroup,
} from '@services/trainer.service';

import { IRenameGroup } from './manage-group';
import { scrollToTop } from '@services/utils/scroll';

export const useManageGroupState = () => {
  const [groups, setGroups] = useState<IGroup[]>();
  const [isShowScrollBtn, setShowBtn] = useState<boolean>(false);
  const [isShowModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [isShowModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState(false);

  const refGroups =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(refGroups, { applyRubberBandEffect: true });

  scrollToTop();

  const user = useAppSelector((state) => state.user);

  const handleModalCreate = () => {
    setShowModalCreate((state) => !state);
  };
  const handleModalDelete = () => {
    setShowModalDelete((state) => !state);
  };
  const toggleEditMode = () => {
    setEditMode((state) => !state);
  };

  const handleScrollBtn = () => {
    refGroups.current.scrollBy({ left: 145, behavior: 'smooth' });
  };

  const handleScrollBtnBack = () => {
    refGroups.current.scrollBy({ left: -145, behavior: 'smooth' });
  };

  const handleButtonActive = (id: string) => {
    setGroups((state) =>
      state?.map((group) => {
        if (group.id === id) {
          return { ...group, isActive: !group.isActive };
        }
        return { ...group, isActive: false };
      })
    );
  };
  const getAllGroups = useCallback(async () => {
    try {
      const { data } = await trackPromise(
        getGroupsByTrainer({ trainerId: user.id }),
        PROMISES_AREA.renameGroup
      );

      const formated = data.map((item) => ({ ...item, isActive: false }));

      setGroups(formated);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  }, []);
  const createTrainerGroup = async (name: string) => {
    try {
      await trackPromise(
        createGroup({ name, trainerId: user.id }),
        PROMISES_AREA.createGroup
      );
      getAllGroups();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    } finally {
      handleModalCreate();
    }
  };
  const renameGroup = useCallback(async (params: IRenameGroup) => {
    try {
      await trackPromise(renameTrainerGroup(params), PROMISES_AREA.renameGroup);
      await getAllGroups();

      Toast.fire({
        icon: 'success',
        title: 'Group was renamed successfully',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  }, []);

  const deleteTrainerGroup = useCallback(async (params) => {
    try {
      await trackPromise(deleteGroup(params), PROMISES_AREA.deleteGroup);
      handleModalDelete();
      await getAllGroups();
      Toast.fire({
        icon: 'success',
        title: 'Group was deleted successfully',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  }, []);

  useEffect(() => {
    refGroups.current.scrollWidth > refGroups.current.clientWidth
      ? setShowBtn(true)
      : setShowBtn(false);
  }, [groups]);

  useEffect(() => {
    getAllGroups();
  }, []);

  return {
    groups,
    refGroups,
    events,
    handleScrollBtn,
    handleScrollBtnBack,
    isShowScrollBtn,
    handleModalCreate,
    isShowModalCreate,
    createTrainerGroup,
    handleButtonActive,
    isEditMode,
    toggleEditMode,
    renameGroup,
    isShowModalDelete,
    handleModalDelete,
    deleteTrainerGroup,
  };
};
