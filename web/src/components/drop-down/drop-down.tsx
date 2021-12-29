import React, { useEffect, useRef } from 'react';

import { Icon } from '@components/icon';

import { loginedOptions } from '@components/header/header.constants';

import { IDropDownProps } from './drop-down.typings';

import { DropDownStyled } from './drop-down.styles';

export const DropDown: React.FC<IDropDownProps> = (props) => {
  const {
    options,
    selected,
    setSelected,
    maxHeight,
    isDisabled,
    isFullWidth,
    maxWidth,
    setIsActive,
    handleUserActive,
  } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);

  const onBackdropClick = (event: MouseEvent): void => {
    if (!dropdownRef.current?.contains(event.target as HTMLDivElement)) {
      closeActive();
    }
  };

  useEffect(() => {
    document.addEventListener('click', onBackdropClick);
    return () => {
      document.removeEventListener('click', onBackdropClick);
    };
  }, []);

  const closeActive = () => {
    if (!isDisabled) {
      setIsActive(false);
      if (handleUserActive) {
        handleUserActive('');
      }
    }
  };

  const selectedChange = (selected: string) => () => {
    setSelected(selected);
    closeActive();
  };

  const escPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeActive();

      if (handleUserActive) {
        handleUserActive('');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', escPress);
    return () => {
      document.removeEventListener('keydown', escPress);
    };
  }, []);

  return (
    <DropDownStyled.Wrapper
      isFullWidth={isFullWidth}
      maxWidth={maxWidth}
      ref={dropdownRef}
    >
      <DropDownStyled.Content maxHeight={maxHeight}>
        {options.map((selectedItem) => (
          <DropDownStyled.Item
            key={selectedItem}
            onClick={selectedChange(selectedItem)}
          >
            {selected === selectedItem && <Icon type="selected" />}
            <DropDownStyled.Label>
              {selectedItem === loginedOptions.logout && <Icon type="logout" />}
              <span>{selectedItem}</span>
            </DropDownStyled.Label>
          </DropDownStyled.Item>
        ))}
      </DropDownStyled.Content>
    </DropDownStyled.Wrapper>
  );
};
