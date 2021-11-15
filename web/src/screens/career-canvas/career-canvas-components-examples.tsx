import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { Button } from '@components/button';
import { InputRange } from '@components/input-range/input-range';
import { MultiSelect } from '@components/select';
import { TextField } from '@components/text-field';
import { COLORS } from '@styles/colors';
import { Container } from '@styles/components/container';
import { FONTS } from '@styles/fonts';

import { ISelectOption } from '@components/select/select.typings';

export const CareerCanvas: FC = () => {
  const [state, setstate] = useState('');

  const onChangeTextField = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setstate(event.target.value);
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla3', label: 'Vanilla3' },
    { value: 'vanilla2', label: 'Vanilla2' },
    { value: 'vanilla1', label: 'Vanilla1' },
  ];

  const [selected, setSelected] = useState<ISelectOption[]>([]);
  const [isSelectBlur, setIsSelectBlur] = useState<boolean>(false);

  const [error, setError] = useState('');

  useEffect(() => {
    setError(isSelectBlur && selected.length < 4 ? 'Error' : '');
  }, [selected, isSelectBlur]);

  const handleSelectBlur = () => {
    setIsSelectBlur(true);
  };

  const [value, setValue] = useState(5);
  const onChangeRange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(+event.target.value);
  };

  const [labelValue, setLabelValue] = useState(3);
  const onChangeRangeLabel = (event: ChangeEvent<HTMLInputElement>) => {
    setLabelValue(+event.target.value);
  };

  return (
    <Container>
      <TextField
        variant="textarea"
        onChange={onChangeTextField}
        value={state}
        type="text"
        name="text"
        height="150px"
        label="label"
        isLabelTop
        labelFontSize={FONTS.sizes[18]}
      />
      <MultiSelect
        options={options}
        selected={selected}
        setSelected={setSelected}
        maxSelected={4}
        placeholder="Select top 4 values"
        label="My top 4 values:"
        error={error}
        onBlur={handleSelectBlur}
      />
      <InputRange
        onChange={onChangeRange}
        minRange={1}
        maxRange={10}
        value={value}
        color={COLORS.greenLite}
        variant="number"
      />
      <InputRange
        onChange={onChangeRangeLabel}
        minRange={1}
        maxRange={5}
        value={labelValue}
        color={COLORS.yellow}
        variant="label"
      />
      <Button
        onClick={() => console.log()}
        title="Save & Next Section"
        borderRadius="8px"
        color={COLORS.pink}
      />
    </Container>
  );
};
