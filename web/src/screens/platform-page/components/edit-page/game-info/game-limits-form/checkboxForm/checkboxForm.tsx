import { Checkbox } from '@components/checkbox';
import { FC } from 'react';
import { CheckboxFormStyles as Styled } from './checkboxForm.styles';

interface ICheckboxProps {
  setUnlimited?: (name: string) => void | undefined;
  hideSelect?: (param: Record<string, boolean>) => void;
  name: string;
  value: string | number;
}
export const CheckboxForm: FC<ICheckboxProps> = ({
  setUnlimited,
  name,
  hideSelect,
  value,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setUnlimited?.(name);
    hideSelect?.({ [name]: false });
  };

  return (
    <Styled.Wraper>
      <Styled.CheckboxDiv
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <Checkbox
          isMonoColor
          label="Unlimited"
          onChange={() => null}
          isChecked={value === 'unlimited'}
          boxWidth={14}
          boxHeight={14}
          alignItems="center"
        />
      </Styled.CheckboxDiv>
    </Styled.Wraper>
  );
};
