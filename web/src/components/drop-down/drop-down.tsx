import React, { useEffect } from 'react';

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
  } = props;

  const toggleActive = () => !isDisabled && setIsActive(false);

  const selectedChange = (selected: string) => () => {
    setSelected(selected);
    toggleActive();
  };

  const escPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', escPress);
    return () => {
      document.removeEventListener('keydown', escPress);
    };
  }, []);

  return (
    <DropDownStyled.Wrapper isFullWidth={isFullWidth} maxWidth={maxWidth}>
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
      <DropDownStyled.BackDrop onClick={toggleActive} />
    </DropDownStyled.Wrapper>
  );
};
