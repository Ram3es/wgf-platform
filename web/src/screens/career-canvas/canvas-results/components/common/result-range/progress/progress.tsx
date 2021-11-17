import { ProgressStyled as Styled } from './progress.styles';

export interface IResultProgressProps {
  value: number;
  color: string;
  maxValue?: number;
  circleSize?: number;
}

export const ResultProgress = (props: IResultProgressProps) => {
  const { value, color, maxValue = 10, circleSize = 12 } = props;

  const numberValue = isNaN(value) ? 0 : value;

  const percent = (numberValue / maxValue) * 100;
  const offset = percent > 100 ? 100 : percent < 0 ? 0 : percent;
  const circleTop = (circleSize - 6) / 2;

  return (
    <Styled.Root>
      <Styled.Bar color={color}>
        <Styled.Progress widthPercent={offset} color={color} />
      </Styled.Bar>
      <Styled.Thumb
        leftPercent={offset}
        color={color}
        top={circleTop}
        size={circleSize}
      >
        {numberValue}
      </Styled.Thumb>
    </Styled.Root>
  );
};
