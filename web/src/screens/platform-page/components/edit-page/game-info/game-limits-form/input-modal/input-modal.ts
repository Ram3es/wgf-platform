import { useEffect, useRef, useState } from 'react';

export interface IInit {
  gameDuration: boolean;
  numberOfGames: boolean;
  playersPerGame: boolean;
}

export const initState: IInit = {
  gameDuration: false,
  playersPerGame: false,
  numberOfGames: false,
};
export const useInputModal = () => {
  const [isShowModal, setShowModal] = useState<IInit>(initState);
  const [isChecked, setChecked] = useState(initState);
  const refModal = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener('click', onBackdropClick);
    return () => {
      document.removeEventListener('click', onBackdropClick);
    };
  }, []);

  const toggleCheckbox = (name: keyof IInit) =>
    setChecked((state) => ({ ...state, [name]: !state[name] }));

  const setCheckedCheckbox = (name: keyof IInit) =>
    setChecked((state) => ({ ...state, [name]: true }));
  const setNotCheckedCheckbox = (name: keyof IInit) =>
    setChecked((state) => ({ ...state, [name]: false }));

  const toggleModal = (field: keyof IInit) => {
    setShowModal((state) => ({ ...state, [field]: !state[field] }));
  };
  const hideInputModal = (field: keyof IInit) => {
    setShowModal((state) => ({ ...state, [field]: false }));
  };
  const hideAllModalFields = () => {
    setShowModal((state: IInit) => {
      let key: keyof typeof state;
      for (key in state) {
        state[key] = false;
      }

      return { ...state };
    });
  };

  const onBackdropClick = (event: MouseEvent): void => {
    if (!refModal.current?.contains(event.target as HTMLDivElement)) {
      hideAllModalFields();
    }
  };

  return {
    isShowModal,
    refModal,
    toggleModal,
    hideInputModal,
    toggleCheckbox,
    isChecked,
    setCheckedCheckbox,
    setNotCheckedCheckbox,
    hideAllModalFields,
  };
};
