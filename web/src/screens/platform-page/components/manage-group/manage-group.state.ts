import { useAppSelector } from '@services/hooks/redux';
import { trackPromise } from 'react-promise-tracker';
import { useRef, useState, useEffect } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import { getGroupsByTrainer } from '@services/trainer.service';
import axios from 'axios';
import { errorMessage } from '@constants/pop-up-messages';

export const useManageGroupState = () => {
  const [groups, setGroups] = useState<IGroup[]>();
  const [isShowScrollBtn, setShowBtn] = useState<boolean>(false);

  const refGroups =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(refGroups, { applyRubberBandEffect: true });

  const user = useAppSelector((state) => state.user);

  const handleScrollBtn = () => {
    refGroups.current.scrollBy({ left: 126, behavior: 'smooth' });
  };
  const getAllGroups = async () => {
    try {
      const { data } = await trackPromise(
        getGroupsByTrainer({ trainerId: user.id })
      );
      const formated = data.map((item) => ({ ...item, isActive: false }));

      setGroups(formated);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return errorMessage(error?.response?.data.message).fire();
      }
    }
  };

  useEffect(() => {
    refGroups.current.scrollWidth > refGroups.current.clientWidth &&
      setShowBtn(true);
  }, [refGroups.current]);

  useEffect(() => {
    (async () => {
      getAllGroups();
    })();
  }, []);

  return { groups, refGroups, events, handleScrollBtn, isShowScrollBtn };
};
