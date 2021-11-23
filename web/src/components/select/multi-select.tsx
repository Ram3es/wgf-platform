import React, { FC, useEffect, useMemo, useState } from 'react';
import Select, { ActionMeta, OnChangeValue } from 'react-select';

// import CreatableSelect from 'react-select/creatable';
import { animatedComponents } from './select.constants';

import { ISelectOption, ISelectProps } from './select.typings';

import { selectCustomStyles, SelectStyled as Styled } from './select.styles';

export const MultiSelect: FC<ISelectProps> = (props) => {
  const {
    options,
    maxSelected,
    selected,
    setSelected,
    placeholder,
    error,
    label,
    onBlur,
  } = props;

  const [newOptions, setNewOptions] = useState<ISelectOption[] | null>(null);

  const handleChange = (
    newValue:
      | OnChangeValue<ISelectOption, true>
      | OnChangeValue<ISelectOption, false>,
    actionMeta: ActionMeta<ISelectOption>
  ) => {
    setSelected(newValue as ISelectOption[]);
  };

  useEffect(() => {
    if (!maxSelected) {
      return;
    }

    const newOptions =
      selected.length >= maxSelected
        ? [
            {
              value: 'manySelected',
              label: `You can only select ${maxSelected} items`,
            },
          ]
        : options;

    setNewOptions(newOptions);
  }, [selected, maxSelected]);

  const styles = useMemo(() => selectCustomStyles(error), [error]);

  return (
    <Styled.Wrapper>
      <Styled.Label error={error}>{label}</Styled.Label>
      {error && <Styled.ErrorBlock>{error}</Styled.ErrorBlock>}
      <Select
        components={animatedComponents}
        options={newOptions || options}
        isMulti
        closeMenuOnSelect={
          maxSelected ? selected.length >= maxSelected - 1 : false
        }
        isSearchable
        isOptionDisabled={(option: ISelectOption) =>
          option.value === 'manySelected'
        }
        styles={styles}
        placeholder={placeholder}
        onBlur={onBlur}
        value={selected}
        onChange={handleChange}
      />
    </Styled.Wrapper>
  );
};
