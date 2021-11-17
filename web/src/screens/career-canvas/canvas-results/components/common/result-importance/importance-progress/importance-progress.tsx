import { ImportanceProgressStyled as Styled } from './importance-progress.styles';

export interface IImportanceProgressProps {
  value: number;
  color: string;
}

export const ImportanceProgress = (props: IImportanceProgressProps) => {
  const { color, value } = props;

  const numberValue = isNaN(value) ? 0 : value;

  const percent = numberValue * 10;
  const offset = percent > 100 ? 100 : percent < 0 ? 0 : percent;

  return (
    <Styled.Root>
      <Styled.Bar>
        <Styled.Progress widthPercent={offset} />
      </Styled.Bar>
      <Styled.Thumb leftPercent={offset} color={color} />
    </Styled.Root>
  );
};
