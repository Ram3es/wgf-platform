import React, { useEffect } from 'react';

import { Icon } from '@components/icon';

import { loginedOptions } from '@components/header/header.constants';

import { ISelectProps } from './select.typings';

import { SelectStyled } from './select.styles';

export const Select: React.FC<ISelectProps> = ({
  options,
  selected,
  setSelected,
  maxHeight,
  isDisabled,
  isFullWidth,
  maxWidth,
  setIsActive,
}) => {
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
    <SelectStyled.Wrapper isFullWidth={isFullWidth} maxWidth={maxWidth}>
      <SelectStyled.Content maxHeight={maxHeight}>
        {options.map((selectedItem) => (
          <SelectStyled.Item
            key={selectedItem}
            onClick={selectedChange(selectedItem)}
          >
            {selected === selectedItem && <Icon type="selected" />}
            <SelectStyled.Label>
              {selectedItem === loginedOptions.logout && <Icon type="logout" />}
              <span>{selectedItem}</span>
            </SelectStyled.Label>
          </SelectStyled.Item>
        ))}
      </SelectStyled.Content>
      <SelectStyled.BackDrop onClick={toggleActive} />
    </SelectStyled.Wrapper>
  );
};
