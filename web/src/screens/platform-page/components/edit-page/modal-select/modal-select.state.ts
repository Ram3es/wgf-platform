import { useEffect, useRef, useState } from 'react';

export const useModalSelectState = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const refModal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', onBackdropClick);
    return () => {
      document.removeEventListener('click', onBackdropClick);
    };
  }, []);

  const toggleModal = (value?: string) => {
    setShowModal((state) => (value ? false : !state));
  };
  const onBackdropClick = (event: MouseEvent): void => {
    if (!refModal.current?.contains(event.target as HTMLDivElement)) {
      setShowModal(false);
    }
  };

  return { showModal, refModal, toggleModal };
};
