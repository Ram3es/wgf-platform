import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';

interface IProps {
  title: string;
  value: string;
  height?: string;
  isYellow?: boolean;
}

const Answer = styled.div<{ height?: string; isYellow?: boolean }>`
  height: ${({ height }) => height || '60px'};
  margin-top: 1.5px;
  padding: 5px;
  border: 1px solid ${COLORS.dark};
  border-radius: 5px;
  color: ${COLORS.dark};
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ isYellow }) =>
    isYellow &&
    css`
      background-color: ${COLORS.yellowLight};
      border-width: 0px;
      color: inherit;
    `}
`;

export const ResultText = (props: IProps) => {
  const { title, height, value, isYellow } = props;

  return (
    <div>
      <p>{title}</p>
      <Answer isYellow={isYellow} height={height}>
        {value}
      </Answer>
    </div>
  );
};
