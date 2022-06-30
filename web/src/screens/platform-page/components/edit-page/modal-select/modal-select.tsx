import { FC } from 'react';
import { ISelectionOption } from '../edit-page.types';
import { useModalSelectState } from './modal-select.state';
import { ModalSelectStyles as Styled } from './modal-select.styles';

export interface IModalProps {
  selectOption: Record<string, () => void>[];
  children?: React.ReactNode;
}

export const ModalSelect: FC<IModalProps> = ({ selectOption, children }) => {
  const { showModal, refModal, toggleModal } = useModalSelectState();
  return (
    <Styled.SortByDiv>
      <Styled.SortByTextIcon ref={refModal} onClick={toggleModal}>
        {children}
        {showModal && (
          <Styled.ModalSortBy>
            <ul>
              {selectOption.map((item) => {
                const key = Object.keys(item).join(
                  ''
                ) as keyof ISelectionOption;

                return (
                  <li key={key} onClick={item[key]}>
                    <Styled.RadioItem />
                    <p>{key}</p>
                  </li>
                );
              })}
            </ul>
          </Styled.ModalSortBy>
        )}
      </Styled.SortByTextIcon>
    </Styled.SortByDiv>
  );
};
