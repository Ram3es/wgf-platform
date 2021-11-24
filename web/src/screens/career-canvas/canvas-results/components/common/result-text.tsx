import styled, { css } from 'styled-components';

import { COLORS } from '@styles/colors';
import { FONTS } from '@styles/fonts';

interface IProps {
  title: string;
  value: string;
  height?: string;
  isYellow?: boolean;
}

const Answer = styled.div<{ height?: string; isYellow?: boolean }>`
  height: ${({ height }) => height || '60px'};
  min-height: 50px;
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

const Title = styled.div`
  @media print {
    font-family: ${FONTS.family.frutigerBold};
    color: ${COLORS.default};
  }
`;

export const ResultText = (props: IProps) => {
  const { title, height, value, isYellow } = props;

  return (
    <div>
      <Title>{title}</Title>
      <Answer isYellow={isYellow} height={height}>
        {value}
      </Answer>
    </div>
  );
};
